import { useState, useRef, useEffect } from 'react'
import { Message } from './Message';
import { InputArea } from './InputArea';
import { TypingIndicator } from './TypingIndicator';
import './App.css'

function ChatBot() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const chatAreaRef = useRef(null);

  useEffect(() => {
    chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
  }, [messages,loading]);

  function handleSend() {
    if (message.trim() === '') return;
    setMessages([...messages,
    {
      sender: "user",
      text: message
    }
    ])
    setMessage('')
    setLoading(true);

    fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        messages: messages
      })
    })
      .then(response => response.json())
      .then(data => {
  
        setMessages(previousMessages => [...previousMessages,
        {
          sender: "SindhuGPT",
          text: data.message
        },
        ])
        setLoading(false)
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false)
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ready When you are.</h1>
      </header>

      <div className="chat-area" ref={chatAreaRef}>
        {messages.map((msg, index) => (
          <Message key={index} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
      </div>

      <InputArea
        handleSend={handleSend}
        message={message}
        setMessage={setMessage}
        loading={loading}
      />
    </div >
  )
}

export default ChatBot
