import VideoHero from '@/Components/VideoHero';
import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function Show({ solution }) {
    return (
        <MainLayout>
            <Head title={`${solution.title} - B-AGILE`} />

            {/* Hero avec vidéo de fond */}
            <section className="relative min-h-[520px] flex items-end overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    <source src="/videos/tech-background.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/80 via-purple-800/80 to-slate-950/90" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
                    <Link
                        href="/nos-solutions"
                        className="text-sm text-white/80 hover:text-white flex items-center gap-1.5 transition mb-6"
                    >
                        <ArrowLeft size={16} />
                        Retour à nos solutions
                    </Link>

                    <div className="flex items-end justify-between gap-10 flex-wrap">
                        <div className="text-white max-w-xl">
                            <span className="inline-block text-xs font-semibold bg-white/15 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider mb-4">
                                Logiciel Métier
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
                                {solution.title}
                            </h1>
                            <p className="text-blue-100 text-lg">
                                {solution.tagline}
                            </p>
                        </div>

                        {/* Badges flottants */}
                        <div className="space-y-3 pb-2">
                            <span className="block bg-purple-400/80 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
    PILOTAGE
</span>
<span className="block bg-purple-600/80 backdrop-blur-sm text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg ml-4">
    OPTIMISATION
</span>
<span className="block bg-purple-900/80 backdrop-blur-sm text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg ml-8">
    PERFORMANCE
</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contenu principal */}
            <section className="py-16 px-6 max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
                <div className="md:col-span-8 space-y-8">
                    <div className="space-y-4">
                        <div className="w-16 h-1 bg-purple-600 rounded" />
                    </div>

                    <p className="text-lg text-slate-700 leading-relaxed font-light">
                        {solution.desc}
                    </p>

                    {/* Liste des fonctionnalités */}
                    <div className="space-y-4 pt-4">
                        <h3 className="text-xl font-bold text-slate-900">Fonctionnalités clés :</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {solution.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <CheckCircle size={18} className="text-purple-600 shrink-0 mt-0.5" />
                                    <span className="text-sm text-slate-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Barre latérale d'appel à l'action */}
                <div className="md:col-span-4 space-y-6">
                    <div className="bg-gradient-to-tr from-slate-900 to-purple-950 text-white p-8 rounded-2xl border border-white/10 shadow-xl space-y-6">
                        <h4 className="text-xl font-bold">Intéressé par cette solution ?</h4>
                        <p className="text-sm text-purple-200 leading-relaxed">
                            Planifiez une démonstration personnalisée en direct avec nos experts pour évaluer l'adéquation de {solution.title} à vos processus métiers.
                        </p>
                        <div className="space-y-3 pt-2">
                            <Link
                                href="/contact"
                                className="w-full bg-white text-purple-900 text-center font-bold py-3 rounded-lg hover:bg-slate-100 transition block shadow text-sm"
                            >
                                Demander une démo
                            </Link>
                            <Link
                                href="/contact"
                                className="w-full bg-purple-800 text-white text-center font-medium py-3 rounded-lg hover:bg-purple-700 transition block text-sm"
                            >
                                Obtenir un devis
                            </Link>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                        <h4 className="font-bold text-slate-800 text-sm">Pourquoi choisir B-AGILE ?</h4>
                        <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                            <li>• Plus de 13 ans d'expérience opérationnelle</li>
                            <li>• Logiciels hautement adaptables (sur-mesure)</li>
                            <li>• Intégration API REST robuste avec votre ERP existant</li>
                            <li>• Support local réactif au Maroc</li>
                        </ul>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}