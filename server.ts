import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
};

// API Health Check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", aiConfigured: !!getGeminiClient() });
});

// Interrogate Suspect Endpoint
app.post("/api/mystery/interrogate", async (req, res) => {
  try {
    const {
      suspectName,
      suspectRole,
      suspectPersonality,
      suspectMotive,
      suspectAlibi,
      suspectSecret,
      isKiller,
      userQuestion,
      customNames,
      caseContext,
      evidencePresented,
    } = req.body;

    const ai = getGeminiClient();

    // System prompt for in-character interrogation response
    const systemPrompt = `You are roleplaying as "${suspectName}" (${suspectRole}) in a Murder Mystery game.
Victim: "${customNames?.victim || caseContext?.victim || 'The Victim'}".
Detective questioning you: "${customNames?.detective || 'Detective'}".
Location of Crime: "${customNames?.location || caseContext?.location || 'The Estate'}".
Time of Death: "${caseContext?.timeOfDeath || 'Midnight'}".
Cause of Death: "${caseContext?.causeOfDeath || 'Suspicious Circumstances'}".

YOUR CHARACTER PROFILE:
- Name: ${suspectName}
- Role/Relationship: ${suspectRole}
- Personality & Demeanor: ${suspectPersonality}
- Your Secret Motive (Do not openly admit unless overwhelmed by evidence): ${suspectMotive}
- Your Stated Alibi: ${suspectAlibi}
- Your Hidden Secret: ${suspectSecret}
- Am I the Killer?: ${isKiller ? 'YES, YOU ARE THE KILLER! Try to maintain composure, lie convincingly, redirect suspicion, but if hard evidence is presented against you, get defensive or sweat.' : 'NO, you are innocent of murder, though you may be hiding your own secret or embarrassing motive.'}

RULES FOR INTERROGATION RESPONSE:
1. Stay strictly in character as "${suspectName}".
2. ALWAYS use the custom names given above when referring to the victim ("${customNames?.victim}"), detective ("${customNames?.detective}"), and suspects!
3. Keep responses dramatic, suspenseful, concise (2 to 4 sentences).
4. ${evidencePresented?.length > 0 ? `The detective just confronted you with evidence: ${evidencePresented.join(', ')}. React to this evidence directly with shock, hesitation, or a flawed explanation!` : 'Answer the detective\'s question directly.'}
5. Respond in JSON format matching schema: { "reply": string, "suspicionChange": number (-15 to +20), "emotionalState": "calm" | "defensive" | "nervous" | "shaken" }`;

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `Detective "${customNames?.detective || 'Detective'}" asks: "${userQuestion}"`,
          config: {
            systemInstruction: systemPrompt,
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                reply: { type: Type.STRING, description: "In-character reply text" },
                suspicionChange: { type: Type.INTEGER, description: "Change in suspicion level (-15 to +20)" },
                emotionalState: { type: Type.STRING, description: "calm, defensive, nervous, or shaken" },
              },
              required: ["reply", "suspicionChange", "emotionalState"],
            },
          },
        });

        const json = JSON.parse(response.text || "{}");
        if (json.reply) {
          return res.json({
            reply: json.reply,
            suspicionChange: json.suspicionChange ?? 5,
            emotionalState: json.emotionalState || "defensive",
          });
        }
      } catch (geminiErr: any) {
        console.warn("Gemini API call rate limited or unavailable, switching to local detective logic engine:", geminiErr?.message || geminiErr);
      }
    }

    // Dynamic, rich fallback if Gemini API is unavailable or rate limited (429)
    const victim = customNames?.victim || caseContext?.victim || 'the victim';
    const detective = customNames?.detective || 'Detective';
    
    let reply = `Look, Detective ${detective}, I've told you everything I know. At ${caseContext?.timeOfDeath || 'the time of the crime'}, I was minding my own business. `;
    let suspicionChange = 5;
    let emotionalState = "defensive";

    if (evidencePresented?.length > 0) {
      const evName = evidencePresented.join(" and ");
      if (isKiller) {
        reply = `Where... where did you find ${evName}?! That doesn't prove anything! ${victim} had enemies everywhere, you can't pin ${victim}'s murder on me!`;
        suspicionChange = 18;
        emotionalState = "shaken";
      } else {
        reply = `I admit ${evName} looks suspicious, Detective ${detective}, but I swear I had nothing to do with ${victim}'s death! Check my alibi: ${suspectAlibi}.`;
        suspicionChange = 8;
        emotionalState = "nervous";
      }
    } else if (userQuestion.toLowerCase().includes('motive') || userQuestion.toLowerCase().includes('money') || userQuestion.toLowerCase().includes('kill') || userQuestion.toLowerCase().includes('hate')) {
      if (isKiller) {
        reply = `Accusing me of killing ${victim}?! Sure, we had our disagreements about ${suspectMotive || 'things'}, but murder? That's ridiculous! You're grasping at straws, Detective ${detective}!`;
        suspicionChange = 12;
        emotionalState = "nervous";
      } else {
        reply = `I won't pretend ${victim} and I were best friends, Detective. But I would never hurt anyone. ${suspectMotive ? `My issue was strictly ${suspectMotive}.` : ''}`;
        suspicionChange = 4;
        emotionalState = "defensive";
      }
    } else if (userQuestion.toLowerCase().includes('chitralekha') || userQuestion.toLowerCase().includes('diary') || userQuestion.toLowerCase().includes('stage') || userQuestion.toLowerCase().includes('key') || userQuestion.toLowerCase().includes('vote')) {
      reply = `Chitralekha's locked velvet diary?! Detective ${detective}, whatever Chitralekha wrote in that diary about me, ${victim}, Vihaan, and Aryaman is being blown out of proportion! We had a tense argument behind the auditorium stage at 03:50 PM, but nobody wanted ${victim} to die in Science Lab 2!`;
      suspicionChange = 10;
      emotionalState = "nervous";
    } else if (userQuestion.toLowerCase().includes('where') || userQuestion.toLowerCase().includes('alibi') || userQuestion.toLowerCase().includes('time') || userQuestion.toLowerCase().includes('night')) {
      reply = `I was right where I said I was: ${suspectAlibi}. You can ask anyone, Detective ${detective}!`;
      suspicionChange = -3;
      emotionalState = "calm";
    }

    return res.json({
      reply,
      suspicionChange,
      emotionalState,
    });
  } catch (err: any) {
    console.error("Interrogation error fallback:", err);
    return res.json({
      reply: `The suspect glares silently, adjusting their collar nervously without saying a word to Detective ${req.body?.customNames?.detective || ''}.`,
      suspicionChange: 2,
      emotionalState: "defensive",
    });
  }
});

// AI Custom Case Generator Endpoint
app.post("/api/mystery/generate-case", async (req, res) => {
  const { customNames, theme } = req.body;
  try {
    const ai = getGeminiClient();

    if (ai) {
      const systemPrompt = `You are a master Mystery Novelist & Game Designer.
Generate a complete, solvable Murder Mystery Game Case using these exact custom names:
- Detective: "${customNames.detective}"
- Victim: "${customNames.victim}"
- Suspect 1: "${customNames.suspect1}"
- Suspect 2: "${customNames.suspect2}"
- Suspect 3: "${customNames.suspect3}"
- Suspect 4: "${customNames.suspect4}"
- Location: "${customNames.location}"
- Theme/Atmosphere: "${theme || 'Classic Noir'}"

Pick ONE of Suspect 1, Suspect 2, Suspect 3, or Suspect 4 as the true Killer (killerId: "suspect1", "suspect2", "suspect3", or "suspect4").
Ensure all clues and evidence point logically to the chosen killer, while giving the other 3 suspects convincing red herrings, alibis, and motives.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: "Generate a full murder mystery case structure in JSON.",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              settingDescription: { type: Type.STRING },
              timeOfDeath: { type: Type.STRING },
              causeOfDeath: { type: Type.STRING },
              synopsis: { type: Type.STRING },
              killerId: { type: Type.STRING, description: "suspect1, suspect2, suspect3, or suspect4" },
              solutionExplanation: { type: Type.STRING },
            },
            required: ["title", "settingDescription", "timeOfDeath", "causeOfDeath", "synopsis", "killerId", "solutionExplanation"],
          },
        },
      });

      const caseData = JSON.parse(response.text || "{}");
      if (caseData.title && caseData.killerId) {
        return res.json({ caseData });
      }
    }
  } catch (err: any) {
    console.warn("Generate case AI call rate limited or unavailable, generating custom offline mystery case:", err?.message || err);
  }

  // Standalone Offline Custom Case Generator
  const fallbackCase = {
    title: `The ${theme || 'Noir'} Shadow at ${customNames?.location || 'the Estate'}`,
    settingDescription: `A high-stakes, tense scene set in ${customNames?.location || 'a dark mansion'} during a thunderstorm.`,
    timeOfDeath: "11:45 PM",
    causeOfDeath: "Targeted Poisoning & Physical Altercation",
    synopsis: `Detective ${customNames?.detective || 'Detective'} is summoned to ${customNames?.location || 'the Estate'} after ${customNames?.victim || 'the Victim'} is discovered lifeless in the study. All four suspects have hidden secrets, but only one is the cold-blooded killer.`,
    killerId: "suspect3",
    solutionExplanation: `${customNames?.suspect3 || 'Suspect 3'} poisoned the wine glass after discovering ${customNames?.victim || 'the victim'} was planning to alter their will and expose secret financial debts.`,
  };

  return res.json({ caseData: fallbackCase });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Murder Mystery Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
