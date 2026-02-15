import { MOCK_ORDERS, MOCK_USERS, NEWS_ITEMS, Product, PRODUCTS } from '../constants';
import { NewsItem, Order, User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
const AUTH_TOKEN_KEY = 'focus-electrical-token';

interface ApiError extends Error {
  status?: number;
}

const withAuthHeaders = (headers: HeadersInit = {}): HeadersInit => {
  const token = getAuthToken();
  if (!token) {
    return headers;
  }

  return {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
};

const request = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const isBodyFormData = options.body instanceof FormData;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      ...(isBodyFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error: ApiError = new Error(data?.message || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }

  return data as T;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const clearAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const loginRequest = async (email: string, password: string): Promise<{ token: string; user: User }> => {
  return request<{ token: string; user: User }>('/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const logoutRequest = async (): Promise<void> => {
  await request('/logout', {
    method: 'POST',
    headers: withAuthHeaders(),
  });
};

export const meRequest = async (): Promise<User> => {
  return request<User>('/me', {
    headers: withAuthHeaders(),
  });
};

export const getProductsRequest = async (): Promise<Product[]> => {
  const products = await request<any[]>('/products');
  return products.map((product) => ({
    ...product,
    id: String(product.id),
    availableAt: product.availableAt || product.available_at || ['hq'],
  }));
};

export const getNewsRequest = async (): Promise<NewsItem[]> => {
  const news = await request<any[]>('/news');
  return news.map((item) => ({
    ...item,
    id: String(item.id),
  }));
};

export const getOrdersRequest = async (): Promise<Order[]> => {
  const orders = await request<any[]>('/orders', {
    headers: withAuthHeaders(),
  });

  return orders.map((order) => ({
    ...order,
    id: String(order.id),
    userId: String(order.userId || order.user_id),
  }));
};

export const getAdminOrdersRequest = async (): Promise<Order[]> => {
  const orders = await request<any[]>('/admin/orders', {
    headers: withAuthHeaders(),
  });

  return orders.map((order) => ({
    ...order,
    id: String(order.id),
    userId: String(order.userId || order.user_id),
  }));
};

export const getAdminUsersRequest = async (): Promise<User[]> => {
  const users = await request<any[]>('/admin/users', {
    headers: withAuthHeaders(),
  });

  return users.map((user) => ({
    ...user,
    id: String(user.id),
  }));
};

export const saveProductRequest = async (product: Partial<Product>): Promise<Product> => {
  if (product.id) {
    const updated = await request<any>(`/admin/products/${product.id}`, {
      method: 'PUT',
      headers: withAuthHeaders(),
      body: JSON.stringify(product),
    });

    return {
      ...updated,
      id: String(updated.id),
      availableAt: updated.availableAt || updated.available_at || ['hq'],
    };
  }

  const created = await request<any>('/admin/products', {
    method: 'POST',
    headers: withAuthHeaders(),
    body: JSON.stringify(product),
  });

  return {
    ...created,
    id: String(created.id),
    availableAt: created.availableAt || created.available_at || ['hq'],
  };
};

export const deleteProductRequest = async (id: string): Promise<void> => {
  await request(`/admin/products/${id}`, {
    method: 'DELETE',
    headers: withAuthHeaders(),
  });
};

// Lightweight mock fallback helpers when backend is not running.
export const fallbackData = {
  products: PRODUCTS,
  news: NEWS_ITEMS,
  users: MOCK_USERS,
  orders: MOCK_ORDERS,
};
