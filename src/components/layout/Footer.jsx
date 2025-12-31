import { Phone, Linkedin, Github } from 'lucide-react';

// TikTok icon (not in lucide-react)
const TikTokIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
);

const socialLinks = [
    {
        name: 'WhatsApp',
        href: 'https://wa.me/6281320442174',
        icon: Phone,
        hoverColor: 'hover:bg-green-500'
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mahin-utsman-nawawi-s-h-3b4758379/',
        icon: Linkedin,
        hoverColor: 'hover:bg-blue-600'
    },
    {
        name: 'TikTok',
        href: 'https://www.tiktok.com/@velora002',
        icon: TikTokIcon,
        hoverColor: 'hover:bg-gray-900'
    },
    {
        name: 'GitHub',
        href: 'https://github.com/mahinutsmannawawi20-svg',
        icon: Github,
        hoverColor: 'hover:bg-gray-800'
    },
];

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/images/logo.png" alt="Velora" className="h-10 w-auto" />
                        <span className="text-2xl font-extrabold text-gray-900">Velora</span>
                    </div>
                    <p className="text-gray-600 mb-6 max-w-sm">
                        Mitra transformasi digital terpercaya untuk bisnis Anda. Kami menghadirkan solusi teknologi inovatif untuk mendorong pertumbuhan bisnis di era digital.
                    </p>
                    <div className="text-gray-600 mb-6 flex flex-col gap-2 text-sm">
                        <p>📍 Jakarta, Indonesia</p>
                        <p>📧 velora@gmail.com</p>
                    </div>
                    <div className="flex gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                                className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 ${social.hoverColor} hover:text-white transition-colors`}
                            >
                                <social.icon className="w-5 h-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Layanan</h4>
                    <ul className="space-y-2">
                        <li><a href="#services" className="text-gray-600 hover:text-primary">Deploy Website</a></li>
                        <li><a href="#services" className="text-gray-600 hover:text-primary">Payment Gateway</a></li>
                        <li><a href="#featured" className="text-gray-600 hover:text-primary">Sistem Pesantren</a></li>
                        <li><a href="#services" className="text-gray-600 hover:text-primary">Maintenance</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">Perusahaan</h4>
                    <ul className="space-y-2">
                        <li><a href="#tentang" className="text-gray-600 hover:text-primary">Tentang Kami</a></li>
                        <li><a href="#portfolio" className="text-gray-600 hover:text-primary">Portfolio</a></li>
                        <li><a href="#workflow" className="text-gray-600 hover:text-primary">Cara Kerja</a></li>
                        <li><a href="#contact" className="text-gray-600 hover:text-primary">Kontak</a></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Velora. All rights reserved.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#faq" className="hover:text-primary">FAQ</a>
                    <a href="#contact" className="hover:text-primary">Hubungi Kami</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
