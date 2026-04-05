import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Banknote, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle,
  Menu,
  X,
  LogOut,
  ChevronDown,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Building2, label: 'Departments', path: '/departments' },
    { icon: Banknote, label: 'Payroll', path: '/payroll' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-100 dark:bg-slate-950 border-r-0 transition-transform duration-300 ease-in-out md:translate-x-0",
          !isSidebarOpen && "-translate-x-full"
        )}
      >
        <div className="h-full flex flex-col py-6">
          <div className="px-6 mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center text-on-primary shadow-sm">
              <Building2 size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-headline leading-none">EMS Portal</h2>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-bold">Enterprise Admin</p>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-4 px-6 py-3 text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "text-blue-700 dark:text-blue-300 font-bold border-r-4 border-blue-700 dark:border-blue-400 bg-blue-50/50 dark:bg-blue-900/20" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                )}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="px-6 mt-auto">
            <div className="bg-surface-container-high rounded-xl p-4">
              <p className="text-xs text-on-surface-variant mb-2">Logged in as</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs font-bold">
                  {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold truncate">{user?.displayName || 'User'}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="w-full mt-4 flex items-center gap-2 px-4 py-2 text-xs font-bold text-error hover:bg-error/10 rounded-lg transition-colors"
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm flex justify-between items-center px-8 h-16">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search the ledger..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary/20 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-500">
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <HelpCircle size={20} />
              </button>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <span className="text-sm font-headline font-bold text-blue-900 dark:text-blue-50">The Architectural Ledger</span>
              <ChevronDown size={14} className="text-slate-400 group-hover:text-primary transition-colors" />
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
