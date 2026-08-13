import { PropertyItem, Brand } from '../types';

// API Service Layer connecting Cloudflare Pages Functions + MongoDB Atlas
const API_BASE = '/api';

export const api = {
  // ── PROPERTIES ────────────────────────────────────────────────────────────
  async getProperties(): Promise<PropertyItem[]> {
    try {
      const res = await fetch(`${API_BASE}/properties`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API fetch properties fallback:', e);
    }
    // Fallback to local storage
    try {
      const local = localStorage.getItem('amlak_properties');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  async addProperty(item: PropertyItem): Promise<PropertyItem[]> {
    try {
      const res = await fetch(`${API_BASE}/properties`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API add property fallback:', e);
    }
    return [];
  },

  async deleteProperty(id: string): Promise<PropertyItem[]> {
    try {
      const res = await fetch(`${API_BASE}/properties?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API delete property fallback:', e);
    }
    return [];
  },

  // ── CARS ──────────────────────────────────────────────────────────────────
  async getCars(): Promise<PropertyItem[]> {
    try {
      const res = await fetch(`${API_BASE}/cars`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API fetch cars fallback:', e);
    }
    try {
      const local = localStorage.getItem('amlak_cars');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  async addCar(item: PropertyItem): Promise<PropertyItem[]> {
    try {
      const res = await fetch(`${API_BASE}/cars`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API add car fallback:', e);
    }
    return [];
  },

  async deleteCar(id: string): Promise<PropertyItem[]> {
    try {
      const res = await fetch(`${API_BASE}/cars?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API delete car fallback:', e);
    }
    return [];
  },

  // ── BRANDS ────────────────────────────────────────────────────────────────
  async getBrands(): Promise<Brand[]> {
    try {
      const res = await fetch(`${API_BASE}/brands`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API fetch brands fallback:', e);
    }
    try {
      const local = localStorage.getItem('amlak_brands');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  async addBrand(brand: Brand): Promise<Brand[]> {
    try {
      const res = await fetch(`${API_BASE}/brands`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API add brand fallback:', e);
    }
    return [];
  },

  async deleteBrand(id: string): Promise<Brand[]> {
    try {
      const res = await fetch(`${API_BASE}/brands?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) return data;
      }
    } catch (e) {
      console.warn('API delete brand fallback:', e);
    }
    return [];
  },
};
