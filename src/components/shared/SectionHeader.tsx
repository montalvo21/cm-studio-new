'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(centered ? 'text-center' : '', 'max-w-2xl', centered ? 'mx-auto' : '', className)}
    >
      <h2 className="font-heading font-bold text-3xl sm:text-4xl text-text-primary leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-text-secondary leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}
