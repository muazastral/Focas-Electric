import { MOCK_ORDERS, MOCK_USERS, NEWS_ITEMS, Product, PRODUCTS } from '../constants';
import { CmsPage, MediaAsset, NewsItem, Order, User } from '../types';
import { PDF_PAGE_PRODUCTS } from '../data/pdfPageProducts';

declare global {
  interface ImportMeta {
    readonly env: Record<string, string | undefined>;
  }
}

const viteEnv = import.meta.env || {};
const API_BASE_URL = viteEnv.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';
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

const isPlaceholderImage = (image?: string): boolean => {
  if (!image) return true;
  return /picsum\.photos|via\.placeholder|dummy/i.test(image);
};

const normalizeText = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const resolvePdfImageForProduct = (name: string, category: string, currentImage?: string): string => {
  if (!isPlaceholderImage(currentImage)) {
    return currentImage || '';
  }

  const nameTokens = normalizeText(name)
    .split(' ')
    .filter(token => token.length > 2);

  const categoryCandidates = PDF_PAGE_PRODUCTS.filter(item => item.category === category && !!item.image);
  const best = categoryCandidates
    .map(candidate => {
      const candidateName = normalizeText(candidate.name);
      const score = nameTokens.reduce((total, token) => total + (candidateName.includes(token) ? 1 : 0), 0);
      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score)[0];

  if (best && best.score > 0) {
    return best.candidate.image;
  }

  if (categoryCandidates.length) {
    return categoryCandidates[0].image;
  }

  return currentImage || '';
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
    image: resolvePdfImageForProduct(
      String(product.name || ''),
      String(product.category || ''),
      product.image
    ),
    availableAt: product.availableAt || product.available_at || ['hq'],
    variants: product.variants || [],
    colors: product.colors || [],
    sizes: product.sizes || [],
    lengths: product.lengths || [],
    types: product.types || [],
    choices: product.choices || [],
    modelCodes: product.modelCodes || product.model_codes || [],
    inventoryMatrix: product.inventoryMatrix || product.inventory_matrix || [],
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
      variants: updated.variants || [],
      colors: updated.colors || [],
      sizes: updated.sizes || [],
      lengths: updated.lengths || [],
      types: updated.types || [],
      choices: updated.choices || [],
      modelCodes: updated.modelCodes || updated.model_codes || [],
      inventoryMatrix: updated.inventoryMatrix || updated.inventory_matrix || [],
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
    variants: created.variants || [],
    colors: created.colors || [],
    sizes: created.sizes || [],
    lengths: created.lengths || [],
    types: created.types || [],
    choices: created.choices || [],
    modelCodes: created.modelCodes || created.model_codes || [],
    inventoryMatrix: created.inventoryMatrix || created.inventory_matrix || [],
  };
};

export const deleteProductRequest = async (id: string): Promise<void> => {
  await request(`/admin/products/${id}`, {
    method: 'DELETE',
    headers: withAuthHeaders(),
  });
};

export const getCmsPagesRequest = async (): Promise<CmsPage[]> => {
  const pages = await request<any[]>('/admin/pages', {
    headers: withAuthHeaders(),
  });

  return pages.map((page) => ({
    id: String(page.id),
    title: page.title,
    slug: page.slug,
    status: page.status,
    sections: Array.isArray(page.sections) ? page.sections : [],
    updated_at: page.updated_at,
  }));
};

export const saveCmsPageRequest = async (page: Partial<CmsPage>): Promise<CmsPage> => {
  const isUpdate = Boolean(page.id);
  const endpoint = isUpdate ? `/admin/pages/${page.id}` : '/admin/pages';
  const method = isUpdate ? 'PUT' : 'POST';

  const payload = {
    title: page.title,
    slug: page.slug,
    status: page.status || 'draft',
    sections: page.sections || [],
  };

  const saved = await request<any>(endpoint, {
    method,
    headers: withAuthHeaders(),
    body: JSON.stringify(payload),
  });

  return {
    id: String(saved.id),
    title: saved.title,
    slug: saved.slug,
    status: saved.status,
    sections: Array.isArray(saved.sections) ? saved.sections : [],
    updated_at: saved.updated_at,
  };
};

export const deleteCmsPageRequest = async (id: string): Promise<void> => {
  await request(`/admin/pages/${id}`, {
    method: 'DELETE',
    headers: withAuthHeaders(),
  });
};

export const getMediaAssetsRequest = async (): Promise<MediaAsset[]> => {
  const assets = await request<any[]>('/admin/media', {
    headers: withAuthHeaders(),
  });

  return assets.map((asset) => ({
    id: String(asset.id),
    filename: asset.filename,
    original_name: asset.original_name,
    mime_type: asset.mime_type,
    size_bytes: asset.size_bytes,
    disk: asset.disk,
    path: asset.path,
    url: asset.url,
    alt_text: asset.alt_text,
  }));
};

export const uploadMediaAssetRequest = async (file: File, altText?: string): Promise<MediaAsset> => {
  const formData = new FormData();
  formData.append('file', file);
  if (altText) {
    formData.append('altText', altText);
  }

  const uploaded = await request<any>('/admin/media', {
    method: 'POST',
    headers: withAuthHeaders(),
    body: formData,
  });

  return {
    id: String(uploaded.id),
    filename: uploaded.filename,
    original_name: uploaded.original_name,
    mime_type: uploaded.mime_type,
    size_bytes: uploaded.size_bytes,
    disk: uploaded.disk,
    path: uploaded.path,
    url: uploaded.url,
    alt_text: uploaded.alt_text,
  };
};

export const deleteMediaAssetRequest = async (id: string): Promise<void> => {
  await request(`/admin/media/${id}`, {
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
