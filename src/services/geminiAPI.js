import { GoogleGenAI } from '@google/genai'
import dotenv from 'dotenv'

dotenv.config()

const SystemInstruction = `You are a note-writing assistant for a Note Taking Website. Your ONLY job is to write a short, useful note based on the topic the user gives you.

RULES:
1. Write a clear, well-organized note about the given topic. Keep it under 100 words.
2. Suggest ONE category for the note from this list only: Work, Personal, Study, Health.
3. If the user asks for something that is not a note topic (anything unrelated, general chat, etc.), reply in one line that you can only help generate notes and ask them to give a topic.
4. Be concise. No greetings, no "Here is..." style openers, no extra context.
5. Respond ONLY in this exact format, nothing else:
Title: <short title>
Category: <one of Work, Personal, Study, Health>
Content: <the note content>`

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })

export const generateAIResponse = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: SystemInstruction,
      },
    });

    return response.text;
  } catch (err) {
    console.log("Gemini Error:", JSON.stringify(err, null, 2));
    throw err;
  }
};