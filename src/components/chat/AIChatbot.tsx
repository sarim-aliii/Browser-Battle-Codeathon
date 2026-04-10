import { useState, useRef, useEffect, FormEvent } from "react";
import { 
  MessageSquare, X, Send, Bot, User, 
  Loader2, Link as LinkIcon, Globe, Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getChatbotResponse } from "../../lib/gemini";

type Message = {
  id: string;
  role: "user" | "model";
  text: string;
  urls?: string[];
};

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "kn", name: "Kannada" },
  { code: "hi", name: "Hindi" },
  { code: "te", name: "Telugu" },
  { code: "fr", name: "French" }
];

const QUICK_PROMPTS = [
  "What are the admission requirements?",
  "Tell me about the CSE department",
  "Where is the main library?",
  "Show me the campus map"
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "model", text: "Hello! I'm the AI assistant for B.M.S. College of Engineering. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");
  const [showLangMenu, setShowLangMenu] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: FormEvent, textOverride?: string) => {
    if (e) e.preventDefault();
    
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter(m => m.id !== "1") 
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
      }));
      
      // Inject language instruction without showing it in the user's chat bubble
      const promptWithLanguage = selectedLang === "English" 
        ? textToSend 
        : `[Please respond accurately in ${selectedLang}] ${textToSend}`;
      
      const response = await getChatbotResponse(promptWithLanguage, history);
      
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
        className={`fixed bottom-6 right-6 p-4 bg-navy-900 text-white rounded-full shadow-2xl hover:bg-navy-800 transition-all duration-300 z-50 flex items-center justify-center hover:scale-105 ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
        {/* Unread indicator dot */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[85vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-200 dark:border-slate-800"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 text-white p-4 flex justify-between items-center relative">
              <div className="flex items-center">
                <div className="bg-white/10 p-2 rounded-lg mr-3 backdrop-blur-sm">
                  <Bot className="w-6 h-6 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-bold text-sm flex items-center gap-1">
                    BMSCE Assistant <Sparkles className="w-3 h-3 text-gold-400" />
                  </h3>
                  <p className="text-xs text-gray-300">Powered by Gemini AI</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Language Selector */}
                <div className="relative">
                  <button 
                    onClick={() => setShowLangMenu(!showLangMenu)}
                    className="flex items-center gap-1 text-xs bg-white/10 hover:bg-white/20 px-2 py-1.5 rounded-md transition-colors"
                  >
                    <Globe className="w-3 h-3" /> {selectedLang}
                  </button>
                  
                  {showLangMenu && (
                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 min-w-[120px] border border-gray-100 dark:border-slate-700 z-50">
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setSelectedLang(lang.name);
                            setShowLangMenu(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-gray-100 dark:hover:bg-slate-700 ${selectedLang === lang.name ? 'text-gold-600 font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white bg-white/5 hover:bg-white/20 p-1.5 rounded-md transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 dark:bg-slate-950/50 space-y-4">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-gold-500 ml-2' : 'bg-navy-900 dark:bg-slate-800 mr-2 shadow-sm'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-navy-900" /> : <Bot className="w-4 h-4 text-gold-500" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-gold-500 text-navy-900 rounded-tr-none shadow-sm' : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-slate-700 rounded-tl-none leading-relaxed'}`}>
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                      
                      {/* URL Sources Renderer */}
                      {msg.urls && msg.urls.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                            <LinkIcon className="w-3 h-3 mr-1" /> Sources:
                          </p>
                          <div className="flex flex-col gap-1.5">
                            {msg.urls.map((url, idx) => (
                              <a 
                                key={idx} 
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline truncate flex items-center gap-1 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded"
                              >
                                {url}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Quick Prompts (Only show if just the welcome message exists) */}
              {messages.length === 1 && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-2 mt-4 ml-10"
                >
                  <p className="text-xs text-gray-400 font-medium mb-1">Suggested Questions:</p>
                  {QUICK_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSend(undefined, prompt)}
                      className="text-left text-xs bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-navy-600 dark:text-gray-300 px-3 py-2 rounded-xl hover:bg-gold-50 dark:hover:bg-slate-700 hover:border-gold-300 transition-all shadow-sm w-fit"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              {/* Loading State */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex max-w-[80%] flex-row">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-900 dark:bg-slate-800 mr-2 flex items-center justify-center shadow-sm">
                      <Bot className="w-4 h-4 text-gold-500" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 rounded-tl-none flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={(e) => handleSend(e)} className="p-3 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]">
              <div className="flex items-center bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-full pr-1.5 pl-4 transition-all focus-within:ring-2 focus-within:ring-gold-400/50 focus-within:border-gold-400">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Ask in ${selectedLang}...`}
                  className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm text-gray-800 dark:text-gray-200 outline-none placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 flex items-center justify-center hover:bg-navy-800 dark:hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm my-1"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}