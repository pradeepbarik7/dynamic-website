import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X, Check, Briefcase, MapPin, Send } from 'lucide-react';
import { STUDIO_OPENINGS } from '../data/studioData';
import { StudioOpening } from '../types';

export default function OpeningsSection() {
  const [selectedRole, setSelectedRole] = useState<StudioOpening | null>(null);
  const [applyingRole, setApplyingRole] = useState<StudioOpening | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleApply = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setApplyingRole(null);
      setSelectedRole(null);
      setApplicantName('');
      setApplicantEmail('');
      setPortfolioUrl('');
    }, 2500);
  };

  return (
    <section id="openings" className="relative z-10 w-full bg-black py-24 sm:py-32 px-6 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Talent & Alliances
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Studio Openings
            </h2>
            <p className="mt-4 text-neutral-400 text-base max-w-xl">
              We look for obsessives who operate at the bleeding edge of 3D craft, code architecture, and contemporary culture.
            </p>
          </div>

          <div className="text-xs font-mono text-neutral-500 uppercase tracking-wider self-start md:self-auto">
            [4 ACTIVE POSITIONS ACROSS TOKYO, LONDON, NYC]
          </div>
        </div>

        {/* Roles List */}
        <div className="divide-y divide-neutral-900 border-y border-neutral-900">
          {STUDIO_OPENINGS.map((opening) => (
            <div
              key={opening.id}
              onClick={() => setSelectedRole(opening)}
              className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:px-4 transition-all duration-300 rounded-2xl hover:bg-neutral-950"
            >
              <div className="max-w-xl">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-2">
                  <span>{opening.department}</span>
                  <span>•</span>
                  <span>{opening.experience}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-medium text-white group-hover:text-neutral-200 transition-colors">
                  {opening.role}
                </h3>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 sm:gap-10">
                <div className="flex items-center gap-2 text-sm text-neutral-400 font-mono">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  <span>{opening.location}</span>
                </div>

                <button
                  type="button"
                  className="px-5 py-2 rounded-full border border-neutral-800 text-xs font-mono uppercase tracking-wider text-white group-hover:bg-white group-hover:text-black transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>View Role</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Details Modal */}
      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedRole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white"
            >
              <button
                type="button"
                onClick={() => setSelectedRole(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                  <span>{selectedRole.department}</span>
                  <span>•</span>
                  <span>{selectedRole.location}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{selectedRole.type}</span>
                </div>
                <h3 className="text-3xl font-medium tracking-tight text-white">
                  {selectedRole.role}
                </h3>
              </div>

              <p className="text-neutral-300 text-sm leading-relaxed mb-8">
                {selectedRole.overview}
              </p>

              <div className="space-y-6 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                    Core Responsibilities
                  </h4>
                  <ul className="space-y-2">
                    {selectedRole.responsibilities.map((resp, i) => (
                      <li key={i} className="text-sm text-neutral-300 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-500 mt-2 shrink-0" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                    Ideal Background & Skills
                  </h4>
                  <ul className="space-y-2">
                    {selectedRole.requirements.map((req, i) => (
                      <li key={i} className="text-sm text-neutral-300 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-neutral-900 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setApplyingRole(selectedRole)}
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>Apply for this Role</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Application Form Modal */}
      <AnimatePresence>
        {applyingRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setApplyingRole(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setApplyingRole(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Direct Studio Application
                </span>
                <h3 className="text-2xl font-medium tracking-tight mt-1">
                  {applyingRole.role}
                </h3>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  {applyingRole.location} • {applyingRole.department}
                </p>
              </div>

              {isSubmitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-medium text-white mb-2">Application Transmitted</h4>
                  <p className="text-sm text-neutral-400 max-w-sm">
                    Thank you {applicantName}. Our leadership team reviews portfolios every Monday and will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Kai Takahashi"
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
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      placeholder="kai@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                      Portfolio / ArtStation / GitHub URL
                    </label>
                    <input
                      type="url"
                      required
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
