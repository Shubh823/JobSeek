import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();



function extractJsonArray(text) {
    const match = text.match(/\[.*\]/s); // match anything between [ and ] (including line breaks)
    if (!match) {
      throw new Error("Failed to parse JSON array: Not found");
    }
  
    try {
      return JSON.parse(match[0]);
    } catch (err) {
      throw new Error("Failed to parse JSON array: " + err.message);
    }
  }
  



const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const getTipsOnResume = async (text) => {
    const prompt = `
   You're an ATS (Applicant Tracking System) optimization expert. Analyze the following resume text and suggest improvements to increase the ATS score for software development roles.

Give suggestions in bullet points categorized as:
1.change the format 
2.Add quantitative values
3.Add experience and any according to the resume texr given below



this bullets should be in the array consist of string limit the point to maximum 10 only only give me the array no extra text.

    ${text}
    `;

    try {

        const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" }); // Change model if needed

        const result = await model.generateContent(prompt);
        const response =  result.response;
        const outputText = response.text(); // get actual string output
        
        
        const parsedSuggestions = extractJsonArray(outputText);
        return { Tips: parsedSuggestions };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return [];
    }
}


