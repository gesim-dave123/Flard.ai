import pdfParse from "@cedrugs/pdf-parse";
import {runPrompt} from "../services/gemini.js";
import fs from "fs";

export const processPdfUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);
    const extractedText = data.text;
    // fs.unlinkSync(req.file.path);
    console.log("PDF processed successfully. Extracted text length:", extractedText.length);
    console.log("Now forging flashcards with Gemini...");
    const flashcards = await runPrompt(extractedText);

    console.log("Flashcards generated successfully:", flashcards);


    res.status(200).json({
      success: true,
      message: "Intel extracted! Ready to forge flashcards.",
      
    });
  
  } catch (error) {
    console.error("Extraction Error:", error);
    res.status(500).json({ error: "The system failed to read the scroll." });
  }
};
