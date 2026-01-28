import "./Sidebar.css"
import { useContext, useEffect } from "react"
import { ChatContext } from './MyContext.jsx'
import { v1 as uuidv1 } from 'uuid';

function Sidebar() {
    const { allThreads, seeAllThreads, currThreadId, setNewChat, setReply, setPrompt, setCurrThreadId, setPrevChats } = useContext(ChatContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const getIdTitle = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            //console.log(getIdTitle)
            seeAllThreads(getIdTitle)
        }
        catch {
            console.log(err)
        }
    };
    useEffect(() => {
        getAllThreads();
    }, [currThreadId])

    const createNewChat = () => {
        setNewChat(true);
        setPrompt('');
        setReply(null);
        setCurrThreadId(uuidv1());
        setPrevChats([]);
    }

    //Show thread messages
    const showThread = async (newThreadId) => {
        setCurrThreadId(newThreadId)
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`)
            const res = await response.json()
            console.log(res)
            setPrevChats(res)
            setReply(null)
            setNewChat(false)
        }
        catch {
            console.log(err);
        }
    }

    const deleteThread = async (ThreadId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/thread/${ThreadId}`, { method: "DELETE" });
            const res = await response.json();
            console.log(res)
            //updating the deleted thread
            seeAllThreads(prev => prev.filter(thread => thread.threadId !== ThreadId))
            if (ThreadId === currThreadId) {
                createNewChat();
            }

        }
        catch (err) {
            console.log(err);
        }

    }

    return (
        <section className="holder">
            <button className="icon" onClick={createNewChat}>
                <i className="hgi hgi-stroke hgi-pencil-edit-02"></i>
                <p>New chat</p>
            </button>
            <p className="recent">Recent</p>

            <ul className="history">
                    {
                        allThreads?.map((thread, idx) => (
                            <li key={idx} onClick={() => showThread(thread.threadId)}>{thread.title}
                                <i className="fa-solid fa-trash" onClick={(e) => {
                                    e.stopPropagation(); //To stop even bubbling
                                    deleteThread(thread.threadId);
                                }
                                }></i>&nbsp;</li>
                        ))
                    }
            </ul>
            <div className="sign">
                <hr></hr><p>By Aman Kumar Shaw</p>
            </div>

        </section>

    );
}

export default Sidebar;
