import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-800 via-purple-900 to-purple-950 pt-6 sm:pt-0 overflow-hidden">
            {/* Logo B-AGILE en filigrane de fond, plus visible */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/bagile-logo.png')",
                    backgroundSize: '900px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="relative z-10">
                <Link href="/">
                    <ApplicationLogo className="h-16 w-auto" />
                </Link>
            </div>

            {/* Formulaire transparent, effet verre */}
            <div className="relative z-10 mt-6 w-full overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-4 shadow-2xl sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}