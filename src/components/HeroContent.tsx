import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, X } from 'lucide-react';
import { useTypewriter } from '../hooks/useTypewriter';

const SERVICE_OPTIONS = ['Brand', 'Digital', 'Campaign', 'Others'] as const;

interface HeroContentProps {
  onInquire?: (selected: string[]) => void;
}

export default function HeroContent({ onInquire }: HeroContentProps) {
  const { displayed, done } = useTypewriter("we'd love to\nhear from you!", 38, 600);
  const [services, setServices] = useState<string[]>([]);
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);

  const toggleService = (option: string) => {
    setServices((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleLetsGo = () => {
    if (onInquire) {
      onInquire(services);
    }
    setSubmittedModalOpen(true);
  };

  return (
    <div className="relative z-10 flex flex-col order-first lg:order-none w-full bg-black lg:bg-transparent pb-8 lg:pb-0 lg:min-h-screen">
      <main
        id="spade-hero"
        className="w-full max-w-7xl mx-auto px-6 py-12 flex-1 flex flex-col justify-center"
      >
        <div className="max-w-3xl lg:max-w-xl xl:max-w-2xl">
          {/* Headline with Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[76px] font-normal tracking-tight text-white leading-[1.08] mb-8 select-none w-full whitespace-pre-wrap">
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" />
              )}
            </h1>
          </motion.div>

          {/* Secondary Description Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-normal mb-14 max-w-2xl">
              Whether you have questions, feedback, <br /> drop us a message and we'll get back to you as soon as possible.
            </p>
          </motion.div>

          {/* Service Selection Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full"
          >
            <h2 className="text-2xl font-medium tracking-tight mb-2 text-white">
              What sort of service?
            </h2>
            <p className="text-neutral-400 mb-8 text-base">
              Select all that apply
            </p>

            {/* Service Pills Container: Brand, Digital, Campaign, Others retain black text */}
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
              {SERVICE_OPTIONS.map((option) => {
                const isSelected = services.includes(option);
                return (
                  <motion.button
                    key={option}
                    id={`service-pill-${option.toLowerCase()}`}
                    type="button"
                    onClick={() => toggleService(option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`px-6 py-3 rounded-full text-base sm:text-lg font-medium cursor-pointer transition-all duration-200 flex items-center gap-2 select-none ${
                      isSelected
                        ? 'bg-white text-black shadow-lg shadow-white/10 ring-2 ring-emerald-400 transform'
                        : 'bg-white text-black border border-white hover:bg-neutral-200'
                    }`}
                  >
                    <AnimatePresence>
                      {isSelected && (
                        <motion.span
                          key="check"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="inline-flex items-center justify-center text-black"
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="text-black font-medium">{option}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Contingent Feedback Status Banner */}
            <div className="min-h-[72px] mt-4">
              <AnimatePresence mode="wait">
                {services.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pt-3"
                  >
                    <p className="italic text-xs text-neutral-500">
                      Please click to select services above.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="overflow-hidden pt-3"
                  >
                    <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md shadow-black/40">
                      <div className="text-sm sm:text-base text-neutral-300">
                        <span className="font-normal text-neutral-400">Ready to inquire about: </span>
                        <span className="font-semibold text-white">
                          {services.join(', ')}
                        </span>
                      </div>
                      <button
                        id="lets-go-btn"
                        type="button"
                        onClick={handleLetsGo}
                        className="inline-flex items-center gap-2 self-start sm:self-auto text-emerald-400 uppercase text-xs font-semibold tracking-wider cursor-pointer hover:text-emerald-300 transition-all px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20"
                      >
                        <span>Let's Go</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Inquiry Confirmation Modal */}
      <AnimatePresence>
        {submittedModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
            onClick={() => setSubmittedModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 text-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-neutral-800"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold">
                  <Check className="w-5 h-5" />
                </div>
                <button
                  type="button"
                  onClick={() => setSubmittedModalOpen(false)}
                  className="text-neutral-400 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-2xl font-medium tracking-tight text-white mb-2">
                Inquiry Initiated
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                You've selected{' '}
                <span className="font-semibold text-white">
                  {services.join(', ')}
                </span>
                . Our studio team is ready to review your brief and connect with you shortly.
              </p>

              <button
                type="button"
                onClick={() => setSubmittedModalOpen(false)}
                className="w-full py-3 bg-white text-black font-semibold rounded-xl text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
