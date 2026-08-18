import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import { Award, TrendingUp, Users, CheckCircle, Globe } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '@/Components/ScrollReveal';

export default function Partenariat() {
    const [formData, setFormData] = useState({
        nom: '',
        entreprise: '',
        email: '',
        telephone: '',
        message: ''
    });

    const [status, setStatus] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('success');
        setFormData({ nom: '', entreprise: '', email: '', telephone: '', message: '' });
    };

    return (
        <MainLayout>
            <Head title="Partenariat - B-AGILE" />

            {/* Header */}
            <section className="bg-purple-950 text-white py-16 px-6 text-center">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-widest uppercase">Partenariat</h1>
                        <p className="text-lg text-slate-300">
                            Développons ensemble l'excellence opérationnelle de la Supply Chain à l'international.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Info + Benefits */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <ScrollReveal>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                                Pourquoi rejoindre le réseau de partenaires B-AGILE ?
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                B-AGILE distribue ses progiciels et intègre ses services à travers un écosystème de partenaires qualifiés.
                                Que vous soyez cabinet de conseil en Supply Chain, intégrateur de solutions ERP, ou éditeur de solutions connexes,
                                nous vous fournissons les outils et l'accompagnement nécessaires pour étendre votre offre.
                            </p>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <CheckCircle size={20} className="text-purple-600 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Support Technique Prioritaire</h4>
                                        <p className="text-slate-500 text-sm">Accès direct à nos équipes R&D pour la résolution et l'intégration personnalisée.</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={20} className="text-purple-600 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Formations & Certifications</h4>
                                        <p className="text-slate-500 text-sm">Formation complète de vos consultants sur nos produits (WMS, TMS, ERP).</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <CheckCircle size={20} className="text-purple-600 shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Co-marketing & Leads</h4>
                                        <p className="text-slate-500 text-sm">Partage d'opportunités commerciales qualifiées dans vos zones géographiques.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="grid grid-cols-2 gap-6 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-2">
                                <Globe size={28} className="text-purple-600" />
                                <h4 className="font-bold text-slate-800">Visibilité</h4>
                                <p className="text-xs text-slate-500">Présence sur nos marchés au Maroc et en Afrique.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-2">
                                <TrendingUp size={28} className="text-purple-600" />
                                <h4 className="font-bold text-slate-800">Croissance</h4>
                                <p className="text-xs text-slate-500">Générez de nouveaux revenus récurrents.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-2">
                                <Users size={28} className="text-purple-600" />
                                <h4 className="font-bold text-slate-800">Communauté</h4>
                                <p className="text-xs text-slate-500">Partage de retours d'expériences et webinaires.</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl border border-slate-100 space-y-2">
                                <Award size={28} className="text-purple-600" />
                                <h4 className="font-bold text-slate-800">Label</h4>
                                <p className="text-xs text-slate-500">Devenez partenaire certifié B-AGILE.</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Form */}
                <ScrollReveal>
                    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
                        <h3 className="text-2xl font-bold text-slate-900 text-center mb-6">Devenir Partenaire</h3>
                        <p className="text-slate-500 text-sm text-center mb-8 max-w-lg mx-auto">
                            Remplissez ce formulaire et notre directeur des partenariats vous recontactera sous 48 heures.
                        </p>

                        {status === 'success' && (
                            <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-lg mb-6 text-sm text-center">
                                Votre demande de partenariat a été envoyée avec succès. Notre équipe vous contactera très prochainement.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.nom}
                                        onChange={(e) => setFormData({...formData, nom: e.target.value})}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Entreprise</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.entreprise}
                                        onChange={(e) => setFormData({...formData, entreprise: e.target.value})}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    />
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Adresse Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.telephone}
                                        onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                                        className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Description de votre activité & Motivation</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="bg-purple-700 hover:bg-purple-800 text-white font-medium px-8 py-3 rounded-lg transition"
                                >
                                    Soumettre ma demande
                                </button>
                            </div>
                        </form>
                    </div>
                </ScrollReveal>
            </section>
        </MainLayout>
    );
}