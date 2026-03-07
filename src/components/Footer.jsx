import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-ink py-16">
            <div className="max-w-7xl mx-auto px-6 text-center">
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <a href="#">
                        <Logo className="h-8 md:h-10 opacity-70 hover:opacity-100 transition-opacity" color="white" />
                    </a>
                </div>

                {/* Info */}
                <div className="text-sm text-white/50 mb-3">
                    siscom.africa · Nairobi, Kenya · © {new Date().getFullYear()}
                </div>

                {/* Contact */}
                <a
                    href="mailto:tours@siscom.africa"
                    className="text-sm text-crimson hover:text-crimson-light transition-colors font-semibold"
                >
                    tours@siscom.africa
                </a>
            </div>
        </footer>
    );
}
