import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, MapPin, Calendar, Clock, Smile, Award, Zap, Heart } from 'lucide-react';

export default function Carriere() {
    const jobOffers = [
        {
            id: 1,
            title: "Ingénieur d'Affaires Logiciel / Business Developer",
            location: "Casablanca, Maroc",
            type: "CDI - Temps plein",
            date: "Publiée il y a 3 jours",
            dept: "Commercial"
        },
        {
            id: 2,
            title: "Consultant Fonctionnel Intégrateur WMS / TMS",
            location: "Casablanca / Fès, Maroc",
            type: "CDI - Temps plein",
            date: "Publiée il y a 1 semaine",
            dept: "Consulting & Services"
        },
        {
            id: 3,
            title: "Développeur React / Laravel JS Full Stack (H/F)",
            location: "Casablanca, Maroc (Hybride)",
            type: "CDI - Temps plein",
            date: "Publiée il y a 2 semaines",
            dept: "R&D / Produit"
        }
    ];

    return (
        <MainLayout>
            <Head title="Carrière - B-AGILE" />

            {/* Header */}
            <section className="bg-purple-950 text-white py-16 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-widest uppercase">Carrière</h1>
                    <p className="text-lg text-slate-300">
                        Façonnez le futur de la Supply Chain. Rejoignez une équipe passionnée et agile !
                    </p>
                </div>
            </section>

            {/* Culture / Life at B-AGILE */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">Notre Culture & Nos Valeurs</h2>
                    <p className="text-slate-600">
                        Chez B-AGILE, nous pensons que l'agilité n'est pas seulement une méthodologie de développement, c'est un état d'esprit qui guide nos actions quotidiennes.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-8 mb-24">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto"><Zap size={24} /></div>
                        <h4 className="font-bold text-slate-800">Innovation</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Nous expérimentons continuellement de nouvelles technologies pour rester à l'avant-garde.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto"><Heart size={24} /></div>
                        <h4 className="font-bold text-slate-800">Esprit d'équipe</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Une entraide forte, des rituels collaboratifs réguliers et une ambiance conviviale.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto"><Award size={24} /></div>
                        <h4 className="font-bold text-slate-800">Excellence</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Nous nous engageons à livrer des solutions robustes et de haute qualité à nos clients.</p>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center space-y-3">
                        <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center mx-auto"><Smile size={24} /></div>
                        <h4 className="font-bold text-slate-800">Bien-être</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">Des horaires de travail flexibles, des possibilités de télétravail hybride et des team buildings.</p>
                    </div>
                </div>

                {/* Job Offers */}
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-slate-900 text-center mb-10">Nos opportunités actuelles</h3>
                    <div className="space-y-6">
                        {jobOffers.map((job) => (
                            <div 
                                key={job.id} 
                                className="bg-white p-6 rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                            >
                                <div className="space-y-2">
                                    <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider">
                                        {job.dept}
                                    </span>
                                    <h4 className="text-lg font-bold text-slate-900">{job.title}</h4>
                                    <div className="flex flex-wrap gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {job.type}</span>
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {job.date}</span>
                                    </div>
                                </div>
                                <Link 
                                    href="/contact" 
                                    className="bg-purple-700 hover:bg-purple-800 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition shrink-0"
                                >
                                    Postuler
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Spontaneous Application */}
                <div className="mt-20 bg-gradient-to-tr from-slate-900 to-purple-950 text-white p-8 md:p-12 rounded-3xl text-center space-y-6 max-w-4xl mx-auto shadow-xl">
                    <h3 className="text-2xl font-extrabold">Candidature Spontanée</h3>
                    <p className="text-purple-200 max-w-xl mx-auto text-sm leading-relaxed">
                        Vous ne trouvez pas de poste correspondant à votre profil mais souhaitez absolument rejoindre l'aventure B-AGILE ? Envoyez-nous votre CV et vos motivations.
                    </p>
                    <div>
                        <Link 
                            href="/contact" 
                            className="inline-block bg-white text-purple-900 font-bold px-8 py-3 rounded-lg hover:bg-slate-100 transition shadow"
                        >
                            Soumettre un CV spontané
                        </Link>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
