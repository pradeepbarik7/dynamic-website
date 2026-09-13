import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Check, X, Sparkles, Layers, Award } from 'lucide-react';
import { FEATURED_PROJECTS } from '../data/studioData';
import { Project } from '../types';

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Brand', 'Digital', 'Campaign', 'Others'];

  const filteredProjects =
    activeCategory === 'All'
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="studio" className="relative z-10 w-full bg-black py-24 sm:py-32 px-6 border-b border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Selected Works [2025—2026]
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white">
              Studio Archive
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-black shadow-lg shadow-white/10'
                    : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative bg-neutral-950 border border-neutral-900 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-neutral-900/50 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Cover */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={project.imageThumbnail}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-neutral-800">
                      {project.category}
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-4 right-4">
                    <span className="text-xs font-mono text-neutral-400">
                      /{project.year}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1">
                      Client: {project.client}
                    </div>
                    <h3 className="text-2xl font-medium tracking-tight text-white group-hover:text-neutral-200 transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <p className="mt-3 text-sm text-neutral-400 leading-relaxed line-clamp-2">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tags & Metric highlight */}
                  <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono">
                    <div className="flex gap-2">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-neutral-500">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-emerald-400 font-medium">
                      {project.metrics[0].value} {project.metrics[0].label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl text-white"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest mb-2">
                  <span>{selectedProject.client}</span>
                  <span>•</span>
                  <span>{selectedProject.year}</span>
                  <span>•</span>
                  <span className="text-emerald-400">{selectedProject.category}</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-medium tracking-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Cover Image */}
              <div className="w-full aspect-video rounded-2xl overflow-hidden mb-8 border border-neutral-900 bg-neutral-900">
                <img
                  src={selectedProject.imageThumbnail}
                  alt={selectedProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 mb-8">
                {selectedProject.metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                      {metric.value}
                    </span>
                    <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 mt-1">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Narrative Sections */}
              <div className="space-y-6 text-sm sm:text-base leading-relaxed text-neutral-300">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    The Challenge
                  </h4>
                  <p>{selectedProject.challenge}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
                    The Solution & Outcome
                  </h4>
                  <p>{selectedProject.outcome}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-500 mb-3">
                    Deliverables
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-10 pt-6 border-t border-neutral-900 flex justify-between items-center">
                <span className="text-xs font-mono text-neutral-500">
                  Mainframe Archive Ref #{selectedProject.id.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
