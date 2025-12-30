import { Linkedin, Github, Phone } from 'lucide-react';

// Custom TikTok Icon
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const Founder = () => {
    const socialLinks = [
        { icon: <Phone className="w-5 h-5" />, href: "https://wa.me/6281320442174", label: "WhatsApp" },
        { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/", label: "LinkedIn" },
        { icon: <TikTokIcon />, href: "https://www.tiktok.com/@velora002", label: "TikTok" },
        { icon: <Github className="w-5 h-5" />, href: "https://github.com/mahinutsmannawawi20-svg", label: "GitHub" },
    ];

    return (
        <section id="founder" className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 bg-white/10 text-white/80 rounded-full text-sm font-semibold mb-4 tracking-wide backdrop-blur-sm">
                        FOUNDER
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Di Balik Velora
                    </h2>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Kenalan dengan orang di balik layar yang membangun Velora
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Photo */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-2xl transform rotate-3"></div>
                                <img
                                    src="/images/founder.jpg"
                                    alt="Mahin Utsman Nawawi"
                                    className="relative rounded-2xl w-full max-h-[500px] object-contain shadow-2xl bg-gray-800"
                                />
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-2">
                                    Mahin Utsman Nawawi, S.H.
                                </h3>
                                <p className="text-primary font-semibold mb-6">Founder & CEO</p>

                                <div className="space-y-4 text-gray-300 leading-relaxed text-justify">
                                    <p>
                                        Seorang Sarjana Hukum yang memiliki passion kuat di bidang teknologi dan pengembangan web. Kombinasi unik antara latar belakang hukum dan keahlian teknis memberikan perspektif holistik dalam membangun solusi digital yang tidak hanya canggih, tapi juga aman dan sesuai regulasi.
                                    </p>
                                    <p>
                                        Berbasis di <strong className="text-white">Pasirjambu, Bandung</strong>, Mahin mendirikan Velora pada tahun 2023 dengan misi sederhana: membantu UMKM dan institusi Indonesia untuk go digital dengan cara yang terjangkau dan berkualitas.
                                    </p>
                                    <p>
                                        Dengan pengalaman menangani berbagai proyek mulai dari website sederhana hingga sistem kompleks seperti manajemen pesantren dan integrasi payment gateway, Mahin memimpin tim Velora untuk selalu mengutamakan kualitas dan kepuasan klien.
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mt-8 mb-8">
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-white">50+</span>
                                        <span className="text-xs text-gray-400">Proyek</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-white">2023</span>
                                        <span className="text-xs text-gray-400">Didirikan</span>
                                    </div>
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-white">24/7</span>
                                        <span className="text-xs text-gray-400">Support</span>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex gap-3">
                                    {socialLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-xl bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-all duration-200 hover:-translate-y-1"
                                            aria-label={link.label}
                                        >
                                            {link.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Founder;
