'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface AvailabilityBadgeProps {
  state: 'available' | 'booking';
  className?: string;
}

export function AvailabilityBadge({ state, className }: AvailabilityBadgeProps) {
  const t = useTranslations('hero');
  const isAvailable = state === 'available';

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium w-fit',
        isAvailable
          ? 'bg-accent-green/10 border-accent-green/25 text-accent-green'
          : 'bg-accent-amber/10 border-accent-amber/25 text-accent-amber',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <span
        className={cn(
          'w-2 h-2 rounded-full',
          isAvailable
            ? 'bg-accent-green animate-badge-pulse'
            : 'bg-accent-amber animate-pulse'
        )}
        aria-hidden="true"
      />
      {isAvailable ? t('badge_available') : t('badge_booking')}
    </div>
  );
}
