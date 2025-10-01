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



  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("biruhkids-chatHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      // Convert timestamp strings back to Date objects
      const historyWithDates = parsedHistory.map(conv => ({
        ...conv,
        timestamp: new Date(conv.timestamp),
        messages: conv.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setHistory(historyWithDates);
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
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationHistory.current.slice(1) // Exclude system prompt
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      const reply = data.response || getIntelligentResponse(userMessage);

      conversationHistory.current.push(
        { role: "user", content: userMessage },
        { role: "assistant", content: reply }
      );

      return reply;
    } catch (error) {
      return getIntelligentResponse(userMessage);
    }
  };

  const getIntelligentResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    
    // Healthcare-specific keywords
    const keywords = {
      appointment: ["appointment", "book", "schedule", "visit"],
      services: ["service", "treatment", "care", "what do you do"],
      location: ["where", "location", "address", "find you"],
      emergency: ["emergency", "urgent", "24/7", "immediate"],
      hours: ["hours", "time", "open", "close", "when"],
      cost: ["cost", "price", "fee", "charge", "payment"],
      doctors: ["doctor", "pediatrician", "staff", "team"],
      vaccination: ["vaccine", "immunization", "shot", "vaccination"],
      nutrition: ["nutrition", "feeding", "diet", "food"],
      lab: ["lab", "test", "blood", "urine", "laboratory"],
      results: ["result", "report", "online", "receive", "get my", "check my"]
    };

    // Check for keyword matches
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => lowerQuestion.includes(word))) {
        switch(category) {
          case 'appointment':
            return "📅 You can book an appointment online through our website by filling out the appointment form. Once submitted, you'll receive a confirmation email or we'll call you to confirm your appointment. For further assistance, contact us at ☎️ 0996505319 / 0939602927 / 0984650912 or biruhkidsclinic@gmail.com.";
          case 'services':
            return "🏥 BiruhKids offers comprehensive pediatric care including OPD services, 24/7 emergency care, advanced laboratory & imaging, pediatric surgery, and nutrition counseling. We specialize in well-baby follow-ups, growth monitoring, and special needs evaluations.";
          case 'location':
            return "📍 We're located at Torhayloch, 100 meters from Augusta Bridge, Addis Ababa, Ethiopia. Easy to find and accessible for families!";
          case 'emergency':
            return "🚨 Yes! We provide 24/7 pediatric emergency services. For immediate emergencies, please call ☎️ 0996505319 / 0939602927 / 0984650912 right away.";
          case 'doctors':
            return "👨‍⚕️ Our experienced team includes specialized pediatricians, nurses, radiologists, and lab technicians - all dedicated to providing the best care for your child.";
          case 'vaccination':
            return "💉 Yes, we provide all recommended pediatric immunizations following national and international guidelines. Schedule a vaccination appointment today!";
          case 'nutrition':
            return "🥗 We offer specialized pediatric nutrition counseling for infant feeding, childhood nutrition, and management of undernutrition or obesity.";
          case 'lab':
            return "🔬 Our advanced laboratory provides comprehensive pediatric blood work, hormonal panels, metabolic testing, and infectious disease screening.";
          case 'results':
            return "📋 Yes! You can access your lab results and reports online. Here's how:\n\n1️⃣ Visit our website\n2️⃣ Click the 'Sign In' tab\n3️⃣ Enter your email and password\n4️⃣ You'll be redirected to your user dashboard where you can see your result history\n\nAlternatively, call us at ☎️ 0996505319 / 0939602927 / 0984650912. Results are typically available within 24-48 hours.";
          default:
            return FALLBACK_RESPONSES.default;
        }
      }
    }
    
    // Check original fallback responses
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
      
      // History is now saved when closing chat
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
    // Save current conversation to history before clearing
    if (messages.length > 1) {
      const conversation = {
        id: Date.now(),
        timestamp: new Date(),
        messages: [...messages]
      };
      setHistory(prev => [conversation, ...prev.slice(0, 9)]); // Keep last 10 conversations
    }
    setMessages([
      {
        id: "1",
        text: "Hi! I'm here to help you with any questions about BiruhKids Pediatric Specialty Clinic. How can I assist you with your child's healthcare today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setTyping(false);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-4 z-50 bg-gradient-to-r from-blue-500 to-blue-700 p-3 sm:p-4 rounded-full shadow-lg text-white hover:scale-110 transition-transform"
        >
          <MessageCircle size={24} className="sm:w-7 sm:h-7" />
        </button>
      )}

      {/* Chat Popup */}
      {open && (
        <div className="fixed bottom-6 inset-x-2 mx-auto z-50 w-[95%] max-w-md h-[75vh] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-gray-200 sm:inset-x-auto sm:right-6 sm:mx-0 sm:w-[420px] sm:h-[580px] md:w-[450px] lg:w-[480px]">
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
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
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
                <div className="flex gap-2">
                  {history.length > 0 && (
                    <button
                      onClick={() => {
                        setHistory([]);
                        localStorage.removeItem("biruhkids-chatHistory");
                      }}
                      className="text-red-600 text-xs font-medium hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => {
                      // Save current conversation to history before starting new chat
                      if (messages.length > 1) {
                        const conversation = {
                          id: Date.now(),
                          timestamp: new Date(),
                          messages: [...messages]
                        };
                        setHistory(prev => [conversation, ...prev.slice(0, 9)]); // Keep last 10 conversations
                      }
                      
                      setShowHistory(false);
                      setMessages([
                        {
                          id: "1",
                          text: "Hi! I'm here to help you with any questions about BiruhKids Pediatric Specialty Clinic. How can I assist you with your child's healthcare today?",
                          sender: "bot",
                          timestamp: new Date(),
                        },
                      ]);
                      conversationHistory.current = [
                        { role: "system", content: SYSTEM_PROMPT },
                      ];
                    }}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    ➕ New Chat
                  </button>
                </div>
              </div>

              {history.length === 0 && (
                <p className="text-gray-500 text-sm mt-2">No chat history yet. Start a conversation and it will be saved here when you close the chat.</p>
              )}

              {history.map((conv, idx) => (
                <div
                  key={conv.id}
                  className="p-4 bg-white border rounded-lg shadow-sm space-y-3 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setMessages(conv.messages);
                    setShowHistory(false);
                  }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {conv.timestamp.toLocaleDateString()} {conv.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {conv.messages.filter(m => m.sender === 'user').length} questions
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 line-clamp-2">
                    <strong>First question:</strong> {conv.messages.find(m => m.sender === 'user')?.text || 'No question'}
                  </div>
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
