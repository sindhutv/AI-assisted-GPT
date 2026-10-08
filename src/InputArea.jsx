export function InputArea({
  handleSend,
  message,
  setMessage,
  loading
}) {
  return (
    <div className="input-area">

      <div className="input-box">

        <input
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !loading) {
              handleSend();
            }
          }}
          placeholder="Message SindhuGPT..."
          disabled={loading}
        />

        <button
          className="send-button"
          onClick={handleSend}
          disabled={loading || message.trim() === ''}
        >
          ↑
        </button>

      </div>

      <p className="input-hint">
        SindhuGPT can make mistakes. Check important information.
      </p>

    </div>
  );
}