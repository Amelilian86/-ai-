
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { AnalysisInput } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const generateInvestmentMemo = async (input: AnalysisInput): Promise<string> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
Task Type: ${input.taskType}
Investment Context:
${input.contextText}

Raw Quant/Stats Output:
${input.resultText}

Extracted Metrics:
${input.extractedMetricsJson || "None provided"}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.4,
        thinkingConfig: { thinkingBudget: 4000 }
      },
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
