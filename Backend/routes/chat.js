import express from 'express'
import Thread from '../models/thread.js'
import getGeminiResponse from '../utils/gemini.js'

const router = express.Router()
//TESTING
router.post("/test", async (req, res) => {
    try {
        const thread = new Thread(
            {
                threadId: "testABC",
                title: "new test"
            });
        const response = await thread.save()
        res.send(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Error connecting to DB" })
    }
})
//Get all threads
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: - 1 })
        res.json(threads)

    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed to fetch threads" })
    }
})
//Fetch a single thread
router.get("/thread/:threadId", async (req, res) => {
    const {threadId} =req.params
    try {
        let thread = await Thread.findOne({threadId})
        if(!thread)
        {
            res.status(404).json({ error: "Cannot find this chat" })
        }
        res.json(thread.messages)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({error: "Failed to fetch chat"})
    }
})
//Delete a thread
router.delete("/thread/:threadId", async(req, res)=>
{
    const {threadId} =req.params
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId})
        if(!deletedThread)
        {
            res.status(404).json({ error: "Cannot delete this chat" })
        }
        res.status(200).json({success: "Thread deleted succesfully"})

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error:"Failed to delete therad"})
    }
})
router.post("/chat", async(req,res)=>
{
    const {threadId,message} = req.body;
    if(!threadId || !message)
    {
        res.status(404).json({error: "Missing field details"})
    }
    try{
        let thread = await Thread.findOne({threadId})
        if(!thread)
        {
            thread = new Thread({
                threadId,
                title: message,
                messages: [{role:"user", content: message}]

            })
        }
        else{
            thread.messages.push({role:"user", content: message})
        }
        const modelReply = await getGeminiResponse(message);
        thread.messages.push({role:"model", content: modelReply})
        thread.updatedAt = new Date();
        await thread.save()
        res.json({reply: modelReply})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({error: "Something went wrong"})
    }
})

export default router