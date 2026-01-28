import "./Chat.css"
import { useContext, useState, useEffect } from "react";
import { ChatContext } from "./MyContext";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

//react-markdown && rehype-highlight

function Chat() {
    const { newChat, prevChats, reply } = useContext(ChatContext)
    const [latestReply, setLatestReply] = useState(null)

    //Adding styling effect showing each words one by one
    useEffect(() => {
        if (reply === null) {
            setLatestReply(null)
            return;
        }
        if (!prevChats?.length) return;
        const content = reply.split(" ")

        let idx = 0;
        const interval = setInterval(() => {
            setLatestReply(content.slice(0, idx + 1).join(" "));
            idx++;
            if (idx >= content.length) clearInterval(interval)
        }, 50);
        return () => clearInterval(interval);

    }, [prevChats, reply])
    return (
        <>
            {newChat && <h1 className="newChat">Hi User <br></br> Where should we start?</h1>}
            <div className="chats">
                {
                    prevChats?.slice(0, -1).map((chat, idx) =>
                        <div className={chat.role === "user" ? "userDiv" : "botDiv"} key={idx}>
                            {
                                chat.role === "user" ? <p className="userMessage">{chat.content}</p> :
                                    <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )

                }
                {
                    prevChats.length > 0 && (
                        <div className="botMessage" key="styleMessage">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                {latestReply !== null
                                    ? latestReply
                                    : prevChats[prevChats.length - 1].content}
                            </ReactMarkdown>
                        </div>
                    )
                }


            </div>
        </>
    )
}
export default Chat;