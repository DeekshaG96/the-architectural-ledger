import { 
  Search, 
  Plus, 
  ArrowRight, 
  PlusCircle,
  Code,
  Megaphone,
  Landmark,
  Settings,
  Users,
  Building2
} from 'lucide-react';
import { DEPARTMENTS } from '../constants';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  code: Code,
  megaphone: Megaphone,
  bank: Landmark,
  settings: Settings,
  users: Users,
};

const departmentThemeClasses: Record<string, string> = {
  primary: 'bg-primary-container/20 text-primary',
  secondary: 'bg-secondary-container/20 text-secondary',
  tertiary: 'bg-tertiary-container/20 text-tertiary',
  'surface-variant': 'bg-surface-variant/50 text-on-surface-variant',
  'primary-fixed-dim': 'bg-primary-fixed-dim/40 text-on-primary-fixed-variant',
};

export function Departments() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Editorial Header Section */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block ml-1">Organizational Structure</span>
            <h1 className="text-5xl font-extrabold font-headline text-on-background tracking-tighter">Departments</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                className="bg-surface-container-lowest border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-4 py-3 w-64 md:w-80 text-sm font-medium transition-all outline-none editorial-shadow" 
                placeholder="Search departments..." 
                type="text"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={20} />
            </div>
            <button className="bg-primary text-on-primary px-6 py-3 rounded flex items-center gap-2 hover:bg-primary-dim transition-all shadow-lg active:scale-95">
              <Plus size={20} />
              <span className="font-bold text-sm">Add New Department</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bento-Style Grid for Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEPARTMENTS.map((dept, i) => {
          const Icon = iconMap[dept.icon] || Building2;
          const themeClass = departmentThemeClasses[dept.color] || departmentThemeClasses.primary;
          return (
            <motion.div 
              key={dept.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest editorial-shadow rounded p-8 flex flex-col justify-between group hover:translate-y-[-4px] transition-transform duration-300"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center", themeClass)}>
                    <Icon size={32} />
                  </div>
                  <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold tracking-tight">Active</span>
                </div>
                <h3 className="text-2xl font-bold font-headline text-on-background mb-1">{dept.name}</h3>
                <p className="text-sm text-secondary mb-6 font-medium">{dept.description}</p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <img 
                      src={dept.managerAvatar} 
                      alt={dept.manager} 
                      className="w-8 h-8 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">Manager</p>
                      <p className="text-sm font-bold text-on-background">{dept.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                      <Users size={16} />
                    </div>
                    <div>
                      <p className="text-xs text-outline font-bold uppercase">Workforce</p>
                      <p className="text-sm font-bold text-on-background">{dept.workforce} Employees</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full py-4 border border-outline-variant hover:bg-surface-container-high transition-colors font-bold text-sm flex items-center justify-center gap-2 group-hover:border-primary group-hover:text-primary">
                View Details
                <ArrowRight size={16} />
              </button>
            </motion.div>
          );
        })}

        {/* Add New Department Placeholder Card */}
        <div className="bg-surface-container border-2 border-dashed border-outline-variant rounded p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary hover:bg-surface-container-high transition-all">
          <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-outline group-hover:text-primary transition-colors mb-4">
            <PlusCircle size={40} />
          </div>
          <h3 className="text-xl font-bold font-headline text-on-background group-hover:text-primary transition-colors">Create New Section</h3>
          <p className="text-sm text-secondary mt-2 max-w-[200px]">Define a new organizational unit and assign a lead.</p>
        </div>
      </div>

      {/* Global Footer Insight */}
      <div className="mt-16 pt-16 border-t border-surface-container-highest flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Architecture Insight</h4>
          <p className="text-lg font-headline font-bold text-on-background leading-relaxed">
            Total organizational span covers 115 active staff across 5 primary domains. Resource allocation is currently optimized at 92% efficiency.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '05', label: 'Total Departments', className: 'text-primary' },
            { value: '115', label: 'Active Headcount', className: 'text-on-background' },
            { value: '08', label: 'Pending Roles', className: 'text-on-background' },
            { value: '24%', label: 'Q4 Growth Rate', className: 'text-on-background' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className={cn("text-4xl font-extrabold font-headline mb-1", stat.className)}>{stat.value}</p>
              <p className="text-xs font-bold uppercase text-outline">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
