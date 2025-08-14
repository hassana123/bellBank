import { useLocation, Link } from 'react-router-dom';
import { classNames as cn } from '~/utils';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BannerHeaderProps = {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
};

export default function BannerHeader({
  title,
  description,
  breadcrumbs,
  className = '',
}: BannerHeaderProps) {
  const { pathname } = useLocation();

  // Hide banner only on dashboard index
  if (pathname === '/dashboard') return null;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 md:p-6 mb-6 shadow-sm flex items-center justify-between',
        className
      )}
    >
      <div className="z-10">
        <h1 className="text-2xl font-semibold text-foreground mb-1">{title}</h1>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="text-sm text-muted-foreground flex items-center space-x-1">
            {breadcrumbs.map((item, index) => (
              <span key={item.label} className="flex items-center">
                {item.href ? (
                  <Link to={item.href} className="hover:text-primary transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <span className="mx-1 text-gray-400 dark:text-gray-600">{'/'}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="absolute right-0 top-0 h-full w-1/3 flex items-center justify-end pr-6 opacity-70 dark:opacity-50">
        {/* <img
          src="/abstract-star-sphere.png"
          alt="Decorative illustration"
          className="h-full w-auto object-contain"
        /> */}
      </div>
    </div>
  );
}
