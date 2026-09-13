import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ArrowRight, Send, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ProjectInquiryProps {
  services: string[];
  onToggleService: (service: string) => void;
}

export default function ProjectInquiry({ services, onToggleService }: ProjectInquiryProps) {
  const serviceOptions: ServiceCategory[] = ['Brand', 'Digital', 'Campaign', 'Others'];
  const budgetOptions = ['$25k — $50k', '$50k — $100k', '$100k — $250k', '$250k+'];
  const timelineOptions = ['Immediate (< 1 mo)', '1 — 3 Months', '3 — 6 Months', 'Ongoing R&D'];

  const [selectedBudget, setSelectedBudget] = useState<string>('$50k — $100k');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('1 — 3 Months');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientBrief, setClientBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative z-10 w-full bg-black py-28 sm:py-36 px-6 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Direct Inquiries
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-white mb-6">
                Let's engineer something extraordinary.
              </h2>
              <p className="text-neutral-400 text-base leading-relaxed mb-8">
                Tell us about your brand challenge, product launch, or research inquiry. Every brief is assessed by our founding partners within 24 hours.
              </p>

              <div className="space-y-4 pt-4 border-t border-neutral-900">
                <div className="text-xs font-mono text-neutral-500">DIRECT DISPATCH</div>
                <div className="text-lg font-mono text-white">hello@mainframe-studio.io</div>
                <div className="text-xs font-mono text-neutral-500 pt-2">PRESS & MEDIA</div>
                <div className="text-sm font-mono text-neutral-400">press@mainframe-studio.io</div>
              </div>
            </div>

            <div className="hidden lg:block pt-12 border-t border-neutral-900/60 text-xs font-mono text-neutral-600">
              [MAINFRAME STUDIO ARCHIVE — ISO 27001 SECURE ENCRYPTED INQUIRY CHANNEL]
            </div>
          </div>

          {/* Right Column: Interactive Brief Builder */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-16 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium text-white mb-3">
                  Brief Transmitted to Studio
                </h3>
                <p className="text-neutral-400 text-sm max-w-md leading-relaxed mb-8">
                  Thank you, <span className="text-white font-medium">{clientName || 'Partner'}</span>. We have logged your request for{' '}
                  <span className="text-white font-medium">
                    {services.length > 0 ? services.join(', ') : 'Creative Alliances'}
                  </span>
                  . A partner will reach out to <span className="text-white font-medium">{clientEmail}</span> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-neutral-200 transition-colors"
                >
                  Submit Another Brief
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Services (Synchronized with hero!) */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                    01 // What Sort of Service? (Select all that apply)
                  </label>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {serviceOptions.map((option) => {
                      const isSelected = services.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => onToggleService(option)}
                          className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 select-none ${
                            isSelected
                              ? 'bg-white text-black shadow-lg shadow-white/10 ring-2 ring-emerald-400'
                              : 'bg-white text-black hover:bg-neutral-200'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                          <span>{option}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Estimated Budget */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                    02 // Estimated Project Investment
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {budgetOptions.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setSelectedBudget(budget)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all text-center cursor-pointer ${
                          selectedBudget === budget
                            ? 'bg-white text-black font-semibold shadow-md'
                            : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Timeline */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
                    03 // Target Timeline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {timelineOptions.map((timeline) => (
                      <button
                        key={timeline}
                        type="button"
                        onClick={() => setSelectedTimeline(timeline)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all text-center cursor-pointer ${
                          selectedTimeline === timeline
                            ? 'bg-white text-black font-semibold shadow-md'
                            : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white'
                        }`}
                      >
                        {timeline}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Contact Info & Brief */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Your Name / Studio
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="elena@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                    Project Brief & Objectives
                  </label>
                  <textarea
                    rows={4}
                    value={clientBrief}
                    onChange={(e) => setClientBrief(e.target.value)}
                    placeholder="Describe your vision, product scope, or launch timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xl disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Encrypting & Dispatching Brief...</span>
                  ) : (
                    <>
                      <span>Transmit Project Brief</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
