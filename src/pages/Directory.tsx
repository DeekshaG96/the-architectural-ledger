import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Filter, 
  Building2, 
  ShieldCheck, 
  Eye, 
  Edit2, 
  Trash2, 
  ChevronLeft, 
  ChevronRight,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { AddEmployeeModal } from '../components/AddEmployeeModal';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  joinDate: string;
  avatar: string;
}

export function Directory() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'employees'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Employee));
      setEmployees(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteDoc(doc(db, 'employees', id));
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <AddEmployeeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      {/* Page Heading & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10">
        <div className="space-y-1">
          <h1 className="text-4xl font-headline font-extrabold tracking-tight text-primary">Employee Directory</h1>
          <p className="text-on-surface-variant font-body">Manage organization members and their operational access.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-on-primary px-6 py-3 rounded flex items-center gap-2 font-headline font-bold text-sm shadow-lg shadow-primary/20 active:scale-95 duration-150"
        >
          <Plus size={18} />
          Add New Employee
        </button>
      </div>

      {/* Filters & Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-2 bg-surface-container-low p-1 rounded-xl flex items-center">
          <Search className="px-3 text-on-surface-variant" size={40} />
          <input 
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none text-sm font-medium text-on-surface w-full focus:ring-0"
          />
        </div>
        <div className="bg-surface-container-low p-1 rounded-xl flex items-center">
          <Building2 className="px-3 text-on-surface-variant" size={40} />
          <select className="bg-transparent border-none text-sm font-medium text-on-surface w-full focus:ring-0">
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Design</option>
            <option>Marketing</option>
            <option>Operations</option>
          </select>
        </div>
        <div className="bg-surface-container-low p-1 rounded-xl flex items-center">
          <ShieldCheck className="px-3 text-on-surface-variant" size={40} />
          <select className="bg-transparent border-none text-sm font-medium text-on-surface w-full focus:ring-0">
            <option>All Status</option>
            <option>Active</option>
            <option>On Leave</option>
            <option>Contract</option>
          </select>
        </div>
      </div>

      {/* Data Table Card */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-6 ring-1 ring-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-6 py-4 text-xs font-headline font-extrabold text-on-surface-variant uppercase tracking-wider">Employee</th>
                <th className="px-6 py-4 text-xs font-headline font-extrabold text-on-surface-variant uppercase tracking-wider">Role & Dept</th>
                <th className="px-6 py-4 text-xs font-headline font-extrabold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-headline font-extrabold text-on-surface-variant uppercase tracking-wider">Join Date</th>
                <th className="px-6 py-4 text-xs font-headline font-extrabold text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {filteredEmployees.map((employee) => (
                <tr 
                  key={employee.id} 
                  className="hover:bg-surface-container-low/30 transition-colors cursor-pointer"
                  onClick={() => navigate(`/employees/${employee.id}`)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={employee.avatar} 
                        alt={employee.name} 
                        className="w-10 h-10 rounded-xl object-cover bg-surface-container"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <p className="font-headline font-bold text-on-surface">{employee.name}</p>
                        <p className="text-xs text-on-surface-variant">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p className="font-medium text-on-surface">{employee.role}</p>
                    <p className="text-xs text-on-surface-variant">{employee.department}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-tighter",
                      employee.status === 'Active' ? "bg-primary-container text-on-primary-container" : "bg-secondary-container text-on-secondary-container"
                    )}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-on-surface-variant">{employee.joinDate}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 text-on-surface-variant" onClick={(e) => e.stopPropagation()}>
                      <button className="p-2 hover:bg-surface-container-high rounded transition-colors"><Eye size={16} /></button>
                      <button className="p-2 hover:bg-surface-container-high rounded transition-colors"><Edit2 size={16} /></button>
                      <button 
                        onClick={() => handleDelete(employee.id)}
                        className="p-2 hover:bg-error-container/20 text-error rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-on-surface-variant">
                    No employees found matching your criteria.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-primary animate-pulse font-bold">
                    Loading the ledger...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-on-surface-variant font-medium">Showing 1 to 4 of 24 entries</p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors disabled:opacity-40" disabled>
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold shadow-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface hover:bg-surface-container transition-colors">3</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 text-on-surface-variant hover:bg-surface-container transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Footer Note */}
      <footer className="p-8 text-center">
        <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-headline font-bold">Ledger Revision 8.2 • Secure Enterprise Instance</p>
      </footer>
    </div>
  );
}
