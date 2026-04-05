export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Contract';
  joinDate: string;
  avatar: string;
  performance?: number;
  salary?: string;
  phone?: string;
  location?: string;
  manager?: string;
  managerAvatar?: string;
  competencies?: string[];
}

export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string;
  managerAvatar: string;
  workforce: number;
  icon: string;
  color: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'Registration' | 'Financial' | 'Promotion' | 'Structural' | 'Credential';
  user?: string;
  userAvatar?: string;
  icon?: string;
}
