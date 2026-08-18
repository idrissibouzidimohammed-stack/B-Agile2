export default function VideoHero({ videoSrc, children, overlayClass = 'from-teal-600/80 via-blue-800/80 to-slate-900/90' }) {
    return (
        <section className="relative min-h-[500px] flex items-center overflow-hidden">
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
            <div className={`absolute inset-0 bg-gradient-to-br ${overlayClass}`} />
            <div className="relative z-10 w-full">
                {children}
            </div>
        </section>
    );
}