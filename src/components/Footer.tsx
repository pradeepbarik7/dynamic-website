import { useState, FormEvent } from 'react';
import { ArrowUpRight, Check, Send } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 w-full bg-black text-white pt-24 pb-16 px-6 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-neutral-900">
          {/* Brand & Manifesto snippet */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl sm:text-4xl tracking-tight text-white font-medium select-none">
                  Mainframe&reg;
                </span>
                <span className="text-3xl sm:text-4xl text-white select-none leading-none mb-1">
                  &#10033;
                </span>
              </div>
              <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed">
                A contemporary creative technology studio and digital consultancy crafting 3D character worlds, spatial systems, and enduring brand identities.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-neutral-900/60 flex items-center gap-6 text-xs font-mono text-neutral-500">
              <span>TOKYO 35.6580° N, 139.7016° E</span>
              <span>•</span>
              <span>LONDON 51.5074° N, 0.1278° W</span>
              <span>•</span>
              <span>NYC 40.7128° N, 74.0060° W</span>
            </div>
          </div>

          {/* Quick Links & Dispatch Newsletter */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3 text-sm font-mono text-neutral-300">
              <li>
                <a href="#studio" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Studio Archive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#labs" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Mainframe Labs</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#openings" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Studio Openings</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Editions & Shop</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Project Inquiries</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Dispatches */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-4">
              Dispatches From Lab
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed mb-4">
              Occasional dispatches on 3D craft, shader mathematics, and limited edition drops. Zero marketing noise.
            </p>

            {subscribed ? (
              <div className="py-2.5 px-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Subscription Confirmed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2.5 rounded-xl bg-white text-black text-xs font-mono font-semibold hover:bg-neutral-200 transition-colors cursor-pointer shrink-0"
                >
                  Join
                </button>
              </form>
            )}

            <div className="mt-8">
              <h5 className="text-[11px] font-mono uppercase text-neutral-500 mb-2">Social Signals</h5>
              <div className="flex gap-4 text-xs font-mono text-neutral-400">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X (Twitter)</a>
                <a href="https://vimeo.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Vimeo</a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} Mainframe Creative Technologies Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
