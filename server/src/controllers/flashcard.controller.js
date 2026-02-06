import fs from "fs";

export const processPdfUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded." });
    }

    const pdfParse = (await import("pdf-parse")).default; // dynamic import
    const dataBuffer = fs.readFileSync(req.file.path);
    const data = await pdfParse(dataBuffer);

    const extractedText = data.text;

    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      message: "Intel extracted! Ready to forge flashcards.",
      text: extractedText,
    });
  } catch (error) {
    console.error("Extraction Error:", error);
    res.status(500).json({ error: "The system failed to read the scroll." });
  }
};
