'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';

type Metric = {
  value: string;
  label: string;
};

function AnimatedMetricValue({ value, isInView }: { value: string; isInView: boolean }) {
  const numericMatch = value.match(/^(\d+)(.*)$/);
  const target = numericMatch ? Number(numericMatch[1]) : null;
  const suffix = numericMatch ? numericMatch[2] : '';
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target === null) return;

    let frameId: number;
    const duration = 1100;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(easedProgress * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, target]);

  if (target === null) {
    return <>{value}</>;
  }

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function TrustBar() {
  const t = useTranslations('trust');
  const metrics = t.raw('metrics') as Metric[];
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="py-12 bg-bg-secondary border-y border-border"
      aria-label="Trust metrics"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5 }}
          className="text-center text-text-secondary text-sm mb-8 font-medium"
        >
          {t('title')}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={`${metric.value}-${metric.label}`}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center rounded-2xl border border-border-subtle bg-bg-primary/30 px-4 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-green/30 hover:bg-accent-green/5"
            >
              <div className="font-heading font-bold text-3xl md:text-4xl text-gradient-green mb-1 tabular-nums">
                <AnimatedMetricValue value={metric.value} isInView={isInView} />
              </div>
              <div className="text-text-secondary text-sm transition-colors duration-300 group-hover:text-text-primary">
                {metric.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
