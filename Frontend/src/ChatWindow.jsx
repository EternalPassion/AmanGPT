import "./ChatWindow.css"
import Chat from "./Chat.jsx";
import { ChatContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

function ChatWindow() {
    const { prompt, setPrompt, reply, setReply, currThreadId, prevChats, setPrevChats, setNewChat } = useContext(ChatContext);
    const [loading, setLoading] = useState(false);
    const getReply = async () => {
        setNewChat(false)
        setLoading(true);
        console.log("message", prompt, "threadId", currThreadId);
        const options = {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    message: prompt,
                    threadId: currThreadId
                })
        };
        try {
            const response = await fetch("http://localhost:8080/api/chat", options)
            const res = await response.json();
            console.log(res)
            setReply(res.reply);
        }
        catch (err) {
            console.log(err)
        }
        setLoading(false);
    }
    //Appending chats like an array to prevChats
    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats =>
            (
                [...prevChats,
                {
                    role: "user",
                    content: prompt
                },
                {
                    role: "model",
                    content: reply
                }
                ]
            ))
        }
        setPrompt("");

    }, [reply]);

    return (
        <div className="ChatWindow">
            <div className="upper">
                <span className="logo">AmanGPT</span>
                <div className="user">
                    <i className="hgi hgi-stroke hgi-user"></i>
                </div>
            </div>

            <Chat></Chat>
            <RingLoader className="loader" color="rgb(196, 199, 197)" loading={loading}>
            </RingLoader>
            <div className="Input_container">
                <div className="Input">
                    <input className="userInput" placeholder="Ask AmanGPT"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' ? getReply() : ''}
                    ></input>
                    <i className="hgi hgi-stroke hgi-sent" onClick={getReply}></i>
                </div>
                <p className="disclamer">AmanGPT can make mistakes, so double-check it</p>
            </div>
        </div>
    );
}

export default ChatWindow;
