// src/components/ui/BannerHeader.tsx


import { useLocation } from 'react-router-dom';
import { classNames as cn } from '~/utils';

type BannerHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function BannerHeader({
  title,
  description,
  className = '',
}: BannerHeaderProps) {
  const { pathname } = useLocation();

  // Hide banner only on dashboard index
  if (pathname === '/dashboard') return null;

  return (
    <div
      className={cn(
        'bg-gray-100 rounded-2xl p-4 md:p-6 mb-6 shadow-sm',
        className
      )}
    >
      <h1 className="text-2xl font-semibold text-text-base">{title}</h1>
      {description && (
        <p className="text-sm text-text-muted mt-1">{description}</p>
      )}
    </div>
  );
}
