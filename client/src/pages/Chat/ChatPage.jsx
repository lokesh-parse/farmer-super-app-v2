import { useState } from "react";
import { sendMessage } from "../../services/chatService";
import { addHistoryItem } from "../../utils/history";

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Welcome! I'm here to help you with all your farming questions.\nWhat would you like to know about today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend) => {
    const currentMessage = typeof textToSend === 'string' ? textToSend : input;
    if (!currentMessage.trim() || loading) return;

    const userMsg = { type: "user", text: currentMessage };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await sendMessage(currentMessage);
      const botMsg = {
        type: "bot",
        text: res.reply || "No response from server.",
      };
      setMessages((prev) => [...prev, botMsg]);

      addHistoryItem({
        type: "AI Chat",
        detail: currentMessage,
        time: new Date().toLocaleString(),
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          text: "Server error. Please check backend connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const suggestedQuestions = [
    { icon: "🍃", text: "Which crop is best for my soil type?" },
    { icon: "🌧️", text: "Will it rain in my area tomorrow?" },
    { icon: "🪲", text: "My plant leaves are yellow. What's wrong?" },
    { icon: "💧", text: "How much water does my crop need?" },
    { icon: "🌾", text: "What fertilizer should I use?" },
    { icon: "📊", text: "Show me current market prices" }
  ];

  const categoryPills = [
    { icon: "🌿", text: "Crop Advice" },
    { icon: "☁️", text: "Weather" },
    { icon: "🪲", text: "Pest & Disease" },
    { icon: "💧", text: "Irrigation" },
    { icon: "🟤", text: "Soil Health" },
    { icon: "📊", text: "Market Prices" }
  ];

  return (
    <div className="farm-ai-page">
      
      {/* Page Header */}
      <div className="farm-ai-header">
        <div>
          <h1>Farm AI Assistant 🌱</h1>
          <p>Your intelligent farming companion. Get expert advice on crops, soil, weather, and more.</p>
        </div>
        <div className="ai-powered-badge">✨ AI Powered</div>
      </div>

      {/* Dark Green Hero Banner */}
      <div className="farm-ai-hero">
        <div className="hero-left">
          <div className="robot-avatar-large">🤖</div>
          <div className="hero-welcome-text">
            <h2>Hello! I'm your Farm AI Assistant 🌱</h2>
            <p>I can help you with crop recommendations, disease diagnosis, irrigation advice, weather insights, soil health, and much more.</p>
          </div>
        </div>
        <div className="hero-right-grid">
          <div className="hero-feature">
            <div className="feat-icon bg-feat-green">🌿</div>
            <div className="feat-info">
              <strong>Expert Knowledge</strong>
              <span>Trained on agricultural best practices</span>
            </div>
          </div>
          <div className="hero-feature">
            <div className="feat-icon bg-feat-blue">☁️</div>
            <div className="feat-info">
              <strong>Real-time Data</strong>
              <span>Live weather, market & soil data</span>
            </div>
          </div>
          <div className="hero-feature">
            <div className="feat-icon bg-feat-lightgreen">🍃</div>
            <div className="feat-info">
              <strong>Personalized Advice</strong>
              <span>Recommendations for your specific needs</span>
            </div>
          </div>
          <div className="hero-feature">
            <div className="feat-icon bg-feat-orange">⚡</div>
            <div className="feat-info">
              <strong>24/7 Available</strong>
              <span>Always here when you need help</span>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Questions (Horizontal Scroll) */}
      <div className="suggested-section">
        <div className="suggested-header">
          <h3>Suggested Questions</h3>
          <div className="suggested-nav">
            <button className="nav-btn">❮</button>
            <button className="nav-btn">❯</button>
          </div>
        </div>
        <div className="suggested-scroll-container">
          {suggestedQuestions.map((q, idx) => (
            <div key={idx} className="suggested-card" onClick={() => handleSend(q.text)}>
              <span className="sc-icon">{q.icon}</span>
              <p>{q.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area Container */}
      <div className="farm-chat-container">
        <div className="farm-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`farm-msg-wrapper ${msg.type}`}>
              {msg.type === "bot" && (
                <div className="farm-msg-avatar">🤖</div>
              )}
              <div className={`farm-msg-bubble ${msg.type}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="farm-msg-wrapper bot">
              <div className="farm-msg-avatar">🤖</div>
              <div className="farm-msg-bubble bot typing-indicator">
                <span>.</span><span>.</span><span>.</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Input Area */}
        <div className="farm-chat-bottom">
          
          <div className="category-pills">
            {categoryPills.map((pill, idx) => (
              <button key={idx} className="cat-pill-btn" onClick={() => handleSend(pill.text)}>
                {pill.icon} {pill.text}
              </button>
            ))}
          </div>

          <div className="modern-input-box">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about farming..."
            />
            <div className="input-actions">
              <button className="icon-btn">📎</button>
              <button className="icon-btn">🎤</button>
              <button className="send-action-btn" onClick={() => handleSend(input)} disabled={loading}>
                ➤
              </button>
            </div>
          </div>
          
          <div className="disclaimer-footer">
            🛡️ AI responses are for guidance only. Please consult local agricultural experts for critical decisions.
          </div>
        </div>
      </div>

    </div>
  );
}

export default ChatPage;