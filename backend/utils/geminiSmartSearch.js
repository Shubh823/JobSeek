import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const smartSearch = async (query) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a helpful assistant. Convert this user search query into an array of keywords or phrases relevant to developer jobs.
Return only a clean JSON array of keywords. Do not give extra keywords, only the ones mentioned in the query, output should be stricltly only array of key words no extra text.
User query: ${query}
Output example: ["React", "Frontend", "JavaScript"]
    `;

    const result = await model.generateContent(prompt);
    const text = await result.response.text(); // 👈 await here
    
    const matchedJson = text.match(/\[.*?\]/s);
    if (!matchedJson) throw new Error("Could not parse AI response.");

    const parsedKeywords = JSON.parse(matchedJson[0]);

    console.log(parsedKeywords);
    return parsedKeywords;

  } catch (error) {
    console.error("Smart search error:", error.message);
    return [];
  }
};
