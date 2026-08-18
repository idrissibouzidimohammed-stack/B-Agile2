import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Layers, Truck, Cpu, Users, Wrench, CreditCard, ShoppingBag, BookOpen } from 'lucide-react';

export default function Index({ solutions }) {
    // Map string identifier to actual Lucide react icon component
    const getIcon = (slug) => {
        switch (slug) {
            case 'erp': return <Cpu size={24} />;
            case 'wms': return <Layers size={24} />;
            case 'tms': return <Truck size={24} />;
            case 'crm': return <Users size={24} />;
            case 'gmao': return <Wrench size={24} />;
            case 'pos': return <CreditCard size={24} />;
            case 'ecom': return <ShoppingBag size={24} />;
            case 'education': return <BookOpen size={24} />;
            default: return <Cpu size={24} />;
        }
    };

    const getIconColor = (slug) => {
        switch (slug) {
            case 'erp': return 'bg-purple-100 text-purple-700';
case 'wms': return 'bg-violet-100 text-violet-700';
case 'tms': return 'bg-fuchsia-100 text-fuchsia-700';
case 'crm': return 'bg-indigo-100 text-indigo-700';
case 'gmao': return 'bg-purple-200 text-purple-800';
case 'pos': return 'bg-violet-200 text-violet-800';
case 'ecom': return 'bg-fuchsia-200 text-fuchsia-800';
case 'education': return 'bg-indigo-200 text-indigo-800';
        }
    };

    return (
        <MainLayout>
            <Head title="Nos Solutions - B-AGILE" />

            {/* Header */}
            <section className="bg-purple-950 text-white py-16 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl font-extrabold tracking-widest uppercase">Nos Solutions</h1>
                    <p className="text-lg text-slate-300">
                        Des progiciels modulaires et robustes pour transformer et optimiser votre business.
                    </p>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl font-bold text-slate-900">
                        Un catalogue complet de logiciels métiers
                    </h2>
                    <p className="text-slate-600">
                        Chaque solution B-AGILE est conçue pour s'intégrer de manière transparente avec votre existant, vous offrant une vue unifiée de vos stocks, transports et ventes.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {solutions.map((sol) => (
                        <div 
                            key={sol.slug} 
                            className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-purple-500 hover:shadow-lg transition duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${getIconColor(sol.slug)}`}>
                                    {getIcon(sol.slug)}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{sol.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                                    {sol.short_desc}
                                </p>
                            </div>
                            <Link 
                                href={`/nos-solutions/${sol.slug}`} 
                                className="text-purple-700 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all self-start"
                            >
                                En savoir plus <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
