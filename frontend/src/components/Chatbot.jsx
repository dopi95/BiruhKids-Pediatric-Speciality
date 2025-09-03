import React, { useState, useEffect } from "react";
import { MessageCircle, X, History } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const quickQuestions = [
    "What services do you provide?",
    "What is your mission?",
    "What makes Biruhkids different?",
  ];

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("chatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const getBotReply = (question) => {
    switch (question.toLowerCase()) {
      case "what services do you provide?":
        return "🌟 We provide pediatric check-ups, vaccinations, growth monitoring, and specialized care for children with unique needs.";
      case "what is your mission?":
        return "💙 Our mission is to deliver compassionate, family-centered healthcare that helps every child grow healthy and strong.";
      case "what makes biruhkids different?":
        return "✨ At Biruhkids, we offer personalized care in a child-friendly environment, supported by a team of pediatric specialists who truly care.";
      default:
        return "Thanks for asking! Our friendly staff can provide more details if you contact us directly.";
    }
  };

  const handleSend = (customText) => {
    const message = customText || input;
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: message }]);
    setInput("");

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = getBotReply(message);
      const newMessages = [
        { sender: "user", text: message },
        { sender: "bot", text: reply },
      ];

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);

      // Save this Q&A into history
      setHistory((prev) => [...prev, newMessages]);
    }, 1200);
  };

  const handleClose = () => {
    setOpen(false);
    setMessages([]); // clear current chat when closing
    setTyping(false);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-6 z-50 bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[95%] max-w-sm h-[70vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-200 sm:w-96 sm:h-[520px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white flex justify-between items-center p-4">
            <div>
              <h2 className="font-bold text-lg">Biruhkids AI Chatbot</h2>
              <p className="text-xs opacity-90">
                Welcome to Biruhkids Pediatric Specialty Clinic <br />
                How can I help you today?
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="hover:bg-blue-600 p-1 rounded-full"
                title="View History"
              >
                <History size={20} />
              </button>
              <button
                onClick={handleClose}
                className="hover:bg-blue-600 p-1 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages or History */}
          {!showHistory ? (
            <div className="flex-1 px-4 py-3 space-y-3 bg-gray-50 overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white ml-auto rounded-br-none"
                      : "bg-white border shadow-sm text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {typing && (
                <div className="px-3 py-2 bg-white border rounded-2xl text-sm text-gray-500 w-fit animate-pulse">
                  Bot is typing...
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 px-4 py-3 space-y-4 bg-gray-50 overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-700">Chat History</h3>
                <button
                  onClick={() => setShowHistory(false)}
                  className="text-blue-600 text-sm font-medium hover:underline"
                >
                  ➕ New Chat
                </button>
              </div>

              {history.length === 0 && (
                <p className="text-gray-500 text-sm mt-2">No history yet.</p>
              )}

              {history.map((conv, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border rounded-lg shadow-sm space-y-2"
                >
                  {conv.map((msg, i) => (
                    <div
                      key={i}
                      className={`text-sm ${
                        msg.sender === "user"
                          ? "text-blue-700 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {msg.sender === "user" ? "You: " : "Bot: "}
                      {msg.text}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Quick Questions (only if no messages and not viewing history) */}
          {messages.length === 0 && !showHistory && (
            <div className="p-3 bg-white border-t flex flex-wrap gap-2 justify-center">
              {quickQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs hover:bg-blue-200 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          {!showHistory && (
            <div className="p-3 border-t bg-white flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Type your message..."
              />
              <button
                onClick={() => handleSend()}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-2 rounded-full hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
