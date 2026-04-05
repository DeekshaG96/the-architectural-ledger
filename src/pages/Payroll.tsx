import React, { useState, useEffect, useMemo } from 'react';
import { 
  Banknote, 
  TrendingUp, 
  Calendar, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign,
  Download,
  Filter,
  Search,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { collection, onSnapshot, addDoc, serverTimestamp, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface Employee {
  id: string;
  name: string;
  department: string;
  salary: number;
  status: string;
  joinDate: string;
}

interface PayrollRecord {
  id: string;
  timestamp: any;
  totalAmount: number;
  employeeCount: number;
  status: string;
  processedBy: string;
}

export function Payroll() {
  const { user } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [history, setHistory] = useState<PayrollRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'employees'), (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as Employee));
      setEmployees(docs);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'payroll_history'), orderBy('timestamp', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      } as PayrollRecord));
      setHistory(docs);
    });
    return () => unsubscribe();
  }, []);

  const stats = useMemo(() => {
    const total = employees.reduce((acc, emp) => acc + (Number(emp.salary) || 0), 0);
    const avg = employees.length > 0 ? total / employees.length : 0;
    return {
      totalMonthly: total.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      totalRaw: total,
      averageSalary: avg.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      employeeCount: employees.length,
      nextPayDate: 'Oct 15, 2024'
    };
  }, [employees]);

  const departmentSalaryData = useMemo(() => {
    const depts: Record<string, number> = {};
    employees.forEach(emp => {
      const dept = emp.department || 'Other';
      depts[dept] = (depts[dept] || 0) + (Number(emp.salary) || 0);
    });
    const colors = ['#004a77', '#00639b', '#386184', '#535f70', '#717c82'];
    return Object.entries(depts).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length]
    }));
  }, [employees]);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const summaryCards = [
    {
      label: 'Total Monthly Payroll',
      value: stats.totalMonthly,
      icon: DollarSign,
      trend: '+4.2%',
      iconClass: 'bg-primary/10 text-primary',
    },
    {
      label: 'Average Salary',
      value: stats.averageSalary,
      icon: TrendingUp,
      trend: '+1.5%',
      iconClass: 'bg-tertiary/10 text-tertiary',
    },
    {
      label: 'Total Recipients',
      value: stats.employeeCount,
      icon: Users,
      trend: '0%',
      iconClass: 'bg-secondary/10 text-secondary',
    },
    {
      label: 'Next Disbursement',
      value: stats.nextPayDate,
      icon: Calendar,
      trend: 'Scheduled',
      iconClass: 'bg-on-background/10 text-on-background',
    },
  ] as const;

  const handleRunPayroll = async () => {
    if (employees.length === 0) return;
    
    setIsProcessing(true);
    try {
      await addDoc(collection(db, 'payroll_history'), {
        timestamp: serverTimestamp(),
        totalAmount: stats.totalRaw,
        employeeCount: employees.length,
        status: 'completed',
        processedBy: user?.displayName || user?.email || 'System'
      });
      alert('Payroll processed successfully and recorded in the ledger.');
    } catch (error) {
      console.error('Error processing payroll:', error);
      alert('Failed to process payroll. Please check permissions.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-2">
          <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase block ml-1">Financial Ledger</span>
          <h1 className="text-5xl font-extrabold font-headline text-on-background tracking-tighter">Payroll Management</h1>
          <p className="text-secondary text-lg">Comprehensive oversight of enterprise compensation and disbursements.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-surface-container-lowest border border-outline-variant px-6 py-3 rounded flex items-center gap-2 font-bold hover:bg-surface-container-high transition-all shadow-sm">
            <Download size={20} />
            <span className="text-sm">Export Report</span>
          </button>
          <button 
            onClick={handleRunPayroll}
            disabled={isProcessing}
            className="bg-primary text-on-primary px-8 py-3 rounded flex items-center gap-2 font-bold hover:bg-primary-dim transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            <Banknote size={20} />
            <span className="text-sm">{isProcessing ? 'Processing...' : 'Run Payroll'}</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryCards.map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={stat.label} 
            className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-3 rounded-xl", stat.iconClass)}>
                <stat.icon size={24} />
              </div>
              <span className={cn(
                "text-xs font-bold px-2 py-1 rounded-full",
                stat.trend.startsWith('+') ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
              )}>
                {stat.trend}
              </span>
            </div>
            <p className="text-secondary text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-2xl font-extrabold text-on-background font-headline">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Salary Distribution Chart */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm ring-1 ring-slate-100">
            <h3 className="text-xl font-bold font-headline mb-2">Compensation Distribution</h3>
            <p className="text-sm text-secondary mb-8">Salary allocation by department</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentSalaryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentSalaryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => `$${value.toLocaleString()}`}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 space-y-3">
              {departmentSalaryData.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm font-medium text-on-surface">{dept.name}</span>
                  </div>
                  <span className="text-sm text-on-surface-variant font-bold">
                    ${dept.value.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payroll Runs */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm ring-1 ring-slate-100">
            <h3 className="text-xl font-bold font-headline mb-6">Recent Disbursements</h3>
            <div className="space-y-4">
              {history.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">${record.totalAmount.toLocaleString()}</p>
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold">
                        {record.timestamp?.toDate().toLocaleDateString()} • {record.employeeCount} Staff
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-primary uppercase">Processed</span>
                  </div>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-8">
                  <Clock size={32} className="mx-auto text-slate-300 mb-2" />
                  <p className="text-xs text-secondary italic">No recent disbursements found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Employee Compensation List */}
        <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-surface-container flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
            <div>
              <h3 className="text-xl font-bold font-headline">Compensation Ledger</h3>
              <p className="text-sm text-secondary">Individual salary records and payment status</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
              <input 
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 text-xs font-bold text-outline uppercase tracking-widest">
                  <th className="px-8 py-4">Employee</th>
                  <th className="px-8 py-4">Department</th>
                  <th className="px-8 py-4">Annual Salary</th>
                  <th className="px-8 py-4">Monthly Pay</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {emp.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-on-background">{emp.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-xs font-bold text-secondary bg-surface-container-high px-2 py-1 rounded uppercase">
                        {emp.department}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-sm font-bold text-on-background">
                        ${(Number(emp.salary) || 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <span className="text-sm font-medium text-secondary">
                        ${((Number(emp.salary) || 0) / 12).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                      </span>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span className="text-xs font-bold text-green-600 uppercase">Verified</span>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredEmployees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-secondary italic">
                      No matching records found in the ledger.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
