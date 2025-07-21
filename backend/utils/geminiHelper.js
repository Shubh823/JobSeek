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
        let json;
        try {
             json = JSON.parse(cleaned);
            console.log(json);
            return json;
        } catch (jsonErr) {
            console.error("Failed to parse JSON from Gemini response:", jsonErr);
            json={skills:[],roles:[]}
            return json;
        }
         

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return json;
    }
}


