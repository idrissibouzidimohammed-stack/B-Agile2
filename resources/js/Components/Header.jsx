import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sun, Search, Globe, Menu, X } from 'lucide-react';
import { LayoutGrid, PackageSearch, Truck, UsersRound, Settings2, Store, ShoppingBag, GraduationCap } from 'lucide-react';

export default function Header() {
    const { url } = usePage();
    const [solutionsOpen, setSolutionsOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const menuItems = [
        { name: 'Accueil', path: '/' },
        { name: 'À propos', path: '/a-propos' },
        { name: 'Partenariat', path: '/partenariat' },
        { name: 'Actualités', path: '/actualites' },
        { name: 'Carrière', path: '/carriere' },
        { name: 'Contact', path: '/contact' },
    ];

    const solutionsList = [
        { name: 'ERP', desc: 'Enterprise Resource Planning', path: '/nos-solutions/erp', icon: LayoutGrid, color: 'from-purple-500/20 to-purple-600/10 text-purple-300' },
        { name: 'WMS', desc: "Gestion d'entrepôt", path: '/nos-solutions/wms', icon: PackageSearch, color: 'from-violet-500/20 to-violet-600/10 text-violet-300' },
        { name: 'TMS', desc: 'Gestion de transport', path: '/nos-solutions/tms', icon: Truck, color: 'from-fuchsia-500/20 to-fuchsia-600/10 text-fuchsia-300' },
        { name: 'CRM', desc: 'Relation client', path: '/nos-solutions/crm', icon: UsersRound, color: 'from-purple-500/20 to-purple-600/10 text-purple-300' },
        { name: 'GMAO', desc: 'Gestion de la maintenance', path: '/nos-solutions/gmao', icon: Settings2, color: 'from-violet-500/20 to-violet-600/10 text-violet-300' },
        { name: 'POS', desc: 'Points de vente', path: '/nos-solutions/pos', icon: Store, color: 'from-fuchsia-500/20 to-fuchsia-600/10 text-fuchsia-300' },
        { name: 'E-COM', desc: 'Commerce en ligne', path: '/nos-solutions/ecom', icon: ShoppingBag, color: 'from-purple-500/20 to-purple-600/10 text-purple-300' },
        { name: 'Formation', desc: 'Offre pédagogique', path: '/nos-solutions/education', icon: GraduationCap, color: 'from-violet-500/20 to-violet-600/10 text-violet-300' },
    ];

    const { auth } = usePage().props;

    const isActive = (path) => {
        if (path === '/') return url === '/' || url === '';
        return url.startsWith(path);
    };

    return (
        <header className="fixed top-4 left-0 right-0 z-50 px-4 md:px-6">
            {/* Main Capsule Nav */}
            <nav className="max-w-6xl mx-auto bg-slate-950/80 border border-slate-900/60 backdrop-blur-md rounded-full px-6 py-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                
                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-2 group select-none shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-950/40 border border-blue-900/60 flex items-center justify-center font-black group-hover:scale-105 transition duration-300">
                        <span className="text-blue-400 text-xs tracking-tight font-extrabold">BA</span>
                    </div>
                    <span className="text-xs font-black tracking-widest text-white uppercase hidden sm:inline-block">B-AGILE</span>
                </Link>

                {/* Desktop Navigation Links */}
                <ul className="hidden lg:flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {/* Accueil */}
                    <li>
                        <Link
                            href="/"
                            className={`inline-block transition-all duration-200 rounded-full px-4 py-1.5 ${isActive('/') && url === '/' ? 'bg-slate-900 text-white font-black' : 'hover:text-white'}`}
                        >
                            ACCUEIL
                        </Link>
                    </li>

                    {/* À propos */}
                    <li>
                        <Link
                            href="/a-propos"
                            className={`inline-block transition-all duration-200 rounded-full px-4 py-1.5 ${isActive('/a-propos') ? 'bg-slate-900 text-white font-black' : 'hover:text-white'}`}
                        >
                            À PROPOS
                        </Link>
                    </li>

                    {/* Solutions Dropdown Menu */}
                    <li
                        className="relative"
                        onMouseEnter={() => setSolutionsOpen(true)}
                        onMouseLeave={() => setSolutionsOpen(false)}
                    >
                        <button
                            className={`flex items-center gap-1 transition-all duration-200 rounded-full px-4 py-1.5 ${isActive('/nos-solutions') ? 'bg-slate-900 text-white font-black' : 'hover:text-white'}`}
                        >
                            SOLUTIONS
                            <ChevronDown
                                size={12}
                                className={`transition-transform duration-200 ${solutionsOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {solutionsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-slate-950/95 border border-slate-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 backdrop-blur-md"
                                >
                                    {solutionsList.map((sol) => {
                                        const Icon = sol.icon;
                                        return (
                                            <Link
                                                key={sol.path}
                                                href={sol.path}
                                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-900 transition-colors duration-200 group"
                                            >
                                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sol.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                                    <Icon size={19} strokeWidth={2} />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-white uppercase tracking-wider">{sol.name}</p>
                                                    <p className="text-[10px] text-zinc-400 normal-case font-normal leading-tight mt-0.5">{sol.desc}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>

                    {/* Partenariat, Actualités, Carrière, Contact */}
                    {menuItems.filter(item => item.path !== '/' && item.path !== '/a-propos').map((item) => (
                        <li key={item.path}>
                            <Link
                                href={item.path}
                                className={`inline-block transition-all duration-200 rounded-full px-4 py-1.5 ${isActive(item.path) ? 'bg-slate-900 text-white font-black' : 'hover:text-white'}`}
                            >
                                {item.name.toUpperCase()}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Right Side Icons & Actions */}
                <div className="flex items-center gap-4">
                    {/* Light/Dark Toggle */}
                    <button className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-slate-800 bg-slate-900/40 hover:bg-slate-900 text-[9px] font-black uppercase tracking-widest text-slate-300 rounded-lg transition duration-200 select-none">
                        <Sun size={11} className="text-yellow-400" />
                        LIGHT
                    </button>

                    {/* Search Icon */}
                    <button className="text-slate-400 hover:text-white transition duration-200 shrink-0">
                        <Search size={14} />
                    </button>

                    {/* Language Switcher */}
                    <button className="text-slate-400 hover:text-white transition duration-200 shrink-0">
                        <Globe size={14} />
                    </button>

                    {/* Call To Action (White Capsule) */}
                    {auth?.user ? (
                        <Link
                            href="/dashboard"
                            className="bg-white hover:bg-slate-100 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full transition duration-300 uppercase tracking-widest shrink-0 animate-pulse"
                        >
                            ESPACE
                        </Link>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="bg-white hover:bg-slate-100 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-full transition duration-300 uppercase tracking-widest shrink-0"
                            >
                                CONNEXION
                            </Link>
                        </div>
                    )}

                    {/* Mobile Drawer Trigger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="lg:hidden text-slate-400 hover:text-white transition duration-200 shrink-0"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden max-w-6xl mx-auto mt-2 bg-slate-950/95 border border-slate-800/80 backdrop-blur-md rounded-2xl p-4 overflow-hidden shadow-2xl"
                    >
                        <ul className="flex flex-col gap-3 text-xs font-bold uppercase tracking-widest text-slate-400">
                            <li>
                                <Link
                                    href="/"
                                    onClick={() => setMobileOpen(false)}
                                    className={`block py-2 px-3 rounded-lg ${isActive('/') && url === '/' ? 'bg-slate-900 text-white' : 'hover:text-white'}`}
                                >
                                    ACCUEIL
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/a-propos"
                                    onClick={() => setMobileOpen(false)}
                                    className={`block py-2 px-3 rounded-lg ${isActive('/a-propos') ? 'bg-slate-900 text-white' : 'hover:text-white'}`}
                                >
                                    À PROPOS
                                </Link>
                            </li>
                            {solutionsList.map((sol) => (
                                <li key={sol.path} className="pl-4">
                                    <Link
                                        href={sol.path}
                                        onClick={() => setMobileOpen(false)}
                                        className="block py-1.5 text-[10px] hover:text-white"
                                    >
                                        {sol.name} - {sol.desc}
                                    </Link>
                                </li>
                            ))}
                            {menuItems.filter(item => item.path !== '/' && item.path !== '/a-propos').map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block py-2 px-3 rounded-lg ${isActive(item.path) ? 'bg-slate-900 text-white' : 'hover:text-white'}`}
                                    >
                                        {item.name.toUpperCase()}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}