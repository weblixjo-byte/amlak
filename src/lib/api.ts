import { PropertyItem, Brand } from '../types';

const API_BASE = '/api';

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  item: string;
  date: string;
  status: string;
  type: string;
}

export const api = {
  // ── PROPERTIES ────────────────────────────────────────────────────────────
  getProperties(): PropertyItem[] {
    try {
      const local = localStorage.getItem('amlak_properties');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  saveProperties(items: PropertyItem[]): PropertyItem[] {
    try {
      localStorage.setItem('amlak_properties', JSON.stringify(items));
    } catch (e) {}

    // Async sync to server API
    fetch(`${API_BASE}/properties`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).catch(() => {});

    return items;
  },

  // ── CARS ──────────────────────────────────────────────────────────────────
  getCars(): PropertyItem[] {
    try {
      const local = localStorage.getItem('amlak_cars');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  saveCars(items: PropertyItem[]): PropertyItem[] {
    try {
      localStorage.setItem('amlak_cars', JSON.stringify(items));
    } catch (e) {}

    fetch(`${API_BASE}/cars`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).catch(() => {});

    return items;
  },

  // ── BRANDS ────────────────────────────────────────────────────────────────
  getBrands(): Brand[] {
    try {
      const local = localStorage.getItem('amlak_brands');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  saveBrands(items: Brand[]): Brand[] {
    try {
      localStorage.setItem('amlak_brands', JSON.stringify(items));
    } catch (e) {}

    fetch(`${API_BASE}/brands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).catch(() => {});

    return items;
  },

  // ── INQUIRIES ─────────────────────────────────────────────────────────────
  getInquiries(): Inquiry[] {
    try {
      const local = localStorage.getItem('amlak_inquiries');
      return local ? JSON.parse(local) : [];
    } catch {
      return [];
    }
  },

  saveInquiries(items: Inquiry[]): Inquiry[] {
    try {
      localStorage.setItem('amlak_inquiries', JSON.stringify(items));
    } catch (e) {}

    fetch(`${API_BASE}/inquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(items),
    }).catch(() => {});

    return items;
  },
};
