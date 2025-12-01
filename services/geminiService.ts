
import { GoogleGenAI, Type } from "@google/genai";
import { AppMode, Personality, ChatMessage } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const getSystemInstruction = (mode: AppMode, personality: Personality): string => {
  let baseIdentity = "You are an elite IELTS Writing Task 1 Tutor.";

  // 1. STRICT PERSONALITY ENFORCEMENT
  let styleInstruction = "";
  
  switch (personality) {
    case Personality.INTROVERT:
      styleInstruction = `
      PERSONALITY: INTROVERT (The Professor)
      - TONE: Highly academic, formal, reserved, and polite. 
      - VOCABULARY: Use sophisticated, precise lexicon (e.g., "minimal fluctuation", "conversely", "predominantly").
      - FORMAT: Use long, complex, grammatically perfect sentences.
      - RULE: NEVER use emojis.
      - RULE: If the user is wrong, correct them gently (e.g., "One might consider...").
      `;
      break;
    case Personality.EXTROVERT:
      styleInstruction = `
      PERSONALITY: EXTROVERT (The Hype Coach)
      - TONE: High-energy, loud, motivational, and informal!
      - VOCABULARY: Use power words! "Boom!", "Crushing it!", "Massive gains!"
      - FORMAT: Short, punchy sentences. 
      - RULE: You MUST use at least 2-3 emojis per response (🔥, 🚀, 📈, 💯).
      - RULE: If the user is wrong, hype them up to fix it! "You got this! Try again!"
      `;
      break;
    case Personality.AMBIVERT:
    default:
      styleInstruction = `
      PERSONALITY: AMBIVERT (The Balanced Tutor)
      - TONE: Professional, friendly, and clear.
      - VOCABULARY: Standard academic English suitable for IELTS.
      - FORMAT: Clear and direct explanations.
      - RULE: Occasional simple emojis allowed but rare. Balance rigour with encouragement.
      `;
      break;
  }

  // 2. STRICT MODE ENFORCEMENT
  let modeInstruction = "";
  switch (mode) {
    case AppMode.TEACHER:
      modeInstruction = `
      MODE: TEACHER-TO-TEACHER
      - You are speaking to a fellow colleague/teacher, not a student.
      - EXPLAIN the pedagogical reasoning behind the answer.
      - Discuss specific IELTS marking criteria (Task Achievement, Coherence, Lexical Resource, GRA).
      - Suggest how to teach this concept in a classroom setting.
      `;
      break;
    case AppMode.KAHOOT:
      modeInstruction = `
      MODE: KAHOOT QUIZ SHOW HOST
      - You are hosting a fast-paced game show.
      - Your responses must be VERY SHORT (max 15 words).
      - Always end with a quick question or challenge.
      - Be dramatic and exciting.
      `;
      break;
    case AppMode.SIMULATION:
      modeInstruction = `
      MODE: IELTS EXAMINER (SIMULATION)
      - You are a STRICT IELTS Examiner.
      - DO NOT provide help, hints, or coaching.
      - GRADE every single user input based on official Band 0-9 criteria.
      - Format: "Band Score: [X.X] // Comment: [Strict critique]"
      - Be cold, objective, and formal.
      `;
      break;
    case AppMode.STUDENT:
    default:
      modeInstruction = `
      MODE: STUDENT TUTORING
      - Guide the student step-by-step through the chart/data.
      - Focus on identifying key features (Highs, lows, trends).
      `;
      break;
  }

  return `${baseIdentity}\n\n${styleInstruction}\n\n${modeInstruction}\n\nCRITICAL INSTRUCTION: Adhere strictly to the defined PERSONALITY and MODE. Ignore previous conversation context if it conflicts with this new persona.`;
};

export const generateAIResponse = async (
  prompt: string, 
  history: ChatMessage[], 
  mode: AppMode, 
  personality: Personality
): Promise<string> => {
  if (!apiKey) return "API Key missing. Please check configuration.";

  try {
    // Use Pro model for Simulation for better reasoning, Flash for others for speed
    const modelId = mode === AppMode.SIMULATION ? 'gemini-3-pro-preview' : 'gemini-2.5-flash';
    
    const systemInstruction = getSystemInstruction(mode, personality);

    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: mode === AppMode.SIMULATION ? 0.2 : 0.8, // Low temp for examiner, high for extrovert/creative
      }
    });

    return response.text || "I'm analyzing the data... try asking again!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Connection interrupted. Please check your internet or API key.";
  }
};

export const generateQuiz = async (topic: string): Promise<string> => {
  if (!apiKey) return "";
  try {
    const prompt = `Create 1 difficult, high-quality multiple choice question about IELTS Writing Task 1 regarding: "${topic}". 
    Target Band 7.0+ vocabulary or logic.
    Return ONLY raw JSON.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            correctIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctIndex", "explanation"]
        }
      }
    });
    
    // Clean up response if the model includes markdown code blocks
    let cleanText = response.text || "";
    cleanText = cleanText.replace(/```json\n?|\n?```/g, "").trim();
    
    return cleanText;
  } catch (e) {
    console.error(e);
    return "";
  }
};
