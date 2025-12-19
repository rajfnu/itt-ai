export type UserRole = 'admin' | 'ceo' | 'cio' | 'coo' | 'hr_staff' | 'finance_staff' | 'engineer' | 'marketing_staff' | 'sales_staff';

export type Department = 'Administration' | 'Executive' | 'Human Resources' | 'Finance' | 'Marketing' | 'Engineering' | 'Sales';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: Department;
  avatar?: string;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  endpoint: string;
  allowedRoles: UserRole[];
  department: string;
  icon: string;
  category: string;
  capabilities: string[];
  suggestedPrompts: string[];
  greeting: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  status?: 'sending' | 'thinking' | 'searching' | 'processing' | 'complete' | 'error';
  data?: Record<string, unknown>;
  sources?: string[];
  actions?: MessageAction[];
}

export interface MessageAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'destructive';
  action: string;
}

export interface AgentSession {
  id: string;
  agentId: string;
  messages: ChatMessage[];
  context: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface AgentRequest {
  agentId: string;
  sessionId?: string;
  message: string;
  context?: Record<string, unknown>;
  userId: string;
}

export interface AgentResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
  sources?: string[];
  actions?: MessageAction[];
  status: 'thinking' | 'searching' | 'processing' | 'complete' | 'error';
  timestamp: string;
}

export interface AgentStreamEvent {
  type: 'status' | 'content' | 'data' | 'action' | 'complete' | 'error';
  content?: string;
  status?: string;
  data?: Record<string, unknown>;
}

export interface NavItem {
  title: string;
  href: string;
  icon: string;
  roles: UserRole[];
  department?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
