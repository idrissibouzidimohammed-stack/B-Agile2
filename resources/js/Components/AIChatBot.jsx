import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, User, Loader2 } from 'lucide-react';

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
            setTimeout(() => inputRef.current?.focus(), 300);
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
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 flex items-center justify-center transition-shadow duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Ouvrir le chat IA"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <X size={22} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                        >
                            <Sparkles size={22} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse ring */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-purple-500/30 animate-ping pointer-events-none" />
                )}

                {/* AI Badge */}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 bg-white text-purple-700 text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md uppercase tracking-wider">
                        AI
                    </span>
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
                        className="fixed bottom-24 right-6 z-[9999] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] flex flex-col rounded-3xl overflow-hidden border border-purple-800/40 shadow-2xl shadow-purple-900/40"
                        style={{
                            background: 'linear-gradient(145deg, rgba(15, 5, 35, 0.97) 0%, rgba(30, 10, 60, 0.97) 100%)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {/* Chat Header */}
                        <div className="flex items-center gap-3 px-5 py-4 border-b border-purple-800/30 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                                <Bot size={18} className="text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-white tracking-wide">Assistant B-AGILE</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    <span className="text-[9px] text-purple-300/70 font-semibold uppercase tracking-wider">En ligne</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-7 h-7 rounded-lg bg-purple-900/40 hover:bg-purple-800/50 flex items-center justify-center text-purple-300 hover:text-white transition duration-200"
                            >
                                <X size={14} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-800/50 scrollbar-track-transparent">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: i === messages.length - 1 ? 0.05 : 0 }}
                                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    {msg.role === 'ai' && (
                                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 border border-purple-700/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <Sparkles size={12} className="text-purple-300" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[75%] px-3.5 py-2.5 rounded-2xl text-[12.5px] leading-relaxed font-medium ${
                                            msg.role === 'user'
                                                ? 'bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white rounded-br-md shadow-md shadow-purple-500/10'
                                                : 'bg-purple-950/60 text-purple-100 border border-purple-800/25 rounded-bl-md'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                    {msg.role === 'user' && (
                                        <div className="w-7 h-7 rounded-lg bg-purple-800/30 border border-purple-700/30 flex items-center justify-center shrink-0 mt-0.5">
                                            <User size={12} className="text-purple-300" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-2.5 justify-start"
                                >
                                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-600/30 to-fuchsia-600/30 border border-purple-700/30 flex items-center justify-center shrink-0 mt-0.5">
                                        <Sparkles size={12} className="text-purple-300" />
                                    </div>
                                    <div className="bg-purple-950/60 border border-purple-800/25 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
                                        <Loader2 size={13} className="text-purple-400 animate-spin" />
                                        <span className="text-[11px] text-purple-300/70 font-medium">Réflexion en cours...</span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-2 px-4 py-3 border-t border-purple-800/30 shrink-0 bg-purple-950/30"
                        >
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Posez votre question..."
                                disabled={isLoading}
                                className="flex-1 bg-purple-950/50 border border-purple-800/40 focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/15 rounded-xl px-4 py-2.5 text-[12px] text-white placeholder-purple-300/30 font-medium outline-none transition duration-200 disabled:opacity-50"
                                maxLength={500}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 flex items-center justify-center text-white shadow-md shadow-purple-500/15 active:scale-95 transition-all duration-200 disabled:opacity-40 disabled:hover:from-purple-600 disabled:hover:to-fuchsia-600 shrink-0"
                            >
                                <Send size={15} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
