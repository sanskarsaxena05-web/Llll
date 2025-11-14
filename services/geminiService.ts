
import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateBookRecommendation(prompt: string): Promise<{ title: string; author: string; genre: string }> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following prompt, recommend a single book. Prompt: "${prompt}"`,
      config: {
        systemInstruction: "You are a helpful librarian. Provide a single book recommendation with a title, author, and a specific genre from this list: Fiction, Non-Fiction, Science Fiction, Fantasy, Mystery, Biography, History, Other. Respond only with a JSON object.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "The title of the recommended book.",
            },
            author: {
              type: Type.STRING,
              description: "The author of the recommended book.",
            },
            genre: {
              type: Type.STRING,
              description: "The genre of the recommended book from the provided list.",
            },
          },
          required: ["title", "author", "genre"],
        },
      },
    });

    const text = response.text.trim();
    const result = JSON.parse(text);
    return result;

  } catch (error) {
    console.error("Error generating recommendation:", error);
    throw new Error("Failed to get a recommendation from the AI. Please try again.");
  }
}
