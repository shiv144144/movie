
import { GoogleGenAI, Type } from "@google/genai";
import { DetectedObject } from "../types";

// Always use the named parameter for apiKey and directly access process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const detectObjectsInFrame = async (base64Image: string): Promise<DetectedObject[]> => {
  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-flash-preview for general vision/text tasks as per guidelines
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image,
            },
          },
          {
            text: "Analyze this video frame. Identify 3-5 high-confidence shoppable objects like watches, phones, laptops, shoes, glasses, bags, or specific clothing. For each item, provide its name, its bounding box [ymin, xmin, ymax, xmax] as integers between 0-1000, and a confidence score.",
          }
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              box_2d: { 
                type: Type.ARRAY, 
                items: { type: Type.INTEGER },
                description: "[ymin, xmin, ymax, xmax] in 0-1000 normalized coordinates"
              },
              confidence: { type: Type.NUMBER },
            },
            required: ["name", "box_2d", "confidence"],
          },
        },
      },
    });

    // Extract text output using the .text property as per guidelines
    const results = JSON.parse(response.text?.trim() || "[]");
    
    return results.map((obj: any) => ({
      ...obj,
      amazonUrl: `https://www.amazon.com/s?k=${encodeURIComponent(obj.name)}`
    }));
  } catch (error) {
    console.error("Gemini Detection Error:", error);
    return [];
  }
};
