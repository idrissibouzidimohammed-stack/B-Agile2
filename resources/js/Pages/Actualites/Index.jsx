import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Calendar, Tag, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

export default function Index({ news }) {
    const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <MainLayout>
            <Head title="Actualités - B-AGILE" />

            {/* Header */}
            <section className="bg-purple-950 text-white py-16 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-widest uppercase">Actualités</h1>
                    <p className="text-lg text-slate-300">
                        Suivez nos derniers déploiements, innovations produits et actualités d'entreprise.
                    </p>
                </div>
            </section>

            {/* Articles list */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {news.map((item) => (
                        <article 
                            key={item.id} 
                            className="bg-white rounded-2xl border border-slate-200 hover:shadow-lg transition duration-300 overflow-hidden flex flex-col justify-between"
                        >
                            <div>
                                {/* Mock image block with gradient placeholders since we don't have local image files */}
                                <div className="w-full h-48 bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center p-6 text-center text-white/80 font-bold text-lg select-none">
                                    {item.tag}
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {item.date}</span>
                                        <span className="flex items-center gap-1 uppercase tracking-wider text-purple-600 font-semibold"><Tag size={12} /> {item.tag}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {item.summary}
                                    </p>
                                </div>
                            </div>
                            <div className="p-6 pt-0">
                                <button 
                                    onClick={() => setSelectedArticle(item)}
                                    className="text-purple-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                                >
                                    Lire l'article <ArrowRight size={16} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Article Detail Modal */}
            {selectedArticle && (
                <div className="fixed inset-0 bg-purple-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100">
                        {/* Close button */}
                        <button 
                            onClick={() => setSelectedArticle(null)}
                            className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full transition"
                            aria-label="Fermer"
                        >
                            <X size={18} />
                        </button>

                        <div className="p-6 md:p-8 space-y-6">
                            <div className="space-y-2">
                                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-3 py-1 rounded-full uppercase tracking-wider">
                                    {selectedArticle.tag}
                                </span>
                                <h2 className="text-2xl font-bold text-slate-900 leading-snug pr-8">
                                    {selectedArticle.title}
                                </h2>
                                <div className="text-xs text-slate-500 flex items-center gap-1.5">
                                    <Calendar size={14} /> {selectedArticle.date}
                                </div>
                            </div>

                            {/* Gradient block inside modal */}
                            <div className="w-full h-56 bg-gradient-to-tr from-purple-900 via-slate-900 to-indigo-950 rounded-xl flex items-center justify-center text-white/70 font-semibold">
                                B-AGILE Business Solutions
                            </div>

                            <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line font-sans">
                                {selectedArticle.content}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
