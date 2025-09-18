import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, History, Send } from "lucide-react";
import { SYSTEM_PROMPT, SAMPLE_PROMPTS, FALLBACK_RESPONSES } from "../utils/chatbotContext";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hi! I'm here to help you with any questions about BiruhKids Pediatric Specialty Clinic. How can I assist you with your child's healthcare today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const conversationHistory = useRef([
    { role: "system", content: SYSTEM_PROMPT },
  ]);

  // Load Puter SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("biruhkids-chatHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("biruhkids-chatHistory", JSON.stringify(history));
  }, [history]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateAIResponse = async (userMessage) => {
    if (!window.puter) {
      return getFallbackResponse(userMessage);
    }

    try {
      conversationHistory.current.push({
        role: "user",
        content: userMessage,
      });

      const response = await window.puter.ai.chat(conversationHistory.current);
      const reply = response.message?.content || getFallbackResponse(userMessage);

      conversationHistory.current.push({
        role: "assistant",
        content: reply,
      });

      return reply;
    } catch (error) {
      console.error("AI response error:", error);
      return getFallbackResponse(userMessage);
    }
  };

  const getFallbackResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(FALLBACK_RESPONSES)) {
      if (lowerQuestion.includes(key.replace(/\?/g, ""))) {
        return response;
      }
    }
    
    return FALLBACK_RESPONSES.default;
  };

  const handleSend = async (customText) => {
    const message = customText || input;
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const responseText = await generateAIResponse(message);
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      
      const newConversation = [userMessage, botMessage];
      setHistory((prev) => [...prev, newConversation]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again or contact our team directly.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
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
        <div className="fixed bottom-6 inset-x-2 mx-auto z-50 w-[95%] max-w-sm h-[70vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-200 sm:inset-x-auto sm:right-6 sm:mx-0 sm:w-96 sm:h-[520px]">
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
                <div className="px-3 py-2 bg-white border rounded-2xl text-sm text-gray-500 w-fit">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: "0.2s"}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: "0.4s"}}></div>
                    </div>
                    <span>Assistant is typing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
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

          {/* Quick Questions (only if initial message and not viewing history) */}
          {messages.length === 1 && !showHistory && (
            <div className="p-3 bg-white border-t">
              <p className="text-xs text-gray-500 mb-2 text-center">Try asking:</p>
              <div className="grid grid-cols-1 gap-2">
                {SAMPLE_PROMPTS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-xs hover:bg-blue-200 transition text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
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
                placeholder="Ask me about your child's healthcare..."
                onKeyPress={handleKeyPress}
                disabled={typing}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || typing}
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Send size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
