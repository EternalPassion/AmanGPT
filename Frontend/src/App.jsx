import './App.css'
import Sidebar from './sidebar.jsx'
import ChatWindow from './ChatWindow.jsx'
import { ChatContext } from './MyContext.jsx'
import { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';

function App() {
  const [ prompt, setPrompt ] = useState('') 
  const [ reply, setReply ] = useState('null')
  const [ currThreadId, setCurrThreadId] = useState(uuidv1()) //Thread Id for each threads
  const [prevChats, setPrevChats] = useState([]);  // For storing chat history
  const [ newChat, setNewChat ] = useState(true);
  const [ allThreads, seeAllThreads ] = useState([])

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, seeAllThreads
  };

  return (
    <div className='main'>
      <ChatContext.Provider value={providerValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </ChatContext.Provider>
    </div>

  )
}

export default App
