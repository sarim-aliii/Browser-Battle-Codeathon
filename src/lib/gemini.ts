import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getChatbotResponse = async (message: string, history: { role: string; parts: { text: string }[] }[]) => {
  try {
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: msg.parts
    }));
    
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: contents,
      config: {
        systemInstruction: "You are a helpful AI assistant for B.M.S. College of Engineering (BMSCE) portal. You help students, parents, and faculty find information about admissions, academics, placements, and campus facilities. Be professional, concise, and polite. BMSCE was founded in 1946 by Sri B. M. Sreenivasaiah, is located in Basavanagudi, Bengaluru, and the Principal is Dr. Bheemsha Arya. If you do not know the answer directly, you MUST use the googleSearch tool to search the B.M.S. College of Engineering website (bmsce.ac.in) and provide a summarized answer based on the search results.",
        tools: [{ googleSearch: {} }]
      }
    });

    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const urls = chunks ? chunks.map((chunk: any) => chunk.web?.uri).filter(Boolean) : [];

    return {
      text: response.text || "I'm sorry, I couldn't generate a response.",
      urls: Array.from(new Set(urls)) as string[]
    };
  } catch (error) {
    console.error("Error getting AI response:", error);
    return {
      text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
      urls: []
    };
  }
};
