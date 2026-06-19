'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '@/components/shared/SectionHeader';

type Project = {
  id: string; title: string; category: string; tags: string[];
  description: string; live: boolean; live_url?: string;
  details: {
    goal: string; problem: string; solution: string;
    features: string[]; technologies: string[]; impact: string;
  };
};

const PLACEHOLDER_COLORS: Record<string, string> = {
  'lele-creative': 'from-purple-900/40 to-pink-900/30',
  'rm-quality': 'from-blue-900/40 to-cyan-900/30',
  'ot-data-centers': 'from-slate-800/60 to-blue-900/30',
  glasswing: 'from-green-900/40 to-teal-900/30',
  'ac-sports': 'from-orange-900/40 to-red-900/30',
};

const PROJECT_IMAGES: Record<string, string[]> = {
  glasswing: [
    '/images/projects/project-glasswing.webp',
    '/images/projects/project-glasswing2.webp',
    '/images/projects/project-glasswing3.webp',
    '/images/projects/project-glasswing4.webp',
    '/images/projects/project-glasswing5.webp',
    '/images/projects/project-glasswing6.webp',
  ],
  'lele-creative': [
    '/images/projects/project-lele-creative-studio.webp',
    '/images/projects/project-lele-creative-studio1.webp',
    '/images/projects/project-lele-creative-studio2.webp',
    '/images/projects/project-lele-creative-studio3.webp',
    '/images/projects/project-lele-creative-studio4.webp',
    '/images/projects/project-lele-creative-studio5.webp',
  ],
  'rm-quality': [
    '/images/projects/project-rm-quality-service.webp',
    '/images/projects/project-rm-quality-service1.webp',
    '/images/projects/project-rm-quality-service2.webp',
    '/images/projects/project-rm-quality-service3.webp',
    '/images/projects/project-rm-quality-service4.webp',
    '/images/projects/project-rm-quality-service5.webp',
  ],
  'ot-data-centers': [
    '/images/projects/project-ot-data-center.webp',
    '/images/projects/project-ot-data-center1.webp',
    '/images/projects/project-ot-data-center2.webp',
    '/images/projects/project-ot-data-center3.webp',
    '/images/projects/project-ot-data-center4.webp',
    '/images/projects/project-ot-data-center5.webp',
    '/images/projects/project-ot-data-center6.webp',
    '/images/projects/project-ot-data-center7.webp',
    '/images/projects/project-ot-data-center8.webp',
  ],
  'ac-sports': [
    '/images/projects/project-ac-sports.webp',
    '/images/projects/project-ac-sports1.webp',
    '/images/projects/project-ac-sports2.webp',
    '/images/projects/project-ac-sports3.webp',
    '/images/projects/project-ac-sports4.webp',
  ],
  'cafe-kosoalt': [
  '/images/projects/project-cafe-kosoalt.webp',
  '/images/projects/project-cafe-kosoalt1.webp',
  '/images/projects/project-cafe-kosoalt2.webp',
  '/images/projects/project-cafe-kosoalt3.webp',
  '/images/projects/project-cafe-kosoalt4.webp',
  '/images/projects/project-cafe-kosoalt5.webp',
  '/images/projects/project-cafe-kosoalt6.webp',
],
};

export function ProjectsSection() {
  const t = useTranslations('projects');
  const filters = t.raw('filters') as string[];
  const items = t.raw('items') as Project[];

  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const filteredItems =
    activeFilter === filters[0]
      ? items
      : items.filter((p) => p.category === activeFilter || p.tags.includes(activeFilter));

  const selectedProjectImages = selectedProject ? PROJECT_IMAGES[selectedProject.id] ?? [] : [];
  const selectedProjectImage = selectedProjectImages[selectedImageIndex] ?? selectedProjectImages[0];

  const showPreviousExpandedImage = () => {
    if (!expandedImage || selectedProjectImages.length <= 1) return;

    const currentIndex = selectedProjectImages.indexOf(expandedImage);
    const previousIndex = currentIndex <= 0 ? selectedProjectImages.length - 1 : currentIndex - 1;

    setSelectedImageIndex(previousIndex);
    setExpandedImage(selectedProjectImages[previousIndex]);
  };

  const showNextExpandedImage = () => {
    if (!expandedImage || selectedProjectImages.length <= 1) return;

    const currentIndex = selectedProjectImages.indexOf(expandedImage);
    const nextIndex = currentIndex === -1 || currentIndex >= selectedProjectImages.length - 1 ? 0 : currentIndex + 1;

    setSelectedImageIndex(nextIndex);
    setExpandedImage(selectedProjectImages[nextIndex]);
  };

  return (
    <section id="projects" className="section-padding bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mt-10 mb-8" role="tablist" aria-label="Project filter">
          {filters.map((filter) => (
            <button
              key={filter}
              role="tab"
              aria-selected={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                activeFilter === filter
                  ? 'bg-accent-green text-bg-primary'
                  : 'glass-card text-text-secondary hover:text-text-primary hover:border-border-strong'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          role="tabpanel"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col cursor-pointer group"
                onClick={() => {
                  setSelectedProject(project);
                  setSelectedImageIndex(0);
                }}
              >
                {/* Project image */}
                <div
                  className={`h-44 bg-gradient-to-br ${PLACEHOLDER_COLORS[project.id] ?? 'from-bg-secondary to-bg-primary'} relative overflow-hidden`}
                >
                  {PROJECT_IMAGES[project.id]?.[0] ? (
                    <Image
                      src={PROJECT_IMAGES[project.id][0]}
                      alt={`${project.title} project preview`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 dot-grid opacity-30" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-bg-primary/10 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-1 text-xs font-medium glass-card rounded-full border border-border">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <div className="w-8 h-8 rounded-lg bg-bg-primary/60 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight size={14} className="text-accent-green" />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-3 flex-1">
                  <h3 className="font-heading font-semibold text-text-primary">{project.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{project.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] text-text-secondary bg-bg-primary border border-border-subtle rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setSelectedImageIndex(0);
                      }}
                      className="flex-1 py-2 text-xs font-semibold text-text-primary border border-border rounded-lg hover:border-accent-green/30 hover:text-accent-green transition-all duration-200 focus-ring"
                    >
                      {t('view_case')}
                    </button>
                    {project.live ? (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-accent-green border border-accent-green/30 rounded-lg hover:bg-accent-green/10 transition-all duration-200 focus-ring"
                        aria-label={`${project.title} - ${t('live_demo')}`}
                      >
                        <Github size={11} aria-hidden="true" /> {t('live_demo')}
                      </a>
                    ) : (
                      <span className="flex items-center gap-1 px-3 py-2 text-xs text-text-secondary border border-border-subtle rounded-lg cursor-default">
                        <Github size={11} aria-hidden="true" /> {t('demo_soon')}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-primary/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} case study`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className={`h-48 bg-gradient-to-br ${PLACEHOLDER_COLORS[selectedProject.id] ?? 'from-bg-secondary to-bg-primary'} relative overflow-hidden`}>
                {selectedProjectImage ? (
                  <button
                    type="button"
                    className="absolute inset-0 cursor-zoom-in focus-ring"
                    onClick={() => setExpandedImage(selectedProjectImage)}
                    aria-label={`Expand ${selectedProject.title} project image`}
                  >
                    <Image
                      src={selectedProjectImage}
                      alt={`${selectedProject.title} project preview`}
                      fill
                      sizes="(min-width: 768px) 672px, 100vw"
                      className="object-cover object-top"
                    />
                  </button>
                ) : (
                  <div className="absolute inset-0 dot-grid opacity-30" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/85 via-bg-primary/15 to-bg-primary/10" />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-bg-primary/60 flex items-center justify-center hover:bg-bg-primary/80 transition-colors focus-ring"
                  aria-label="Close modal"
                >
                  <X size={16} aria-hidden="true" />
                </button>
                <div className="absolute bottom-4 left-6">
                  <span className="px-3 py-1 text-xs font-medium glass-card rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <h2 className="font-heading font-bold text-2xl text-text-primary">{selectedProject.title}</h2>

                {selectedProjectImages.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
                        Project Gallery
                      </div>
                      <button
                        type="button"
                        onClick={() => setExpandedImage(selectedProjectImage)}
                        className="text-xs font-semibold text-accent-green hover:text-accent-green/80 transition-colors focus-ring rounded-sm"
                      >
                        View larger
                      </button>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {selectedProjectImages.map((image, index) => (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setSelectedImageIndex(index)}
                          className={`relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border transition-all duration-200 focus-ring ${
                            selectedImageIndex === index
                              ? 'border-accent-green opacity-100'
                              : 'border-border-subtle opacity-60 hover:opacity-100'
                          }`}
                          aria-label={`View image ${index + 1} for ${selectedProject.title}`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedProject.title} thumbnail ${index + 1}`}
                            fill
                            sizes="112px"
                            className="object-cover object-top"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Goal', value: selectedProject.details.goal },
                    { label: 'Challenge', value: selectedProject.details.problem },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-bg-secondary rounded-xl p-4">
                      <div className="text-xs font-semibold text-accent-green mb-1 uppercase tracking-wide">{label}</div>
                      <p className="text-text-secondary text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Solution</div>
                  <p className="text-text-secondary text-sm leading-relaxed">{selectedProject.details.solution}</p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">Key Features</div>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {selectedProject.details.features.map((f) => (
                      <li key={f} className="text-sm text-text-secondary flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-accent-green shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.details.technologies.map((tech) => (
                    <span key={tech} className="px-2.5 py-1 text-xs text-accent-blue bg-accent-blue/10 border border-accent-blue/20 rounded-lg">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="bg-accent-green/10 border border-accent-green/20 rounded-xl p-4">
                  <div className="text-xs font-semibold text-accent-green uppercase tracking-wide mb-1">Business Impact</div>
                  <p className="text-text-secondary text-sm">{selectedProject.details.impact}</p>
                </div>

                <a
                  href="#contact"
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-accent-green text-bg-primary font-bold rounded-xl hover:bg-accent-green/90 transition-all duration-200 hover:shadow-btn-primary focus-ring"
                >
                  {t('request_similar')}
                  <ArrowRight size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded project image */}
      <AnimatePresence>
        {expandedImage && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-bg-primary/90 backdrop-blur-md"
            onClick={() => setExpandedImage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} expanded project image`}
          >
            <button
              type="button"
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-bg-primary/70 flex items-center justify-center hover:bg-bg-primary transition-colors focus-ring"
              aria-label="Close expanded image"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-6xl aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-bg-secondary"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={expandedImage}
                alt={`${selectedProject.title} expanded project preview`}
                fill
                sizes="100vw"
                className="object-contain"
              />

              {selectedProjectImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousExpandedImage}
                    className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-bg-primary/70 text-text-primary backdrop-blur-md transition-all duration-200 hover:bg-bg-primary hover:border-accent-green/40 focus-ring sm:left-4 sm:h-11 sm:w-11"
                    aria-label="View previous project image"
                  >
                    <ChevronLeft size={22} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={showNextExpandedImage}
                    className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-bg-primary/70 text-text-primary backdrop-blur-md transition-all duration-200 hover:bg-bg-primary hover:border-accent-green/40 focus-ring sm:right-4 sm:h-11 sm:w-11"
                    aria-label="View next project image"
                  >
                    <ChevronRight size={22} aria-hidden="true" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-bg-primary/70 px-3 py-1 text-xs font-semibold text-text-secondary backdrop-blur-md">
                    {(selectedProjectImages.indexOf(expandedImage) === -1 ? selectedImageIndex : selectedProjectImages.indexOf(expandedImage)) + 1}
                    <span className="mx-1 text-text-muted">/</span>
                    {selectedProjectImages.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
