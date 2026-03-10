"use client";
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-white pt-20 pb-10 overflow-hidden relative border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Col */}
                    <div className="col-span-1 md:col-span-2">
                        <Logo className="h-8 mb-6" color="#DE3163" />
                        <p className="text-mid text-sm leading-relaxed max-w-sm">
                            Siscom is driving the future of African digital infrastructure. Our tours provide transparent access to the continent's premier data center assets.
                        </p>
                    </div>

                    {/* Links Col 1 */}
                    <div>
                        <h4 className="text-ink text-[10px] font-black uppercase tracking-[0.2em] mb-6">Explore</h4>
                        <ul className="space-y-4">
                            <li><a href="#tours" className="text-mid hover:text-crimson transition-colors text-sm font-medium">Tour Dates</a></li>
                            <li><a href="#why" className="text-mid hover:text-crimson transition-colors text-sm font-medium">Facilities</a></li>
                            <li><a href="#faq" className="text-mid hover:text-crimson transition-colors text-sm font-medium">FAQ</a></li>
                            <li><a href="https://siscom.africa" className="text-mid hover:text-crimson transition-colors text-sm font-medium">Main Site</a></li>
                        </ul>
                    </div>

                    {/* Links Col 2 */}
                    <div>
                        <h4 className="text-ink text-[10px] font-black uppercase tracking-[0.2em] mb-6">Corporate</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-mid hover:text-crimson transition-colors text-sm font-medium">Privacy Policy</a></li>
                            <li><a href="#" className="text-mid hover:text-crimson transition-colors text-sm font-medium">Terms of Access</a></li>
                            <li><a href="#" className="text-mid hover:text-crimson transition-colors text-sm font-medium">Status Page</a></li>
                            <li><a href="mailto:tours@siscom.africa" className="text-crimson hover:text-crimson-light transition-colors text-sm font-bold">Contact Support</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold uppercase tracking-widest text-muted">
                    <div>© {new Date().getFullYear()} Siscom Africa Infrastructure. All Rights Reserved.</div>
                    <div className="flex gap-8">
                        <a href="#" className="hover:text-ink transition-colors underline decoration-crimson underline-offset-4">LinkedIn</a>
                        <a href="#" className="hover:text-ink transition-colors underline decoration-crimson underline-offset-4">X (Twitter)</a>
                    </div>
                </div>
            </div>

            {/* Subtle decorative accent */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-crimson/5 rounded-full translate-x-32 translate-y-32 blur-3xl pointer-events-none" />
        </footer>
    );
}
