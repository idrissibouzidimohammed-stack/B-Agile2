import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@inertiajs/react';

export default function MainLayout({ children }) {
    const { url } = usePage();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-purple-500 selection:text-white">
            {/* Header */}
            <Header />

            {/* Contenu principal avec transitions animées */}
            <main className="flex-grow overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
