import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function About() {
    return (
        <MainLayout>
            <Head title="À propos - B-AGILE" />

            {/* Header section with gradient */}
          <section className="bg-purple-950 text-white py-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto space-y-4"
                >
                    <h1 className="text-4xl font-extrabold tracking-widest uppercase">À PROPOS</h1>
                    <p className="text-lg text-slate-300">
                        Découvrez notre histoire, notre mission et notre engagement envers nos partenaires Supply Chain et industriels.
                    </p>
                </motion.div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Vidéo de fond animée */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition duration-300" />
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="rounded-2xl shadow-xl w-full relative z-10 border border-slate-200 aspect-video object-cover"
                        >
                            <source src="/videos/about-bg.mp4" type="video/mp4" />
                        </video>
                    </motion.div>

                    {/* Texte animé */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="space-y-6 text-slate-600 leading-relaxed font-light"
                    >
                        <h2 className="text-2xl font-bold text-slate-900">
                            Votre partenaire en transformation digitale
                        </h2>
                        <div className="w-12 h-1 bg-purple-600 rounded" />
                        <p className="text-sm">
                            Spécialiste des systèmes d'information, <span className="font-semibold text-slate-800">B-AGILE</span> est le partenaire
                            technologique des acteurs de la Supply Chain et de l'industrie.
                            Fort de plus de 13 ans d'expérience dans l'édition de logiciels de
                            gestion d'entreprise, nous proposons des solutions parfaitement
                            adaptées aux besoins des PME et des Grandes Entreprises.
                        </p>
                        <p className="text-sm border-l-4 border-purple-500 pl-4 bg-purple-50/50 py-3 rounded-r-lg text-purple-950 font-medium">
                            L'offre de B-AGILE couvre un large éventail de métiers autour de
                            l'industrie et de la logistique notamment la production,
                            l'agriculture et l'élevage ainsi que les domaines de la Supply Chain
                            tel que la distribution, l'entreposage (WMS), l'organisation du transport
                            multimodal (TMS), le transit, le transport routier de marchandises, la
                            messagerie...etc.
                        </p>
                        <p className="text-sm">
                            Nos solutions sont intégrées à travers un réseau de partenaires,
                            fiables et spécialisés, pour accompagner nos clients dans la
                            digitalisation de leurs systèmes d'information au Maroc et à
                            l'international.
                        </p>
                    </motion.div>
                </div>
            </section>
        </MainLayout>
    );
}