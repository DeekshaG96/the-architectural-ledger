import React, { useEffect, useState, useMemo } from 'react';
import { 
  Users, 
  UserCheck, 
  Bot, 
  UserPlus, 
  Plus, 
  TrendingUp,
  Banknote,
  Layout,
  Award,
  Send,
  Sparkles,
  MessageSquare,
  Megaphone,
  X
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
import { ACTIVITIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { GoogleGenAI } from "@google/genai";
import { collection, onSnapshot, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

interface Announcement {
  id: string;
  text: string;
  author: string;
  timestamp: any;
}

import { AddEmployeeModal } from '../components/AddEmployeeModal';

export function Dashboard() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeCount, setEmployeeCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'), limit(5));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Announcement));
      setAnnouncements(docs);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'employees'), (snapshot) => {
      const docs = snapshot.docs.map(doc => doc.data());
      setEmployees(docs);
      setEmployeeCount(snapshot.size);
    });
    return () => unsubscribe();
  }, []);

  // Dynamic Chart Data: Resource Allocation by Department
  const departmentData = useMemo(() => {
    const counts: Record<string, number> = {};
    employees.forEach(emp => {
      const dept = emp.department || 'Other';
      counts[dept] = (counts[dept] || 0) + 1;
    });
    const colors = ['#004a77', '#00639b', '#386184', '#535f70', '#717c82'];
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: colors[i % colors.length]
    }));
  }, [employees]);

  // Dynamic Chart Data: Hiring Velocity (Last 6 months)
  const hiringData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      return {
        month: months[d.getMonth()],
        year: d.getFullYear(),
        count: 0,
        label: `${months[d.getMonth()]} ${d.getFullYear()}`
      };
    }).reverse();

    employees.forEach(emp => {
      const joinDate = new Date(emp.joinDate);
      const monthIdx = last6Months.findIndex(m => m.month === months[joinDate.getMonth()] && m.year === joinDate.getFullYear());
      if (monthIdx !== -1) {
        last6Months[monthIdx].count++;
      }
    });

    return last6Months.map(m => ({ name: m.month, value: m.count }));
  }, [employees]);

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnouncement.trim()) return;
    try {
      await addDoc(collection(db, 'announcements'), {
        text: newAnnouncement,
        author: user?.displayName || user?.email,
        timestamp: serverTimestamp()
      });
      setNewAnnouncement('');
    } catch (error) {
      console.error("Error posting announcement:", error);
    }
  };

  const askAI = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an HR AI Assistant for "The Architectural Ledger". 
        Context: The user is asking about workforce management. 
        User Query: ${aiQuery}`,
      });
      setAiResponse(response.text || 'No response from AI.');
    } catch (error) {
      setAiResponse('Error connecting to AI Assistant.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 relative">
      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <AnimatePresence>
          {isAiOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="absolute bottom-16 right-0 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant overflow-hidden"
            >
              <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} />
                  <span className="font-bold font-headline">HR AI Assistant</span>
                </div>
                <button onClick={() => setIsAiOpen(false)} className="hover:bg-white/10 p-1 rounded">
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 custom-scrollbar">
                  {aiResponse ? (
                    <div className="bg-surface-container p-3 rounded-lg text-sm leading-relaxed">
                      {aiResponse}
                    </div>
                  ) : (
                    <div className="text-on-surface-variant text-sm italic text-center mt-10">
                      Ask me anything about your workforce or company policies.
                    </div>
                  )}
                  {isAiLoading && (
                    <div className="flex items-center gap-2 text-primary animate-pulse">
                      <Bot size={16} />
                      <span className="text-xs font-bold">Thinking...</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && askAI()}
                    placeholder="Ask AI..."
                    className="flex-1 bg-surface-container-low border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                  <button 
                    onClick={askAI}
                    disabled={isAiLoading}
                    className="bg-primary text-on-primary p-2 rounded-lg hover:bg-primary-dim transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button 
          onClick={() => setIsAiOpen(!isAiOpen)}
          className="w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
        >
          <Sparkles size={28} />
        </button>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold text-on-background font-headline tracking-tighter mb-2">
            Welcome back, {user?.displayName || 'Enterprise Admin'}
          </h2>
          <p className="text-secondary text-lg">Detailed analytical ledger of the enterprise workforce for Q3 2024.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded flex items-center gap-2 font-bold hover:bg-primary-dim transition-all shadow-md active:scale-95"
        >
          <Plus size={20} />
          <span>New Employee</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Employees', value: employeeCount.toString(), icon: Users, trend: '+12%', color: 'primary' },
          { label: 'Active Staff', value: employeeCount.toString(), icon: UserCheck, trend: 'Active', color: 'tertiary' },
          { label: 'Departments', value: '18', icon: Bot, trend: 'Global', color: 'secondary' },
          { label: 'New Hires (MoM)', value: '34', icon: UserPlus, trend: 'New', color: 'error' },
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border-b-2 border-${stat.color} ring-1 ring-slate-100`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 bg-${stat.color}-container/20 rounded-lg text-${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter ${
                stat.trend.includes('+') ? 'text-emerald-600 bg-emerald-50' : 'text-primary bg-primary-container'
              }`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-secondary text-sm font-medium mb-1">{stat.label}</p>
            <h3 className="text-3xl font-extrabold text-on-background font-headline">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Analytical Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart: Monthly Hiring Trend */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold font-headline">Hiring Velocity</h3>
                <p className="text-sm text-secondary">Workforce growth trends over the last 6 months</p>
              </div>
              <select className="bg-surface-container-low border-none rounded text-xs font-bold text-secondary focus:ring-1 focus:ring-primary">
                <option>Last 6 Months</option>
                <option>Year to Date</option>
              </select>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hiringData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                    dy={10}
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {hiringData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === hiringData.length - 1 ? '#255dad' : '#e1e9ee'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity: Ledger Updates */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="px-8 py-6 border-b border-surface-container flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-bold font-headline">Ledger Updates</h3>
                <p className="text-sm text-secondary">Latest workforce transactions and hire registrations</p>
              </div>
              <button className="text-primary font-bold text-sm hover:underline">View Historical Log</button>
            </div>
            <div className="divide-y divide-surface-container">
              {ACTIVITIES.map((activity) => (
                <div key={activity.id} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-surface-container-high rounded flex items-center justify-center overflow-hidden">
                      {activity.userAvatar ? (
                        <img 
                          src={activity.userAvatar} 
                          alt={activity.title} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="text-primary">
                          {activity.type === 'Financial' && <Banknote size={24} />}
                          {activity.type === 'Structural' && <Layout size={24} />}
                          {activity.type === 'Credential' && <Award size={24} />}
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{activity.title}</p>
                      <p className="text-xs text-secondary">{activity.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-400 mb-1">{activity.timestamp}</p>
                    <span className={cn(
                      "inline-block px-2 py-0.5 text-[10px] font-bold rounded uppercase",
                      activity.type === 'Registration' && "bg-primary-container text-on-primary-container",
                      activity.type === 'Financial' && "bg-tertiary-container text-on-tertiary-container",
                      activity.type === 'Promotion' && "bg-secondary-container text-on-secondary-container",
                      activity.type === 'Structural' && "bg-surface-container-highest text-on-surface",
                      activity.type === 'Credential' && "bg-primary-container text-on-primary-container"
                    )}>
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Features */}
        <div className="space-y-8">
          {/* Real-time Announcements */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm ring-1 ring-slate-100 overflow-hidden">
            <div className="px-6 py-4 bg-secondary/5 border-b border-surface-container flex items-center gap-2">
              <Megaphone size={18} className="text-secondary" />
              <h3 className="text-lg font-bold font-headline">Live Feed</h3>
            </div>
            <div className="p-4 space-y-4">
              <form onSubmit={handlePostAnnouncement} className="flex gap-2">
                <input 
                  type="text" 
                  value={newAnnouncement}
                  onChange={(e) => setNewAnnouncement(e.target.value)}
                  placeholder="Post an update..."
                  className="flex-1 bg-surface-container-low border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-secondary/20"
                />
                <button type="submit" className="bg-secondary text-on-secondary p-2 rounded-lg hover:opacity-90">
                  <Plus size={18} />
                </button>
              </form>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                {announcements.map((ann) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={ann.id} 
                    className="bg-surface-container-low p-3 rounded-lg border-l-4 border-secondary"
                  >
                    <p className="text-sm text-on-surface mb-1">{ann.text}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-secondary uppercase">{ann.author}</span>
                      <span className="text-[10px] text-outline">
                        {ann.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}
                {announcements.length === 0 && (
                  <p className="text-center text-xs text-on-surface-variant py-10">No recent updates.</p>
                )}
              </div>
            </div>
          </div>

          {/* Distribution: Department Allocation */}
          <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm ring-1 ring-slate-100 flex flex-col">
            <h3 className="text-xl font-bold font-headline mb-2">Resource Allocation</h3>
            <p className="text-sm text-secondary mb-8">Departmental distribution</p>
            <div className="flex-1 flex flex-col justify-center gap-4">
              {departmentData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-surface-container-low rounded group hover:bg-surface-container-high transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-semibold">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 border-t border-slate-200 text-xs text-slate-400 font-medium flex justify-between items-center">
        <p>© 2024 The Architectural Ledger. Enterprise Management System v4.2.0</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-primary transition-colors">Privacy Charter</a>
          <a href="#" className="hover:text-primary transition-colors">Security Ledger</a>
          <a href="#" className="hover:text-primary transition-colors">System Health</a>
        </div>
      </footer>
    </div>
  );
}
