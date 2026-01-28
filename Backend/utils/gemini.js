import "dotenv/config"
import { systemInstruction } from "./custom_prompt.js";


const getGeminiResponse = async (message) =>
{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY
        },

        body: JSON.stringify({
            systemInstruction: { role: "system", parts: [{ text: systemInstruction }] },
            contents: [
                {
                    parts: [{ text: message }]
                }
            ]
        })
    }
    try {
        const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", options);
        const data = await response.json()
        if (!response.ok) {
            console.log("API Error:", data);
            return "Sorry, I couldn't generate a response right now.";
        }
        if (!data.candidates || data.candidates.length === 0) {
            console.log("No candidates in response:", data);
            return "Sorry, I couldn't generate a response right now.";
        }
        return data.candidates[0].content.parts[0].text
    }
    catch (err) {
        console.log(err);
        return "Sorry, there was an error processing your request.";
    }
}

export default getGeminiResponse;