// API Configuration for External Backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const apiConfig = {
  baseUrl: API_BASE_URL,
};

// Generic API fetch wrapper
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('auth_token');
    if (token) {
      (defaultHeaders as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || error.error || 'Request failed');
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (email: string, password: string) => {
    return apiFetch<{ success: boolean; user?: unknown; token?: string; error?: string }>(
      '/api/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      }
    );
  },
  logout: async () => {
    return apiFetch<{ success: boolean; message?: string }>('/api/auth/logout', {
      method: 'POST',
    });
  },
  me: async () => {
    return apiFetch<{ success: boolean; data?: unknown; error?: string }>('/api/auth/me');
  },
};

// Agent API
export const agentApi = {
  sendMessage: async (endpoint: string, message: string) => {
    // Endpoint already includes /api prefix from agent data
    return apiFetch<{
      success: boolean;
      message: string;
      data?: Record<string, unknown>;
      status: string;
      timestamp: string;
    }>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  },
};

// Employees API
export const employeesApi = {
  getAll: async () => {
    return apiFetch<{ success: boolean; data: unknown[] }>('/api/employees');
  },
  getById: async (id: string) => {
    return apiFetch<{ success: boolean; data: unknown }>(`/api/employees/${id}`);
  },
};
