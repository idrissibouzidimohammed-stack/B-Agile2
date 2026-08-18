import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ClientDashboard({ demandes }) {
    const [selectedDemande, setSelectedDemande] = useState(demandes[0] || null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form for creating a new request
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        category: 'ERP',
        priority: 'Moyenne',
    });

    // Form for sending a new reply
    const replyForm = useForm({
        message: '',
    });

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        post(route('demandes.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                reset();
                // Select the latest one or update view
                window.location.reload();
            },
        });
    };

    const handleReplySubmit = (e, demandeId) => {
        e.preventDefault();
        if (!replyForm.data.message.trim()) return;

        replyForm.post(route('demandes.store-response', demandeId), {
            onSuccess: () => {
                replyForm.reset('message');
                // Reload or update the active ticket discussion
                const updated = demandes.find(d => d.id === demandeId);
                if (updated) {
                    setSelectedDemande(updated);
                }
                window.location.reload();
            }
        });
    };

    // Helper for status badge color
    const getStatusStyle = (status) => {
        switch (status) {
            case 'En attente':
                return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'En cours':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Résolue':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'Rejetée':
                return 'bg-rose-100 text-rose-800 border-rose-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Helper for priority badge color
    const getPriorityStyle = (priority) => {
        switch (priority) {
            case 'Haute':
                return 'bg-rose-50 text-rose-700 border-rose-100';
            case 'Moyenne':
                return 'bg-amber-50 text-amber-700 border-amber-100';
            default:
                return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const activeDemandesCount = demandes.filter(d => d.status !== 'Résolue' && d.status !== 'Rejetée').length;
    const resolvedDemandesCount = demandes.filter(d => d.status === 'Résolue').length;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-purple-950 tracking-tight">
                            Mon Espace Support Client
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Créez et suivez vos demandes d'implémentation et de support B-AGILE.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2.5 px-5 rounded-xl transition duration-200 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                    >
                        <span>➕</span> Nouvelle demande
                    </button>
                </div>
            }
        >
            <Head title="Espace Client - Support" />

            <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3.5 bg-purple-50 text-purple-700 rounded-xl text-2xl">📋</div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Total demandes</span>
                                <span className="text-2xl font-bold text-gray-900">{demandes.length}</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3.5 bg-blue-50 text-blue-700 rounded-xl text-2xl">⚡</div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Demandes en cours / attente</span>
                                <span className="text-2xl font-bold text-gray-900">{activeDemandesCount}</span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3.5 bg-green-50 text-green-700 rounded-xl text-2xl">✓</div>
                            <div>
                                <span className="block text-sm text-gray-500 font-medium">Demandes résolues</span>
                                <span className="text-2xl font-bold text-gray-900">{resolvedDemandesCount}</span>
                            </div>
                        </div>
                    </div>

                    {demandes.length === 0 ? (
                        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
                            <span className="text-5xl">📨</span>
                            <h3 className="text-lg font-bold text-gray-900 mt-4">Aucune demande enregistrée</h3>
                            <p className="text-gray-500 mt-2">
                                Vous n'avez pas encore soumis de demande. Cliquez sur le bouton "Nouvelle demande" ci-dessus pour démarrer.
                            </p>
                            <button
                                onClick={() => setIsCreateModalOpen(true)}
                                className="mt-6 bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-5 rounded-xl transition duration-200"
                            >
                                Soumettre un ticket
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            
                            {/* Requests List */}
                            <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[600px] flex flex-col">
                                <div className="p-4 bg-gray-50 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 text-sm">Historique de vos demandes</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                                    {demandes.map((demande) => (
                                        <button
                                            key={demande.id}
                                            onClick={() => setSelectedDemande(demande)}
                                            className={`w-full text-left p-4 hover:bg-gray-50 transition duration-150 flex flex-col gap-2 ${
                                                selectedDemande?.id === demande.id ? 'bg-purple-50/55 border-l-4 border-purple-700' : ''
                                            }`}
                                        >
                                            <div className="flex items-center justify-between w-full">
                                                <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700 bg-purple-100/50 px-2 py-0.5 rounded">
                                                    {demande.category}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {new Date(demande.created_at).toLocaleDateString('fr-FR')}
                                                </span>
                                            </div>
                                            <h4 className="font-bold text-gray-900 text-sm line-clamp-1">
                                                {demande.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={`text-[11px] font-semibold px-2 py-0.5 border rounded-full ${getStatusStyle(demande.status)}`}>
                                                    {demande.status}
                                                </span>
                                                <span className={`text-[11px] font-semibold px-2 py-0.5 border rounded-full ${getPriorityStyle(demande.priority)}`}>
                                                    {demande.priority}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Details and Discussion Panel */}
                            <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[600px] flex flex-col">
                                {selectedDemande ? (
                                    <div className="flex flex-col h-full">
                                        
                                        {/* Detail Header */}
                                        <div className="p-6 border-b border-gray-100 flex flex-col gap-3">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-400">
                                                    Soumise le {new Date(selectedDemande.created_at).toLocaleDateString('fr-FR')} à {new Date(selectedDemande.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                                                </span>
                                                <div className="flex gap-2">
                                                    <span className={`text-xs font-semibold px-2.5 py-0.5 border rounded-full ${getStatusStyle(selectedDemande.status)}`}>
                                                        {selectedDemande.status}
                                                    </span>
                                                    <span className={`text-xs font-semibold px-2.5 py-0.5 border rounded-full ${getPriorityStyle(selectedDemande.priority)}`}>
                                                        Priorité : {selectedDemande.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900">{selectedDemande.title}</h3>
                                            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100 whitespace-pre-line leading-relaxed">
                                                {selectedDemande.description}
                                            </p>
                                        </div>

                                        {/* Discussion Thread */}
                                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
                                            <div className="text-center">
                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold bg-white px-3 py-1 border border-gray-100 rounded-full shadow-sm">
                                                    Début de la discussion
                                                </span>
                                            </div>

                                            {selectedDemande.responses && selectedDemande.responses.map((response) => {
                                                const isTeam = response.user.role === 'team';
                                                const isSystem = response.message.startsWith('💡');
                                                
                                                if (isSystem) {
                                                    return (
                                                        <div key={response.id} className="flex justify-center my-2">
                                                            <span className="text-xs text-purple-700 bg-purple-50 border border-purple-100/50 px-3.5 py-1.5 rounded-lg font-medium shadow-sm">
                                                                {response.message}
                                                            </span>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div
                                                        key={response.id}
                                                        className={`flex flex-col max-w-[85%] ${
                                                            isTeam ? 'mr-auto items-start' : 'ml-auto items-end'
                                                        }`}
                                                    >
                                                        <span className="text-[10px] text-gray-400 mb-0.5 px-1">
                                                            {response.user.name} • {new Date(response.created_at).toLocaleDateString('fr-FR')} à {new Date(response.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                                                        </span>
                                                        <div
                                                            className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                                                isTeam
                                                                    ? 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                                                    : 'bg-purple-700 text-white rounded-tr-none'
                                                            }`}
                                                        >
                                                            <p className="whitespace-pre-line">{response.message}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Reply Area */}
                                        {selectedDemande.status !== 'Résolue' && selectedDemande.status !== 'Rejetée' ? (
                                            <form
                                                onSubmit={(e) => handleReplySubmit(e, selectedDemande.id)}
                                                className="p-4 border-t border-gray-100 bg-white flex gap-3"
                                            >
                                                <input
                                                    type="text"
                                                    value={replyForm.data.message}
                                                    onChange={(e) => replyForm.setData('message', e.target.value)}
                                                    placeholder="Écrivez votre message ici..."
                                                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                                    disabled={replyForm.processing}
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={replyForm.processing}
                                                    className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition duration-200 shadow-sm"
                                                >
                                                    Envoyer
                                                </button>
                                            </form>
                                        ) : (
                                            <div className="p-4 bg-gray-100 border-t border-gray-200 text-center text-xs text-gray-500 font-medium">
                                                🔒 Cette demande est fermée. Vous ne pouvez plus y envoyer de message.
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
                                        <span className="text-4xl">👁️</span>
                                        <p className="mt-2 text-sm">Sélectionnez une demande dans la liste pour voir sa discussion.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create Request Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-gray-900">Soumettre une nouvelle demande</h3>
                            <button
                                onClick={() => setIsCreateModalOpen(false)}
                                className="text-gray-400 hover:text-gray-500 font-bold text-xl"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Titre du ticket
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ex: Bug de synchronisation des stocks"
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                />
                                {errors.title && <p className="text-rose-600 text-xs mt-1">{errors.title}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        Catégorie
                                    </label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white"
                                    >
                                        <option value="ERP">ERP</option>
                                        <option value="WMS">WMS</option>
                                        <option value="CRM">CRM</option>
                                        <option value="TMS">TMS</option>
                                        <option value="GMAO">GMAO</option>
                                        <option value="POS">POS</option>
                                        <option value="E-COM">E-COM</option>
                                        <option value="Support">Support Général</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                        Priorité
                                    </label>
                                    <select
                                        value={data.priority}
                                        onChange={(e) => setData('priority', e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white"
                                    >
                                        <option value="Basse">Basse</option>
                                        <option value="Moyenne">Moyenne</option>
                                        <option value="Haute">Haute</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                                    Description détaillée
                                </label>
                                <textarea
                                    required
                                    rows={4}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Veuillez décrire votre problème ou votre besoin d'intégration..."
                                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                ></textarea>
                                {errors.description && <p className="text-rose-600 text-xs mt-1">{errors.description}</p>}
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="border border-gray-200 text-gray-600 font-semibold py-2 px-4 rounded-xl text-sm hover:bg-gray-50 transition duration-150"
                                >
                                    Annuler
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-5 rounded-xl text-sm transition duration-150 shadow-sm"
                                >
                                    {processing ? 'Envoi...' : 'Soumettre la demande'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
