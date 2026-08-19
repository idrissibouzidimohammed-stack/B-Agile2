import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';

export default function AIChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Bonjour ! 👋 Je suis l\'assistant IA de B-AGILE. Posez-moi vos questions sur nos solutions ERP, WMS, TMS, CRM et plus encore !',
        },
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 400);
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        // Add user message
        const userMsg = { role: 'user', text: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                },
                body: JSON.stringify({ message: trimmed }),
            });

            const data = await response.json();
            setMessages((prev) => [
                ...prev,
                { role: 'ai', text: data.reply || 'Désolé, une erreur est survenue.' },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { role: 'ai', text: 'Impossible de joindre le serveur. Veuillez réessayer.' },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating AI Button */}
            <motion.div 
                className="fixed bottom-6 right-6 z-[9999]"
                initial={false}
                animate={{ scale: isOpen ? 0.9 : 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                {/* Glow behind the button */}
                {!isOpen && (
                    <div className="absolute inset-0 bg-fuchsia-600 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none" />
                )}
                
                <motion.button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Ouvrir le chat IA"
                >
                    {/* Animated gradient background for button */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-fuchsia-600 to-indigo-600 group-hover:bg-[length:200%_200%] bg-[length:100%_100%] transition-all duration-700" />
                    
                    <div className="absolute inset-[2px] bg-gradient-to-br from-purple-800 to-fuchsia-900 rounded-full z-0" />

                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="relative z-10 text-white"
                            >
                                <X size={26} strokeWidth={2.5} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ rotate: 180, opacity: 0, scale: 0.5 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: -180, opacity: 0, scale: 0.5 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                className="relative z-10 text-white flex flex-col items-center justify-center"
                            >
                                <Sparkles size={26} className="text-fuchsia-300 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* AI Badge inside the button border */}
                    {!isOpen && (
                        <div className="absolute top-1 right-1 z-20">
                            <span className="relative flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-fuchsia-500 border border-purple-900"></span>
                            </span>
                        </div>
                    )}
                </motion.button>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 30, scale: 0.9, filter: "blur(10px)", transition: { duration: 0.2 } }}
                        transition={{ type: "spring", stiffness: 250, damping: 25 }}
                        className="fixed bottom-28 right-6 z-[9998] w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-9rem)] flex flex-col rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(40,10,60,0.6)] border border-white/10"
                        style={{
                            background: 'rgba(15, 5, 25, 0.7)',
                            backdropFilter: 'blur(30px) saturate(150%)',
                            WebkitBackdropFilter: 'blur(30px) saturate(150%)',
                        }}
                    >
                        {/* Mesh Gradient Header */}
                        <div className="relative shrink-0 overflow-hidden px-6 py-5 border-b border-white/10 bg-black/20">
                            {/* Animated blobs in header */}
                            <div className="absolute -top-10 -left-10 w-32 h-32 bg-fuchsia-600/40 rounded-full blur-2xl animate-[spin_8s_linear_infinite]" />
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-600/40 rounded-full blur-2xl animate-[spin_10s_linear_infinite_reverse]" />
                            
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
                                    <Bot size={22} className="text-white" />
                                    <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-[rgba(15,5,25,0.9)] rounded-full animate-pulse" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 tracking-wide">
                                        Assistant B-AGILE
                                    </h3>
                                    <p className="text-xs text-purple-200/60 font-medium tracking-wider uppercase mt-0.5">
                                        Toujours prêt à aider
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-white/70 hover:text-white transition duration-200 backdrop-blur-sm"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: i === messages.length - 1 ? 0.05 : 0 }}
                                    className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-md ${
                                        msg.role === 'ai' 
                                        ? 'bg-purple-900/50 border border-fuchsia-500/30' 
                                        : 'bg-indigo-900/50 border border-indigo-400/30'
                                    }`}>
                                        {msg.role === 'ai' ? (
                                            <Sparkles size={14} className="text-fuchsia-400" />
                                        ) : (
                                            <User size={14} className="text-indigo-300" />
                                        )}
                                    </div>
                                    
                                    {/* Bubble */}
                                    <div
                                        className={`px-4 py-3 text-[13px] leading-relaxed font-medium tracking-wide shadow-xl ${
                                            msg.role === 'user'
                                                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-sm'
                                                : 'bg-white/5 text-slate-200 border border-white/10 rounded-2xl rounded-tl-sm backdrop-blur-md'
                                        }`}
                                        style={{
                                            boxShadow: msg.role === 'user' ? '0 10px 25px -5px rgba(99, 102, 241, 0.4)' : '0 4px 20px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Modern Typing indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3 max-w-[85%] mr-auto"
                                >
                                    <div className="w-8 h-8 rounded-full bg-purple-900/50 border border-fuchsia-500/30 flex items-center justify-center shrink-0 mt-1">
                                        <Sparkles size={14} className="text-fuchsia-400 animate-pulse" />
                                    </div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-5 py-4 backdrop-blur-md flex items-center gap-1.5">
                                        <motion.div className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-purple-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }} />
                                        <motion.div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }} />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} className="h-2" />
                        </div>

                        {/* Input Area (Floating Pill inside window) */}
                        <div className="p-4 bg-black/20 shrink-0 border-t border-white/5">
                            <form
                                onSubmit={handleSubmit}
                                className="relative flex items-center"
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Écrivez votre message..."
                                    disabled={isLoading}
                                    className="w-full bg-white/5 border border-white/10 focus:border-fuchsia-500/50 focus:bg-white/10 rounded-full pl-5 pr-14 py-3.5 text-[13px] text-white placeholder-white/30 font-medium outline-none transition duration-300 disabled:opacity-50 shadow-inner"
                                    maxLength={500}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="absolute right-1.5 w-10 h-10 rounded-full bg-white hover:bg-fuchsia-100 text-fuchsia-600 flex items-center justify-center shadow-lg active:scale-90 transition-all duration-300 disabled:opacity-0 disabled:scale-75 shrink-0"
                                >
                                    <Send size={16} className="-ml-0.5 mt-0.5" />
                                </button>
                            </form>
                            <div className="text-center mt-2">
                                <span className="text-[10px] text-white/30 font-medium tracking-widest uppercase">
                                    Propulsé par Google Gemini
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
