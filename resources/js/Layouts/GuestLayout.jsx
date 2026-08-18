import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import Box3D from '@/Components/Box3D';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
    { title: 'ERP (Enterprise Resource Planning)', desc: 'Pilotez l\'intégralité des flux financiers, de production et de gestion commerciale de votre entreprise.', color: 'text-purple-400' },
    { title: 'WMS (Warehouse Management System)', desc: 'Optimisez la gestion physique de votre entrepôt, de la réception à l\'expédition des marchandises.', color: 'text-violet-400' },
    { title: 'TMS (Transport Management System)', desc: 'Planifiez vos tournées logistiques et suivez l\'exécution des livraisons en temps réel.', color: 'text-fuchsia-400' },
    { title: 'CRM & POS (Customer & Points of Sale)', desc: 'Gérez la relation client et pilotez vos points de vente physiques et e-commerce.', color: 'text-purple-400' }
];

function FeatureCarousel() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % features.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-24 relative overflow-hidden select-none">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="absolute inset-0 flex flex-col justify-center text-left"
                >
                    <h3 className={`text-xs font-black uppercase tracking-widest ${features[index].color}`}>
                        {features[index].title}
                    </h3>
                    <p className="text-xs text-purple-200/60 mt-2 font-medium leading-relaxed max-w-lg">
                        {features[index].desc}
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function GuestLayout({ children }) {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen w-full bg-[#0a0518] text-white overflow-x-hidden">
            {/* Left Panel: Brand Showcase (Hidden on Mobile) */}
            <div className="hidden lg:flex lg:w-[55%] flex-col justify-between p-12 bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 relative overflow-hidden border-r border-purple-900/20">
                {/* Background glows in left panel */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <Link href="/" className="hover:opacity-90 transition">
                        <ApplicationLogo className="h-10 w-auto" />
                    </Link>
                </div>

                {/* Middle 3D Interactive Box */}
                <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                    <div className="text-center mb-4 max-w-md select-none">
                        <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-900/20 px-3 py-1 rounded-full border border-purple-800/40">
                            Espace Intelligent
                        </span>
                        <h1 className="text-3xl font-extrabold text-white mt-3 leading-tight tracking-wide">
                            L'ÉCOSYSTÈME EMS <br />
                            POUR VOTRE CROISSANCE
                        </h1>
                        <p className="text-xs text-purple-200/50 mt-2 font-medium">
                            Survolez le cahier 3D pour faire pivoter le système EMS
                        </p>
                    </div>

                    {/* Renders our interactive 3D box component */}
                    <div className="w-full max-w-lg">
                        <Box3D />
                    </div>
                </div>

                {/* Bottom Automated Feature Showcase */}
                <div className="relative z-10 border-t border-purple-900/30 pt-6">
                    <FeatureCarousel />
                </div>
            </div>

            {/* Right Panel: Active Card Form (Full-width on Mobile) */}
            <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-6 sm:p-12 relative overflow-hidden bg-[#0c051a]">
                {/* Background glows in right panel */}
                <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Mobile Logo Header */}
                <div className="lg:hidden relative z-10 mb-8 flex flex-col items-center">
                    <Link href="/">
                        <ApplicationLogo className="h-12 w-auto" />
                    </Link>
                </div>

                {/* Form Wrapper Glassmorphic Card */}
                <div className="relative z-10 w-full max-w-md bg-purple-950/20 backdrop-blur-xl border border-purple-800/30 px-6 sm:px-8 py-8 shadow-2xl rounded-3xl">
                    {children}
                </div>
            </div>
        </div>
    );
}