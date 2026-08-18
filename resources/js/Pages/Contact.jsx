import MainLayout from '@/Layouts/MainLayout';
import { Head, useForm } from '@inertiajs/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import ScrollReveal from '@/Components/ScrollReveal';

export default function Contact() {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        nom: '',
        entreprise: '',
        email: '',
        telephone: '',
        sujet: 'Informations générales',
        message: ''
    });

    const [mockSuccess, setMockSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        post('/contact', {
            onSuccess: () => {
                reset();
                setMockSuccess(true);
            },
            onError: () => {},
        });
    };

    return (
        <MainLayout>
            <Head title="Contact - B-AGILE" />

            <section className="bg-purple-950 text-white py-16 px-6 text-center">
                <ScrollReveal>
                    <div className="max-w-4xl mx-auto space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-widest uppercase">Contact</h1>
                        <p className="text-lg text-slate-300">
                            Discutons de vos besoins de transformation digitale et de Supply Chain.
                        </p>
                    </div>
                </ScrollReveal>
            </section>

            <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-12 gap-12">
                <ScrollReveal className="md:col-span-5 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-slate-900">Coordonnées</h2>
                        <div className="w-12 h-1 bg-purple-600 rounded" />
                        <p className="text-slate-600">
                            N'hésitez pas à nous contacter directement par téléphone ou email, ou à visiter l'un de nos bureaux locaux.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
                            <span className="inline-block text-xs font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded-full uppercase">
                                Siège social - Casablanca
                            </span>
                            <div className="flex gap-3 text-sm text-slate-600">
                                <MapPin size={18} className="text-purple-600 shrink-0 mt-0.5" />
                                <span>Angle du Boulevard de l'Océan Pacifique et de l'Avenue du Golf Arabique, Casablanca, Maroc</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
                            <span className="inline-block text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase">
                                Bureau Fès
                            </span>
                            <div className="flex gap-3 text-sm text-slate-600">
                                <MapPin size={18} className="text-slate-500 shrink-0 mt-0.5" />
                                <span>54, Av Allal Ben Abdellah, Résidence Bureau Allal Ben Abdellah, 3ème étage, Fès, Maroc</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-3">
                            <span className="inline-block text-xs font-bold bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase">
                                Bureau Agadir
                            </span>
                            <div className="flex gap-3 text-sm text-slate-600">
                                <MapPin size={18} className="text-slate-500 shrink-0 mt-0.5" />
                                <span>4ème étage, FM 16, annexe grande mosquée, Dakhla, Agadir, Maroc</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-200 space-y-3 text-sm">
                        <div className="flex items-center gap-3 text-slate-700">
                            <Mail size={16} className="text-purple-600" />
                            <span>contact@bagile-systems.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                            <Phone size={16} className="text-purple-600" />
                            <span>+212 0520 259 959</span>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal delay={0.15} className="md:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h3>

                    {(wasSuccessful || mockSuccess) && (
                        <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-lg mb-6 text-sm flex items-center gap-2">
                            <CheckCircle size={18} className="shrink-0" />
                            <span>Merci ! Votre message a bien été envoyé. Notre équipe commerciale vous répondra rapidement.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Nom Complet</label>
                                <input
                                    type="text"
                                    required
                                    value={data.nom}
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                                {errors.nom && <div className="text-red-500 text-xs mt-1">{errors.nom}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Entreprise</label>
                                <input
                                    type="text"
                                    value={data.entreprise}
                                    onChange={(e) => setData('entreprise', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                                {errors.entreprise && <div className="text-red-500 text-xs mt-1">{errors.entreprise}</div>}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Adresse Email</label>
                                <input
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                                {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Téléphone</label>
                                <input
                                    type="tel"
                                    required
                                    value={data.telephone}
                                    onChange={(e) => setData('telephone', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                                {errors.telephone && <div className="text-red-500 text-xs mt-1">{errors.telephone}</div>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Sujet</label>
                            <select
                                value={data.sujet}
                                onChange={(e) => setData('sujet', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                            >
                                <option value="Informations générales">Informations générales</option>
                                <option value="Demande de devis / démo">Demande de devis / démo</option>
                                <option value="Candidature / recrutement">Candidature / recrutement</option>
                                <option value="Partenariat commercial">Partenariat commercial</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                            <textarea
                                rows={5}
                                required
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                            />
                            {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-purple-700 hover:bg-purple-800 disabled:bg-purple-300 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
                            >
                                <Send size={16} />
                                {processing ? 'Envoi en cours...' : 'Envoyer le message'}
                            </button>
                        </div>
                    </form>
                </ScrollReveal>
            </section>
        </MainLayout>
    );
}