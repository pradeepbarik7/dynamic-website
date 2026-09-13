import { useState, useEffect } from 'react';

interface NavbarProps {
  onGetInTouchClick?: () => void;
}

export default function Navbar({ onGetInTouchClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = ['Labs', 'Studio', 'Openings', 'Shop'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        id="mainframe-header"
        className={`fixed top-0 inset-x-0 z-40 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-black/80 backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        {/* Logo (Left side) */}
        <a
          href="#"
          id="mainframe-logo"
          className="flex flex-row items-center gap-3 cursor-pointer"
        >
          <span className="text-[21px] sm:text-[26px] tracking-tight text-white font-medium select-none">
            Mainframe&reg;
          </span>
          <span className="text-[25px] sm:text-[30px] text-white select-none tracking-[-0.02em] font-medium leading-none mb-1">
            &#10033;
          </span>
        </a>

        {/* Desktop Nav Links (Center) */}
        <nav
          id="desktop-nav"
          className="hidden md:flex flex-row items-center text-[21px] lg:text-[23px] text-white font-normal"
        >
          {navLinks.map((link, index) => (
            <span key={link} className="flex items-center">
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:opacity-60 transition-opacity"
              >
                {link}
              </a>
              {index < navLinks.length - 1 && (
                <span className="opacity-40">,&nbsp;</span>
              )}
            </span>
          ))}
        </nav>

        {/* Desktop CTA (Right) */}
        <div className="hidden md:flex items-center">
          <a
            id="desktop-get-in-touch"
            href="#contact"
            onClick={(e) => {
              if (onGetInTouchClick) {
                e.preventDefault();
                onGetInTouchClick();
              }
            }}
            className="text-[21px] lg:text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
          >
            Get in touch
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none relative z-50 cursor-pointer"
        >
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`w-6 h-[2px] bg-white transition-all duration-300 origin-center ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      {/* Mobile Navigation Overlay */}
      <div
        id="mobile-nav-overlay"
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-md md:hidden flex flex-col justify-center items-center px-8 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-medium tracking-tight text-white hover:opacity-60 transition-opacity"
            >
              {link}
            </a>
          ))}
          <div className="w-12 h-[1px] bg-white/20 my-2" />
          <a
            href="#contact"
            onClick={(e) => {
              setIsMobileMenuOpen(false);
              if (onGetInTouchClick) {
                e.preventDefault();
                onGetInTouchClick();
              }
            }}
            className="text-2xl text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}

