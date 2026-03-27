import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getChatbotResponse } from "../../lib/gemini";

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
  urls?: string[];
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", text: "Hello! I'm the AI assistant for B.M.S. College of Engineering. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await getChatbotResponse(userMessage.text, history);
      
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "model", 
        text: response.text,
        urls: response.urls 
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), role: "model", text: "Sorry, I encountered an error. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-navy-900 text-white rounded-full shadow-2xl hover:bg-navy-800 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] max-h-[80vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="bg-navy-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="w-6 h-6 mr-2 text-gold-500" />
                <div>
                  <h3 className="font-bold text-sm">AI Assistant</h3>
                  <p className="text-xs text-gray-300">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-slate-950 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gold-500 ml-2' : 'bg-navy-900 dark:bg-slate-800 mr-2'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-navy-900" /> : <Bot className="w-4 h-4 text-gold-500 dark:text-gold-400" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-gold-500 text-navy-900 rounded-tr-none' : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-slate-700 rounded-tl-none'}`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      {msg.urls && msg.urls.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                            <LinkIcon className="w-3 h-3 mr-1" /> Sources:
                          </p>
                          <div className="flex flex-col gap-1">
                            {msg.urls.map((url, idx) => (
                              <a 
                                key={idx} 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
                              >
                                {url}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] flex-row">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 dark:bg-slate-800 mr-2 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gold-500 dark:text-gold-400" />
                    </div>
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-slate-700 rounded-tl-none flex items-center">
                      <Loader2 className="w-4 h-4 animate-spin text-navy-900 dark:text-white" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
              <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-full pr-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-8 h-8 rounded-full bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 flex items-center justify-center hover:bg-navy-800 dark:hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
