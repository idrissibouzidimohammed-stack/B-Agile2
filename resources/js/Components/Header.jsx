import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { LayoutGrid, PackageSearch, Truck, UsersRound, Settings2, Store, ShoppingBag, GraduationCap } from 'lucide-react';

export default function Header() {
    const { url } = usePage();
    const [solutionsOpen, setSolutionsOpen] = useState(false);

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
        <header className="bg-zinc-950/95 backdrop-blur-md border-b border-zinc-900 sticky top-0 z-50 transition-all duration-300">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black select-none shrink-0 group-hover:scale-105 transition duration-300">
                        <span className="text-zinc-950 text-lg leading-none" style={{ fontWeight: 900 }}>B</span>
                    </div>
                    <span className="text-xl font-black tracking-wider text-white uppercase">AGILE</span>
                </Link>

               <ul className="flex items-center gap-8 text-sm font-medium text-zinc-300">
    {/* Accueil */}
    <li className="relative py-1">
        <Link
            href="/"
            className={`hover:text-white transition-colors duration-200 ${isActive('/') && url === '/' ? 'text-purple-400 font-bold' : ''}`}
        >
            Accueil
        </Link>
    </li>

    {/* À propos */}
    <li className="relative py-1">
        <Link
            href="/a-propos"
            className={`hover:text-white transition-colors duration-200 ${isActive('/a-propos') ? 'text-purple-400 font-bold' : ''}`}
        >
            À propos
        </Link>
    </li>

    {/* Nos solutions avec dropdown au survol */}
    <li
        className="relative py-1"
        onMouseEnter={() => setSolutionsOpen(true)}
        onMouseLeave={() => setSolutionsOpen(false)}
    >
        <button
            className={`flex items-center gap-1 hover:text-white transition-colors duration-200 ${isActive('/nos-solutions') ? 'text-purple-400 font-bold' : ''}`}
        >
            Nos solutions
            <ChevronDown
                size={15}
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
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[480px] bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2"
                >
                    {solutionsList.map((sol) => {
                        const Icon = sol.icon;
                        return (
                            <Link
                                key={sol.path}
                                href={sol.path}
                                className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-800 transition-colors duration-200 group"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${sol.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon size={19} strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-white">{sol.name}</p>
                                    <p className="text-xs text-zinc-400">{sol.desc}</p>
                                </div>
                            </Link>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    </li>

    {/* Reste des items : Partenariat, Actualités, Carrière, Contact */}
    {menuItems.filter(item => item.path !== '/' && item.path !== '/a-propos').map((item) => (
        <li key={item.path} className="relative py-1">
            <Link
                href={item.path}
                className={`hover:text-white transition-colors duration-200 ${isActive(item.path) ? 'text-purple-400 font-bold' : ''}`}
            >
                {item.name}
            </Link>
        </li>
    ))}
</ul>

                {auth?.user ? (
    <Link href="/dashboard" className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition">
        <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        </div>
        <span className="hidden sm:inline">{auth.user.name}</span>
    </Link>
) : (
    <div className="flex items-center gap-3">
        <Link href="/login" className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition">
            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            </div>
            <span className="hidden sm:inline">Se connecter</span>
        </Link>

        <Link
            href="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition"
        >
            S'inscrire
        </Link>
    </div>
)}
            </nav>
        </header>
    );
}