import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function TeamDashboard({ demandes }) {
    const [selectedDemande, setSelectedDemande] = useState(demandes[0] || null);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tous');
    const [categoryFilter, setCategoryFilter] = useState('Tous');

    // Reply Form
    const replyForm = useForm({
        message: '',
    });

    const handleStatusChange = (e, demandeId) => {
        const newStatus = e.target.value;
        router.patch(route('demandes.update-status', demandeId), {
            status: newStatus
        }, {
            onSuccess: () => {
                // Find and update selected item locally or reload
                window.location.reload();
            }
        });
    };

    const handleReplySubmit = (e, demandeId) => {
        e.preventDefault();
        if (!replyForm.data.message.trim()) return;

        replyForm.post(route('demandes.store-response', demandeId), {
            onSuccess: () => {
                replyForm.reset('message');
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

    // Filters logic
    const filteredDemandes = demandes.filter(d => {
        const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              d.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              d.user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'Tous' || d.status === statusFilter;
        const matchesCategory = categoryFilter === 'Tous' || d.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Stats calculations
    const statsTotal = demandes.length;
    const statsPending = demandes.filter(d => d.status === 'En attente').length;
    const statsInProgress = demandes.filter(d => d.status === 'En cours').length;
    const statsResolved = demandes.filter(d => d.status === 'Résolue').length;

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Console d'Administration Support
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Gérez les demandes d'implémentation client, modifiez leurs statuts et discutez en direct.
                    </p>
                </div>
            }
        >
            <Head title="Espace Équipe - Gestion des Demandes" />

            <div className="py-8 bg-gray-50 min-h-[calc(100vh-140px)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-slate-100 text-slate-700 rounded-xl text-xl">📋</div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">Total tickets</span>
                                <span className="text-2xl font-bold text-gray-900">{statsTotal}</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl text-xl">⏳</div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">En attente</span>
                                <span className="text-2xl font-bold text-gray-900">{statsPending}</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl text-xl">⚡</div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">En cours</span>
                                <span className="text-2xl font-bold text-gray-900">{statsInProgress}</span>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-700 rounded-xl text-xl">✓</div>
                            <div>
                                <span className="block text-xs text-gray-400 uppercase tracking-wider font-semibold">Résolus</span>
                                <span className="text-2xl font-bold text-gray-900">{statsResolved}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        
                        {/* Sidebar List and Filters */}
                        <div className="lg:col-span-5 flex flex-col gap-4">
                            
                            {/* Search and Filters box */}
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Rechercher (titre, client, email)..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Statut</label>
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none bg-white font-medium"
                                        >
                                            <option value="Tous">Tous les statuts</option>
                                            <option value="En attente">En attente</option>
                                            <option value="En cours">En cours</option>
                                            <option value="Résolue">Résolue</option>
                                            <option value="Rejetée">Rejetée</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Catégorie</label>
                                        <select
                                            value={categoryFilter}
                                            onChange={(e) => setCategoryFilter(e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl px-2.5 py-1.5 text-xs focus:outline-none bg-white font-medium"
                                        >
                                            <option value="Tous">Toutes les catégories</option>
                                            <option value="ERP">ERP</option>
                                            <option value="WMS">WMS</option>
                                            <option value="CRM">CRM</option>
                                            <option value="TMS">TMS</option>
                                            <option value="GMAO">GMAO</option>
                                            <option value="POS">POS</option>
                                            <option value="E-COM">E-COM</option>
                                            <option value="Support">Support</option>
                                            <option value="Autre">Autre</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* List Card */}
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[460px] flex flex-col">
                                <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                                    <h3 className="font-bold text-slate-800 text-xs">Liste des demandes client</h3>
                                    <span className="text-[10px] font-bold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">
                                        {filteredDemandes.length} / {demandes.length}
                                    </span>
                                </div>
                                <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
                                    {filteredDemandes.length === 0 ? (
                                        <div className="p-8 text-center text-gray-400 text-sm">
                                            Aucune demande trouvée avec les filtres sélectionnés.
                                        </div>
                                    ) : (
                                        filteredDemandes.map((demande) => (
                                            <button
                                                key={demande.id}
                                                onClick={() => setSelectedDemande(demande)}
                                                className={`w-full text-left p-4 hover:bg-gray-50 transition duration-150 flex flex-col gap-1.5 ${
                                                    selectedDemande?.id === demande.id ? 'bg-purple-50/55 border-l-4 border-purple-700' : ''
                                                }`}
                                            >
                                                <div className="flex items-center justify-between w-full">
                                                    <span className="text-[10px] font-bold text-gray-400">
                                                        👤 {demande.user.name}
                                                    </span>
                                                    <span className="text-xs text-gray-400 font-mono">
                                                        {new Date(demande.created_at).toLocaleDateString('fr-FR')}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-slate-850 text-sm line-clamp-1">
                                                    {demande.title}
                                                </h4>
                                                <div className="flex items-center justify-between w-full mt-1.5">
                                                    <div className="flex gap-1.5">
                                                        <span className={`text-[10px] font-semibold px-2 py-0.5 border rounded-full ${getStatusStyle(demande.status)}`}>
                                                            {demande.status}
                                                        </span>
                                                        <span className={`text-[10px] font-semibold px-2 py-0.5 border rounded-full ${getPriorityStyle(demande.priority)}`}>
                                                            {demande.priority}
                                                        </span>
                                                    </div>
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                                                        {demande.category}
                                                    </span>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Detail and Conversation Pane */}
                        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-[630px] flex flex-col">
                            {selectedDemande ? (
                                <div className="flex flex-col h-full animate-fade-in">
                                    
                                    {/* Header Panel */}
                                    <div className="p-6 border-b border-gray-100 flex flex-col gap-3.5 bg-white">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div>
                                                <span className="block text-[10px] text-gray-400 font-bold uppercase">Client</span>
                                                <span className="text-sm font-bold text-slate-900">{selectedDemande.user.name}</span>
                                                <span className="text-xs text-gray-400 block font-mono">{selectedDemande.user.email}</span>
                                            </div>
                                            
                                            {/* Action Control: Status Selector */}
                                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 p-2 rounded-xl">
                                                <label className="text-xs font-bold text-gray-500 uppercase tracking-wide px-1">Statut :</label>
                                                <select
                                                    value={selectedDemande.status}
                                                    onChange={(e) => handleStatusChange(e, selectedDemande.id)}
                                                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none bg-white font-semibold"
                                                >
                                                    <option value="En attente">En attente</option>
                                                    <option value="En cours">En cours</option>
                                                    <option value="Résolue">Résolue</option>
                                                    <option value="Rejetée">Rejetée</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-100 pt-3">
                                            <h3 className="text-md font-bold text-slate-900 mb-1">{selectedDemande.title}</h3>
                                            <p className="text-xs text-gray-600 bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-line leading-relaxed">
                                                {selectedDemande.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Message History Thread */}
                                    <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-4">
                                        <div className="text-center">
                                            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold bg-white px-3 py-1 border border-gray-100 rounded-full shadow-sm">
                                                Historique support client
                                            </span>
                                        </div>

                                        {selectedDemande.responses && selectedDemande.responses.map((response) => {
                                            const isTeam = response.user.role === 'team';
                                            const isSystem = response.message.startsWith('💡');
                                            
                                            if (isSystem) {
                                                return (
                                                    <div key={response.id} className="flex justify-center my-2">
                                                        <span className="text-[11px] text-purple-700 bg-purple-50 border border-purple-100/50 px-3.5 py-1.5 rounded-lg font-medium shadow-sm">
                                                            {response.message}
                                                        </span>
                                                    </div>
                                                );
                                            }

                                            return (
                                                <div
                                                    key={response.id}
                                                    className={`flex flex-col max-w-[85%] ${
                                                        isTeam ? 'ml-auto items-end' : 'mr-auto items-start'
                                                    }`}
                                                >
                                                    <span className="text-[10px] text-gray-400 mb-0.5 px-1">
                                                        {response.user.name} • {new Date(response.created_at).toLocaleDateString('fr-FR')} à {new Date(response.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                                                    </span>
                                                    <div
                                                        className={`p-3.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                                                            isTeam
                                                                ? 'bg-purple-700 text-white rounded-tr-none'
                                                                : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                                                        }`}
                                                    >
                                                        <p className="whitespace-pre-line">{response.message}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Action Reply area */}
                                    <form
                                        onSubmit={(e) => handleReplySubmit(e, selectedDemande.id)}
                                        className="p-4 border-t border-gray-100 bg-white flex gap-3"
                                    >
                                        <input
                                            type="text"
                                            value={replyForm.data.message}
                                            onChange={(e) => replyForm.setData('message', e.target.value)}
                                            placeholder="Répondre au client..."
                                            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                            disabled={replyForm.processing}
                                        />
                                        <button
                                            type="submit"
                                            disabled={replyForm.processing}
                                            className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition duration-200 shadow-sm whitespace-nowrap"
                                        >
                                            Envoyer la réponse
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-400">
                                    <span className="text-4xl">📥</span>
                                    <p className="mt-2 text-sm">Sélectionnez une demande dans la liste pour démarrer le traitement.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
