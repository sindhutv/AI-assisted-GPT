import Markdown from "react-markdown";

export function Message({ msg }) {
  const isUser = msg.sender === 'user';

  return (
    <div className={`message-row ${isUser ? 'user-row' : 'ai-row'}`}>

      {!isUser && (
        <div className="ai-avatar">
          S
        </div>
      )}

      <div className={`message ${isUser ? 'user-message' : 'ai-message'}`}>
       <Markdown>{msg.text}</Markdown>
      </div>

    </div>
  );
}