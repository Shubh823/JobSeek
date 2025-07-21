import { GoogleGenerativeAI } from "@google/generative-ai";
import { Job } from "./models/job.model.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./utils/db.js";
connectDB();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const smartSearch = async (query) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a helpful assistant. Convert this user search query into an array of keywords or phrases relevant to developer jobs.
Return only a clean JSON array of keywords. do not give extra keyword only mention in the query 
User query: "${query}"
Output example: ["React", "Frontend", "JavaScript"]
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract the clean JSON array
    const matchedJson = text.match(/\[.*?\]/s);
    if (!matchedJson) throw new Error("Could not parse AI response.");
    const parsedKeywords = JSON.parse(matchedJson[0]);
    
    console.log(parsedKeywords);
    // Build MongoDB OR filter for keywords in relevant fields
    const searchConditions = parsedKeywords.flatMap((keyword) => [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
      { requirements: { $regex: keyword, $options: "i" } },
      { jobType: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } },
    ]);

    const jobs = await Job.find({ $or: searchConditions }).limit(3);
    console.log(jobs);
    return jobs;
  } catch (error) {
    console.error("Smart search error:", error.message);
    return [];
  }
};


// Example usage
// smartSearch("looking for backend jobs with nodejs and mongodb");


smartSearch("give me jon related to frontend having react and html or css ");
