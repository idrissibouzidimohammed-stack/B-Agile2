import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';

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

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">Bienvenue sur B-AGILE</h2>
                <p className="text-sm text-gray-700 mt-1">Connectez-vous pour accéder à votre espace</p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            {/* Section Connexion Rapide */}
            <div className="mb-6 bg-purple-50 rounded-xl p-4 border border-purple-100">
                <span className="block text-xs font-bold text-purple-800 uppercase tracking-wider mb-3 text-center">
                    Connexion Rapide (Mode Démo)
                </span>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => handleQuickLogin('Jean Client', 'client@bagile.com')}
                        className="flex flex-col items-center justify-center p-3 bg-white hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg transition duration-200 text-center shadow-sm group"
                    >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition duration-200">👤</span>
                        <span className="text-xs font-bold text-purple-950">Espace Client</span>
                        <span className="text-[10px] text-gray-800 font-mono mt-0.5">client@bagile.com</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleQuickLogin('Sophie Admin (B-AGILE)', 'team@bagile.com')}
                        className="flex flex-col items-center justify-center p-3 bg-white hover:bg-purple-100 border border-purple-200 hover:border-purple-300 rounded-lg transition duration-200 text-center shadow-sm group"
                    >
                        <span className="text-2xl mb-1 group-hover:scale-110 transition duration-200">💼</span>
                        <span className="text-xs font-bold text-purple-950">Espace Équipe</span>
                        <span className="text-[10px] text-gray-800 font-mono mt-0.5">team@bagile.com</span>
                    </button>
                </div>
            </div>

            <div className="relative flex items-center justify-center my-6">
                <div className="border-t border-gray-200 w-full"></div>
                <span className="absolute bg-white px-3 text-xs text-gray-700 uppercase tracking-wider">ou saisir vos identifiants</span>
            </div>

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nom" />

                    <TextInput
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Mot de passe" />

                    <div className="relative">
                        <TextInput
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full pr-10"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-900">
                            Se souvenir de moi
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-900 underline hover:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Mot de passe oublié ?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Se connecter
                    </PrimaryButton>
                </div>
            </form>
<div className="relative flex items-center justify-center my-6">
    <div className="border-t border-gray-200 w-full"></div>
    <span className="absolute bg-white px-3 text-xs text-gray-700 uppercase tracking-wider">ou</span>
</div>


   <a href="/auth/google"
    className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 hover:bg-gray-50 transition text-sm font-medium text-gray-700"
>
    <svg width="18" height="18" viewBox="0 0 18 18">
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