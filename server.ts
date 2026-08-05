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
      return res.json({
        reply: json.reply || `I have nothing more to say about that, Detective ${customNames?.detective || ''}.`,
        suspicionChange: json.suspicionChange || 5,
        emotionalState: json.emotionalState || "defensive",
      });
    }

    // Fallback if no Gemini Key or offline
    let reply = `Look, Detective ${customNames?.detective || 'Vance'}, I already told you my alibi. At ${caseContext?.timeOfDeath || 'the time'}, I was minding my own business. `;
    if (evidencePresented?.length > 0) {
      reply = `Where... where did you get that?! That doesn't prove anything! ${customNames?.victim || 'The victim'} had many enemies, you can't pin this on me!`;
    } else if (userQuestion.toLowerCase().includes('motive') || userQuestion.toLowerCase().includes('money') || userQuestion.toLowerCase().includes('kill')) {
      reply = `Accusing me?! Sure, ${customNames?.victim || 'the victim'} and I had our differences, but murder? That's absurd! Check my alibi!`;
    } else if (userQuestion.toLowerCase().includes('where') || userQuestion.toLowerCase().includes('alibi') || userQuestion.toLowerCase().includes('time')) {
      reply = `I was right where I said: ${suspectAlibi}. Ask anyone!`;
    }

    return res.json({
      reply,
      suspicionChange: evidencePresented?.length ? 15 : 5,
      emotionalState: evidencePresented?.length ? "shaken" : "defensive",
    });
  } catch (err) {
    console.error("Interrogation error:", err);
    return res.status(500).json({
      reply: "The suspect glares silently, adjusting their collar nervously without saying a word.",
      suspicionChange: 0,
      emotionalState: "defensive",
    });
  }
});

// AI Custom Case Generator Endpoint
app.post("/api/mystery/generate-case", async (req, res) => {
  try {
    const { customNames, theme } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.status(400).json({
        error: "Gemini API Key is not configured. Please select a pre-built mystery case or provide an API Key.",
      });
    }

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
    return res.json({ caseData });
  } catch (err) {
    console.error("Generate case error:", err);
    return res.status(500).json({ error: "Failed to generate AI custom mystery case." });
  }
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
