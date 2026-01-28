import express from 'express'
import "dotenv/config";
import cors from "cors"
import mongoose from 'mongoose';
import chatRoute from './routes/chat.js';

const app = express()
const PORT = 8080
app.use(express.json())
app.use(cors())
app.use("/api", chatRoute)

app.listen(PORT, () => {
  console.log(`App running on ${PORT}`)
  connectMongoDB();
})

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.MongoDB_URI)
    console.log("Connected to DB")
  }
  catch (err) {
    console.log("Error connecting to Database",err)
  }
}





// I used the below code for testing purposes. So I just kept it here instead of removing it.

/*app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: req.body.content }]
        }
      ]
    })
  }
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", options);
    const data = await response.json()
    //console.log(data.candidates[0].content.parts[0].text)
    res.send(data.candidates[0].content.parts[0].text)
  }
  catch (err) {
    console.log(err);
  }
})*/


