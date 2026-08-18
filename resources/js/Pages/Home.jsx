import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Layers, Truck, Cpu, ShieldAlert, BadgeCheck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Box3D from '@/Components/Box3D';

export default function Home() {
    const stats = [
        { value: '13+', label: 'Années d\'expérience', desc: 'Édition de progiciels de gestion d\'entreprise.' },
        { value: '50+', label: 'Partenaires intégrateurs', desc: 'Réseau étendu au Maroc et à l\'international.' },
        { value: '99%', label: 'Taux de satisfaction', desc: 'Des clients fidélisés par l\'ergonomie de nos solutions.' },
        { value: '24/7', label: 'Support local réactif', desc: 'Garantir la continuité de vos opérations.' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <MainLayout>
            <Head title="Accueil - B-AGILE" />

            {/* Hero Section with Looping Background Video */}
<section className="relative min-h-[85vh] flex items-center bg-zinc-950 text-white py-24 px-6 overflow-hidden">
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-25">
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent" />
    </div>

    <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center relative z-10 w-full">
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:col-span-7 space-y-8"
        >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                Business solutions<br />for growth
            </h1>
            <p className="text-lg text-slate-300 max-w-xl font-light leading-relaxed">
                Améliorez la gestion de votre entreprise et augmentez vos profits avec la suite EMS.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        <Link
            href="/nos-solutions"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3.5 rounded-xl flex items-center gap-2 transition shadow-lg shadow-purple-950/50"
        >
            Découvrir nos solutions
            <ArrowRight size={18} />
        </Link>
    </motion.div>
</div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="md:col-span-5 flex flex-col md:flex-row items-center justify-center gap-6 relative"
        >
            {/* Vraie boîte 3D avec Three.js */}
            <div className="relative shrink-0 w-72">
                <Box3D />
            </div>

            {/* Interactive Pill Badges aligned vertically */}
            <div className="flex flex-col gap-4 w-full max-w-xs md:w-auto shrink-0 relative z-10">
                <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="bg-blue-500/20 border border-blue-500/30 text-blue-200 px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase text-center md:text-left shadow-lg shadow-blue-950/20"
                >
                    PILOTAGE
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase text-center md:text-left shadow-lg shadow-emerald-950/20"
                >
                    OPTIMISATION
                </motion.div>
                <motion.div
                    whileHover={{ scale: 1.05, x: 5 }}
                    className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-200 px-6 py-2.5 rounded-full text-xs font-black tracking-widest uppercase text-center md:text-left shadow-lg shadow-indigo-950/20"
                >
                    PERFORMANCE
                </motion.div>
            </div>
        </motion.div>
    </div>
</section>

            {/* Chiffres clés */}
            {/* Chiffres clés avec fond parallax */}
<section
    className="relative py-24 px-6 bg-cover bg-center bg-no-repeat"
    style={{
        backgroundImage: "url('/images/stats-bg.jpg')",
        backgroundAttachment: 'fixed',
    }}
>
    {/* Overlay blanc semi-transparent pour garder le texte lisible */}
    <div className="absolute inset-0 bg-white/85" />

    <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto mb-20 space-y-4"
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Un savoir-faire technologique éprouvé
                        </h2>
                        <div className="w-12 h-1 bg-purple-600 mx-auto rounded-full" />
                        <p className="text-lg text-slate-600 font-light leading-relaxed">
                            Depuis plus de 13 ans, nous concevons des outils informatiques à forte valeur ajoutée 
                            pour structurer, digitaliser et accroître la productivité des PME et des grands groupes.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-100px' }}
                        className="grid md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx} 
                                variants={itemVariants}
                                whileHover={{ y: -6, shadow: 'rgba(0,0,0,0.1) 0px 10px 30px' }}
                                className="p-8 bg-slate-50 rounded-2xl text-center space-y-3 border border-slate-100 cursor-default transition-all duration-300"
                            >
                                <span className="text-4xl md:text-5xl font-black text-purple-700 block tracking-tight">{stat.value}</span>
                                <h3 className="font-bold text-slate-900 text-sm">{stat.label}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed font-light">{stat.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Domaines d'Intervention */}
           {/* Domaines d'Intervention avec fond parallax */}
<section
    className="relative py-24 px-6 border-y border-slate-200 bg-cover bg-center bg-no-repeat"
    style={{
        backgroundImage: "url('/images/stats-bg.jpg')",
        backgroundAttachment: 'fixed',
    }}
>
    <div className="absolute inset-0 bg-slate-50/90" />

    <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-3xl mx-auto mb-20 space-y-4"
                    >
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Nos domaines d'intervention
                        </h2>
                        <p className="text-lg text-slate-600 font-light">
                            Notre expertise s'étend à tous les métiers de la logistique, du stockage et de l'industrie.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* WMS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            whileHover={{ y: -8, borderColor: 'rgb(168, 85, 247)' }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-pointer transition-all duration-300"
                        >
                            <div>
                                <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                    <Layers size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Gestion d'Entrepôt (WMS)</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                                    Prenez le contrôle total de vos stocks. De la réception à l'expédition, optimisez le stockage, l'ordonnancement des commandes et accélérez vos flux physiques.
                                </p>
                            </div>
                            <Link href="/nos-solutions/wms" className="text-purple-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </motion.div>

                        {/* TMS */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            whileHover={{ y: -8, borderColor: 'rgb(99, 102, 241)' }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-pointer transition-all duration-300"
                        >
                            <div>
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                    <Truck size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Gestion du Transport (TMS)</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                                    Planifiez, expédiez et suivez vos livraisons. Réduisez vos coûts de transport multimodal, suivez vos tournées en temps réel et optimisez vos tarifs.
                                </p>
                            </div>
                            <Link href="/nos-solutions/tms" className="text-indigo-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </motion.div>

                        {/* ERP */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            whileHover={{ y: -8, borderColor: 'rgb(236, 72, 153)' }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between cursor-pointer transition-all duration-300"
                        >
                            <div>
                                <div className="w-12 h-12 bg-pink-50 text-pink-700 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                    <Cpu size={22} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">Gestion de l'Entreprise (ERP)</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-light">
                                    Gérez l'ensemble des départements de votre entreprise (finance, achat, vente, production, élevage, ressources humaines) dans un environnement centralisé.
                                </p>
                            </div>
                            <Link href="/nos-solutions/erp" className="text-pink-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start">
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-tr from-slate-950 to-purple-950 text-white py-20 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops)) from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                <motion.div 
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-5xl mx-auto text-center space-y-6 relative z-10"
                >
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                        Prêt à digitaliser vos opérations ?
                    </h2>
                    <p className="text-purple-200 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                        Nos consultants experts sont à votre disposition pour analyser vos besoins et vous proposer des démonstrations personnalisées de nos progiciels.
                    </p>
                    <div className="pt-4">
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block">
                            <Link 
                                href="/contact" 
                                className="bg-white text-purple-950 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-100 transition shadow-lg shadow-purple-950/20"
                            >
                                Échanger avec un conseiller
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
{/* Business Solutions For Growth - Suite EMS */}
<section className="py-24 px-6 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
        >
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Business solutions<br />for growth
            </h2>
            <p className="text-lg text-slate-600 font-light leading-relaxed">
                Améliorez la gestion de votre entreprise et augmentez vos profits avec la suite{' '}
                <span className="font-bold text-purple-700">EMS</span>.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="inline-block pt-2">
                <Link
                    href="/nos-solutions"
                    className="bg-purple-800 hover:bg-purple-900 text-white font-semibold px-8 py-3.5 rounded-full transition shadow-lg shadow-purple-950/20"
                >
                    Découvrir
                </Link>
            </motion.div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, x: 40, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="flex justify-center"
        >
            <div className="relative w-64 aspect-[3/4] bg-gradient-to-br from-purple-500 via-purple-700 to-purple-950 rounded-2xl shadow-2xl p-6 flex flex-col justify-between border border-purple-400/20">
                <div className="text-right">
                    <span className="text-[10px] text-white/70 font-bold tracking-widest">B·AGILE</span>
                </div>

                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                        <span className="text-2xl font-black text-white">EMS</span>
                    </div>
                    <p className="text-[9px] text-purple-200 uppercase tracking-wider">Enterprise Management System</p>
                    <p className="text-2xl font-black text-white pt-4">Business</p>
                </div>

                <div className="space-y-3">
                    <ul className="text-[9px] text-purple-200 space-y-1 font-medium">
                        <li>ESSOR ERP</li>
                        <li>PROTECH WMS</li>
                        <li>POCKET CRM</li>
                        <li>CANDOR TMS</li>
                        <li>OTILA GMAO</li>
                        <li>HERALD POS</li>
                        <li>DIJI E-COMMERCE</li>
                    </ul>
                    <p className="text-[9px] text-purple-300 italic pt-2">Business solutions for growth</p>
                </div>
            </div>
        </motion.div>
    </div>
</section>
        </MainLayout>
    );
}
