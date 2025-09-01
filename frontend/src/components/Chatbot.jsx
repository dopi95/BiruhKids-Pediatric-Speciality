import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const quickQuestions = [
    "What services do you provide?",
    "What is your mission?",
    "What makes Biruhkids different?",
  ];

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

    setMessages([...messages, { sender: "user", text: message }]);
    setInput("");

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: getBotReply(message) },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-500 to-blue-700 p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white flex justify-between items-center p-4">
            <div>
              <h2 className="font-bold text-lg">Biruhkids AI Chatbot</h2>
              <p className="text-xs opacity-90">
                Welcome to Biruhkids Pediatric Specialty Clinic 👶💙 <br />
                How can I help you today?
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-blue-600 p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
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

          {/* Quick Questions */}
          {messages.length === 0 && (
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
          <div className="p-3 border-t bg-white flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
        </div>
      )}
    </>
  );
};

export default Chatbot;
