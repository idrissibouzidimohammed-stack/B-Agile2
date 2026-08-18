import { Link } from '@inertiajs/react';
import { Youtube, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300 pt-20 pb-8 border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">

                {/* Logo + réseaux */}
                <div className="space-y-6">
                    <div className="flex items-center gap-2.5">
                        {/* Circle white with transparent 'B' */}
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black select-none shrink-0">
                            <span className="text-zinc-950 text-lg leading-none font-sans" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontWeight: 900 }}>B</span>
                        </div>
                        {/* AGILE in bold white */}
                        <span className="text-xl font-black tracking-wider text-white uppercase font-sans">
                            AGILE
                        </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                        Spécialiste de la transformation digitale et partenaire technologique des acteurs de la Supply Chain et de l'Industrie.
                    </p>
                    <div className="flex gap-3">
                        <a href="#" aria-label="YouTube" className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-purple-700 hover:text-white transition duration-300"><Youtube size={16} /></a>
                        <a href="#" aria-label="Facebook" className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-purple-700 hover:text-white transition duration-300"><Facebook size={16} /></a>
                        <a href="#" aria-label="LinkedIn" className="p-2 bg-slate-900 border border-slate-800 rounded-full hover:bg-purple-700 hover:text-white transition duration-300"><Linkedin size={16} /></a>
                    </div>
                </div>

                {/* Solutions */}
                <div>
                    <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Nos solutions</h3>
                    <ul className="space-y-3 text-xs text-slate-400">
                        <li><Link href="/nos-solutions/erp" className="hover:text-purple-400 transition-colors">Enterprise Resource Planning – ERP</Link></li>
                        <li><Link href="/nos-solutions/wms" className="hover:text-purple-400 transition-colors">Gestion d'entrepôt – WMS</Link></li>
                        <li><Link href="/nos-solutions/tms" className="hover:text-purple-400 transition-colors">Gestion de transport – TMS</Link></li>
                        <li><Link href="/nos-solutions/crm" className="hover:text-purple-400 transition-colors">Gestion de la relation client – CRM</Link></li>
                        <li><Link href="/nos-solutions/gmao" className="hover:text-purple-400 transition-colors">Gestion de la maintenance – GMAO</Link></li>
                        <li><Link href="/nos-solutions/pos" className="hover:text-purple-400 transition-colors">Gestion des points de vente – POS</Link></li>
                        <li><Link href="/nos-solutions/ecom" className="hover:text-purple-400 transition-colors">Gestion du commerce en ligne – E-COM</Link></li>
                        <li><Link href="/nos-solutions/education" className="hover:text-purple-400 transition-colors">Offre pédagogique de formation</Link></li>
                    </ul>
                </div>

                {/* Bureaux */}
                <div>
                    <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Nos bureaux</h3>
                    <ul className="space-y-4 text-xs text-slate-400">
                        <li className="flex gap-2">
                            <MapPin size={16} className="shrink-0 text-purple-500 mt-0.5" />
                            <span>Angle du Boulevard de l'Océan Pacifique et de l'Avenue du Golf Arabique, Casablanca, Maroc</span>
                        </li>
                        <li className="flex gap-2">
                            <MapPin size={16} className="shrink-0 text-purple-500 mt-0.5" />
                            <span>54, Av Allal Ben Abdellah, Résidence Bureau Allal Ben Abdellah, 3ème étage, Fès, Maroc</span>
                        </li>
                        <li className="flex gap-2">
                            <MapPin size={16} className="shrink-0 text-purple-500 mt-0.5" />
                            <span>4ème étage, FM 16, annexe grande mosquée, Dakhla, Agadir, Maroc</span>
                        </li>
                    </ul>
                </div>

                {/* Contact + menu */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Nos contacts</h3>
                        <ul className="space-y-3 text-xs text-slate-400">
                            <li className="flex items-center gap-2"><Mail size={14} className="text-purple-500" /> contact@bagile-systems.com</li>
                            <li className="flex items-center gap-2"><Mail size={14} className="text-purple-500" /> partners@bagile-systems.com</li>
                            <li className="flex items-center gap-2"><Phone size={14} className="text-purple-500" /> +212 0520 259 959</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold mb-6 tracking-wider text-sm uppercase">Menu du site</h3>
                        <ul className="space-y-2 text-xs text-slate-400">
                            <li><Link href="/" className="hover:text-purple-400 transition-colors">Accueil</Link></li>
                            <li><Link href="/a-propos" className="hover:text-purple-400 transition-colors">À propos</Link></li>
                            <li><Link href="/nos-solutions" className="hover:text-purple-400 transition-colors">Nos solutions</Link></li>
                            <li><Link href="/partenariat" className="hover:text-purple-400 transition-colors">Partenariat</Link></li>
                            <li><Link href="/actualites" className="hover:text-purple-400 transition-colors">Actualités</Link></li>
                            <li><Link href="/carriere" className="hover:text-purple-400 transition-colors">Carrière</Link></li>
                            <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bas de page */}
            <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>© {new Date().getFullYear()} B-AGILE. Tous droits réservés.</p>
                <div className="flex gap-6">
                    <Link href="/mentions-legales" className="hover:text-purple-400 transition-colors">Mentions légales</Link>
                    <Link href="/politique-cookies" className="hover:text-purple-400 transition-colors">Politique en matière de cookies</Link>
                    <Link href="/politique-confidentialite" className="hover:text-purple-400 transition-colors">Politique de confidentialité</Link>
                </div>
            </div>
        </footer>
    );
}
