import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, CreditCard, LinkIcon, FileText, Building2, Send, ArrowUpRight, Users, Key, Webhook, FileSearch, User, UserPlus, Settings, LogOut, HelpCircle } from 'lucide-react';
import * as routes from '~/config/routes';
import { LOGO_IMAGE } from '~/config/static';

const menuSections = [
  {
    title: 'OVERVIEW',
    items: [
      {
        title: 'Dashboard',
        icon: LayoutDashboard,
        path: routes.DASHBOARD_PAGE,
      },
      {
        title: 'Wallet',
        icon: Wallet,
        path: routes.DASHBOARD_WALLET_PAGE,
      },
    ]
  },
  {
    title: 'COLLECTIONS',
    items: [
      {
        title: 'Transactions',
        icon: CreditCard,
        path: routes.DASHBOARD_TRANSACTIONS_PAGE,
      },
      {
        title: 'Payment Links',
        icon: LinkIcon,
        path: routes.DASHBOARD_PAYMENT_LINKS_PAGE,
      },
      {
        title: 'Invoices',
        icon: FileText,
        path: routes.DASHBOARD_INVOICES_PAGE,
      },
      {
        title: 'Virtual Accounts',
        icon: Building2,
        path: routes.DASHBOARD_VIRTUAL_ACCOUNTS_PAGE,
      },
    ]
  },
  {
    title: 'PAYOUTS',
    items: [
      {
        title: 'Payouts',
        icon: Send,
        path: routes.DASHBOARD_PAYOUTS_PAGE,
      },
      {
        title: 'Transfers',
        icon: ArrowUpRight,
        path: routes.DASHBOARD_TRANSFERS_PAGE,
      },
    ]
  },
  {
    title: 'CUSTOMERS',
    items: [
      {
        title: 'Customers',
        icon: Users,
        path: routes.DASHBOARD_CUSTOMERS_PAGE,
      },
    ]
  },
  {
    title: 'DEVELOPER',
    items: [
      {
        title: 'API Keys',
        icon: Key,
        path: routes.DASHBOARD_API_KEYS_PAGE,
      },
      {
        title: 'Webhooks',
        icon: Webhook,
        path: routes.DASHBOARD_WEBHOOKS_PAGE,
      },
      {
        title: 'Logs',
        icon: FileSearch,
        path: routes.DASHBOARD_LOGS_PAGE,
      },
    ]
  },
  {
    title: 'SETTINGS',
    items: [
      {
        title: 'Profile',
        icon: User,
        path: routes.DASHBOARD_PROFILE_PAGE,
      },
      {
        title: 'Team',
        icon: UserPlus,
        path: routes.DASHBOARD_TEAM_PAGE,
      },
      {
        title: 'Settings',
        icon: Settings,
        path: routes.DASHBOARD_SETTINGS_PAGE,
      },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === routes.DASHBOARD_PAGE) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-white h-screen sticky top-0 border-r border-gray-100 flex flex-col shadow-sm">
      {/* Header */}
      <div className="px-6 py-6 border-b border-gray-100">
        <img src={LOGO_IMAGE} alt='BellCollect Logo'/>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent px-4 py-6">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className={sectionIndex > 0 ? 'mt-8' : ''}>
            <div className="text-xs font-bold text-gray-500 mb-4 px-3 tracking-wider">
              {section.title}
            </div>
            <div className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                      active
                        ? 'bg-primary text-white shadow-lg shadow-primary/25'
                        : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-105'}`} />
                    <span className="font-semibold">{item.title}</span>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-100 space-y-2">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-200 w-full group">
          <HelpCircle className="w-5 h-5 group-hover:scale-105 transition-transform" />
          <span className="font-semibold">Help & Support</span>
        </button>
        
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-200 w-full group">
          <LogOut className="w-5 h-5 group-hover:scale-105 transition-transform" />
          <span className="font-semibold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
