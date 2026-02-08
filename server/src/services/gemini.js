import dotenv from "dotenv";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const runPrompt = async (extractedText) => {
  try {
    // 1. Use gemini-1.5-flash: Fast, free, and highly reliable for extraction
    // 2. Add responseMimeType to FORCE valid JSON output
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    // 3. Optimized Prompt: Clearer structure for better AI understanding
    const prompt = `
      You are a specialized flashcard generator. 
      Analyze the following text and generate 10 high-quality flashcards.
      
      Text: "${extractedText.substring(0, 20000)}"

      Return ONLY a JSON object with this exact structure:
      {
        "flashcards": [
          {
            "question": "The question here",
            "choices": ["Choice A", "Choice B", "Choice C", "Choice D"],
            "answer": "The correct choice exactly as written in the choices array"
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // 4. Return the parsed object directly so your controller can use it
    const parsedData = JSON.parse(text);
    console.log(
      "Forge Successful: Generated",
      parsedData.flashcards?.length,
      "cards.",
    );
    return parsedData;
  } catch (error) {
    // Handle the common "Safety" block or "Rate Limit" errors specifically
    console.error("Forge Error:", error.message);
    throw new Error("The AI Forge failed to process the scroll.");
  }
};
