import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleQuickLogin = (name, email) => {
        router.post(route('login'), {
            name: name,
            email: email,
            password: 'password',
            remember: false,
        });
    };

    return (
        <GuestLayout>
            <Head title="Connexion" />

            <div className="mb-6 text-center select-none">
                <h2 className="text-xl font-extrabold text-white tracking-wide uppercase">Bienvenue</h2>
                <p className="text-xs text-purple-200/70 mt-1.5 font-medium">Connectez-vous pour accéder à votre espace</p>
            </div>

            {status && (
                <div className="mb-4 text-xs font-semibold text-green-400 bg-green-950/30 border border-green-500/20 p-3 rounded-xl text-center">
                    {status}
                </div>
            )}

            {/* Section Connexion Rapide - Glassmorphism */}
            <div className="mb-6 bg-purple-950/40 rounded-2xl p-4 border border-purple-800/30 shadow-inner">
                <span className="block text-[10px] font-black text-purple-300 uppercase tracking-widest mb-3 text-center">
                    Connexion Rapide (Mode Démo)
                </span>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleQuickLogin('Jean Client', 'client@bagile.com')}
                        className="flex flex-col items-center justify-center p-3 bg-purple-900/10 hover:bg-purple-900/25 border border-purple-800/40 hover:border-purple-500/40 rounded-xl transition duration-300 text-center shadow-md group"
                    >
                        <span className="text-xl mb-1 group-hover:scale-110 transition duration-300">👤</span>
                        <span className="text-[11px] font-bold text-white tracking-wide">Espace Client</span>
                        <span className="text-[9px] text-purple-300/70 font-mono mt-0.5">client@bagile.com</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleQuickLogin('Sophie Admin (B-AGILE)', 'team@bagile.com')}
                        className="flex flex-col items-center justify-center p-3 bg-purple-900/10 hover:bg-purple-900/25 border border-purple-800/40 hover:border-purple-500/40 rounded-xl transition duration-300 text-center shadow-md group"
                    >
                        <span className="text-xl mb-1 group-hover:scale-110 transition duration-300">💼</span>
                        <span className="text-[11px] font-bold text-white tracking-wide">Espace Équipe</span>
                        <span className="text-[9px] text-purple-300/70 font-mono mt-0.5">team@bagile.com</span>
                    </button>
                </div>
            </div>

            <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-purple-900/40 w-full"></div>
                <span className="absolute bg-[#110925] px-3 text-[9px] font-black text-purple-300/80 uppercase tracking-widest">
                    ou saisir vos identifiants
                </span>
            </div>

            <form onSubmit={submit} className="space-y-4">
                {/* Nom */}
                <div>
                    <InputLabel htmlFor="name" value="Nom" className="text-purple-200/80 text-[10px] font-bold uppercase tracking-wider" />

                    <div className="relative mt-1">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300/40" size={15} />
                        <TextInput
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            className="block w-full pl-10 !bg-purple-950/40 !border-purple-800/40 text-white placeholder-purple-300/20 rounded-xl !focus:border-purple-400 !focus:ring !focus:ring-purple-500/10 transition duration-200 text-sm py-2"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            placeholder="Votre nom"
                            required
                        />
                    </div>

                    <InputError message={errors.name} className="mt-1 text-red-400 text-xs" />
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" className="text-purple-200/80 text-[10px] font-bold uppercase tracking-wider" />

                    <div className="relative mt-1">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300/40" size={15} />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-10 !bg-purple-950/40 !border-purple-800/40 text-white placeholder-purple-300/20 rounded-xl !focus:border-purple-400 !focus:ring !focus:ring-purple-500/10 transition duration-200 text-sm py-2"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="votre@email.com"
                            required
                        />
                    </div>

                    <InputError message={errors.email} className="mt-1 text-red-400 text-xs" />
                </div>

                {/* Mot de passe */}
                <div>
                    <InputLabel htmlFor="password" value="Mot de passe" className="text-purple-200/80 text-[10px] font-bold uppercase tracking-wider" />

                    <div className="relative mt-1">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-purple-300/40" size={15} />
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="block w-full pl-10 pr-10 !bg-purple-950/40 !border-purple-800/40 text-white placeholder-purple-300/20 rounded-xl !focus:border-purple-400 !focus:ring !focus:ring-purple-500/10 transition duration-200 text-sm py-2"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-300/40 hover:text-white transition duration-200"
                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-1 text-red-400 text-xs" />
                </div>

                {/* Se souvenir de moi & Oublié */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center select-none">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="border-purple-800/50 bg-purple-950/40 text-purple-600 focus:ring-purple-500/20"
                        />
                        <span className="ms-2 text-[10px] font-bold text-purple-200/70 uppercase tracking-wider">
                            Se souvenir de moi
                        </span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-[10px] font-bold text-purple-300 hover:text-white underline transition"
                        >
                            Mot de passe oublié ?
                        </Link>
                    )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end pt-3">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
                    >
                        Se connecter
                    </button>
                </div>
            </form>

            <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-purple-900/40 w-full"></div>
                <span className="absolute bg-[#110925] px-3 text-[9px] font-black text-purple-300/80 uppercase tracking-widest">ou</span>
            </div>

            {/* Google Authentication */}
            <a
                href="/auth/google"
                className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 rounded-xl py-3 transition-all duration-300 text-[10px] font-black uppercase tracking-widest text-white shadow-md hover:shadow-purple-500/10 active:scale-[0.98]"
            >
                <svg width="15" height="15" viewBox="0 0 18 18" className="shrink-0">
                    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.92c1.7-1.57 2.68-3.88 2.68-6.64z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.27c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.34C2.44 15.98 5.48 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.97 10.71c-.18-.54-.28-1.11-.28-1.71s.1-1.17.28-1.71V4.95H.96C.35 6.17 0 7.55 0 9s.35 2.83.96 4.05l3.01-2.34z"/>
                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.95l3.01 2.34C4.68 5.16 6.66 3.58 9 3.58z"/>
                </svg>
                Se connecter avec Google
            </a>
        </GuestLayout>
    );
}