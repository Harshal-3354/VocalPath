import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const ResumeUploader = ({ onExtract }) => {
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const extractTextFromPDF = async (file) => {
    setLoading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map((item) => item.str);
          fullText += strings.join(" ") + "\n";
        }

        setFileName(file.name);
        onExtract(fullText.trim());
      };

      reader.readAsArrayBuffer(file);
    } catch (err) {
      console.error("Error extracting PDF:", err);
      alert("Failed to extract text from resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => extractTextFromPDF(e.target.files[0])}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0 file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      {loading && <p className="text-blue-600 text-sm">Extracting text...</p>}
      {fileName && (
        <p className="text-green-600 text-sm">✔️ Uploaded: {fileName}</p>
      )}
    </div>
  );
};

export default ResumeUploader;
