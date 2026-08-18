import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950 pt-6 sm:pt-0 overflow-hidden">
            {/* Glowing blur halos in the background for depth */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-950/20 rounded-full blur-3xl pointer-events-none" />

            {/* Logo B-AGILE en filigrane de fond subtil */}
            <div
                className="absolute inset-0 flex items-center justify-center opacity-[0.07] pointer-events-none select-none"
                style={{
                    backgroundImage: "url('/images/logo-bagile.png')",
                    backgroundSize: '900px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div className="relative z-10 hover:scale-105 transition duration-300">
                <Link href="/">
                    <ApplicationLogo className="h-16 w-auto" />
                </Link>
            </div>

            {/* Card formulaire effet verre dépoli (Glassmorphism) haut de gamme */}
            <div className="relative z-10 mt-6 w-full overflow-hidden bg-purple-950/20 backdrop-blur-xl border border-purple-800/30 px-8 py-8 shadow-2xl sm:max-w-md sm:rounded-2xl">
                {children}
            </div>
        </div>
    );
}