import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const  getSkillsFromResume= async (text)=> {
    const prompt = `
    given below is the text , you have to scan the text extract the data and return a single object consist of field skills,roles,technology nothing else only one object of this three fields do not add more extra things from the text given below the format of the objet in json format example :
     {
      "skills":["skill1","skill2","skill3"],
      "roles":["role1","role2","role3"],
      "technology":["tech1","tech2"],
     }
      strictly only in this format anf the fiels data should be extracted from the text given below only no extra data
    ${text}
    `;

    try {
        
        const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" }); // Change model if needed
        
        const result = await model.generateContent(prompt);
        

        const data =  result.response.text();
        const cleaned = data.replace(/```json|```/g, "").trim();
        try {
            const json = JSON.parse(cleaned);
            
            return json;
        } catch (jsonErr) {
            console.error("Failed to parse JSON from Gemini response:", jsonErr);
            json={skills:[],roles:[]}
            return json;
        }
        // console.log("Gemini API response:", JSON.stringify(data, null, 2)); // <--- Add this line
        


        // const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        // if (!rawText) {
        //     console.error("No text returned from Gemini API:", data);
        //     return { skills: [], roles: [] };
        // }

        // // Try to parse the raw text as JSON
        // try {
        //     const json = JSON.parse(rawText);
        //     return json;
        // } catch (jsonErr) {
        //     console.error("Failed to parse JSON from Gemini response:", rawText);
        //     return { skills: [], roles: [] };
        // }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return json;
    }
}


