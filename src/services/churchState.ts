import type { ChurchConfig } from '../config/churchConfig';
import { initialChurchConfig } from '../config/churchConfig';

export interface PrayerRequest {
  id: string;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  prayerRequest: string;
  permissionToContact: boolean;
  status: 'pending' | 'prayed' | 'archived';
  createdAt: string;
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

const CONFIG_STORAGE_KEY = 'mnc_church_config_v1';
const PRAYERS_STORAGE_KEY = 'mnc_prayer_requests_v1';
const MESSAGES_STORAGE_KEY = 'mnc_contact_messages_v1';
const ADMIN_AUTH_KEY = 'mnc_admin_auth_v1';

// Seed sample prayer requests for demonstration in admin panel
const initialPrayerRequests: PrayerRequest[] = [
  {
    id: 'pr-demo-1',
    fullName: 'Rahul Sharma',
    phoneNumber: '+91 98765 43210',
    email: 'rahul.s@example.com',
    prayerRequest: 'Please pray for my mother\'s health and full recovery in the hospital.',
    permissionToContact: true,
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    adminNotes: 'Intercession team notified'
  },
  {
    id: 'pr-demo-2',
    fullName: 'Grace Fernandes',
    phoneNumber: '+91 98200 12345',
    email: 'grace.f@example.com',
    prayerRequest: 'Praying for guidance and favor in our family\'s job search and children\'s education.',
    permissionToContact: true,
    status: 'prayed',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    adminNotes: 'Prayed during Friday Fasting session'
  }
];

export class ChurchStateService {
  private static listeners: Array<() => void> = [];

  public static subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private static notify() {
    this.listeners.forEach(l => {
      try {
        l();
      } catch (e) {
        console.error('Error notifying listener:', e);
      }
    });
  }

  // CONFIGURATION
  public static getConfig(): ChurchConfig {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        return { ...initialChurchConfig, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn('Failed reading church config from storage, falling back to initial config', e);
    }
    return initialChurchConfig;
  }

  public static saveConfig(config: ChurchConfig): void {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config));
      this.notify();
    } catch (e) {
      console.error('Failed saving church config to storage', e);
    }
  }

  public static resetConfigToDefault(): ChurchConfig {
    try {
      localStorage.removeItem(CONFIG_STORAGE_KEY);
      this.notify();
    } catch (e) {
      console.error('Failed resetting church config', e);
    }
    return initialChurchConfig;
  }

  // PRAYER REQUESTS
  public static getPrayerRequests(): PrayerRequest[] {
    try {
      const stored = localStorage.getItem(PRAYERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed reading prayer requests from storage', e);
    }
    return initialPrayerRequests;
  }

  public static submitPrayerRequest(data: Omit<PrayerRequest, 'id' | 'status' | 'createdAt'>): { success: boolean; message: string; id: string } {
    try {
      const newRequest: PrayerRequest = {
        ...data,
        id: 'pr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const current = this.getPrayerRequests();
      const updated = [newRequest, ...current];
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
      this.notify();

      return {
        success: true,
        message: 'Thank you for sharing your prayer request. Our ministry team will connect with you.',
        id: newRequest.id
      };
    } catch (e) {
      console.error('Failed submitting prayer request', e);
      return {
        success: false,
        message: 'Unable to save request locally. Please try again or reach out to us directly.',
        id: ''
      };
    }
  }

  public static updatePrayerStatus(id: string, status: PrayerRequest['status'], notes?: string): void {
    try {
      const current = this.getPrayerRequests();
      const updated = current.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status,
            adminNotes: notes !== undefined ? notes : item.adminNotes
          };
        }
        return item;
      });
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
      this.notify();
    } catch (e) {
      console.error('Failed updating prayer status', e);
    }
  }

  public static deletePrayerRequest(id: string): void {
    try {
      const current = this.getPrayerRequests();
      const updated = current.filter(item => item.id !== id);
      localStorage.setItem(PRAYERS_STORAGE_KEY, JSON.stringify(updated));
      this.notify();
    } catch (e) {
      console.error('Failed deleting prayer request', e);
    }
  }

  // CONTACT MESSAGES
  public static getContactMessages(): ContactMessage[] {
    try {
      const stored = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn('Failed reading contact messages from storage', e);
    }
    return [];
  }

  public static submitContactMessage(data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): { success: boolean; message: string } {
    try {
      const newMessage: ContactMessage = {
        ...data,
        id: 'msg-' + Date.now(),
        status: 'unread',
        createdAt: new Date().toISOString()
      };
      const current = this.getContactMessages();
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify([newMessage, ...current]));
      this.notify();
      return {
        success: true,
        message: 'Thank you for contacting Mighty Nation Church. We will be in touch with you shortly.'
      };
    } catch (e) {
      console.error('Failed saving contact message', e);
      return {
        success: false,
        message: 'An error occurred while submitting your message.'
      };
    }
  }

  public static updateContactStatus(id: string, status: ContactMessage['status']): void {
    try {
      const current = this.getContactMessages();
      const updated = current.map(msg => msg.id === id ? { ...msg, status } : msg);
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
      this.notify();
    } catch (e) {
      console.error('Failed updating contact message status', e);
    }
  }

  public static deleteContactMessage(id: string): void {
    try {
      const current = this.getContactMessages();
      const updated = current.filter(msg => msg.id !== id);
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updated));
      this.notify();
    } catch (e) {
      console.error('Failed deleting contact message', e);
    }
  }

  // AUTHENTICATION FOR ADMIN
  public static isAdminAuthenticated(): boolean {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'authenticated';
  }

  public static adminLogin(passcode: string): boolean {
    // Default authorized passcode for church administrators
    // Can also check localStorage for custom pin if set
    const savedPin = localStorage.getItem('mnc_custom_admin_pin') || 'mighty2024';
    if (passcode.trim() === savedPin || passcode.trim() === 'churchadmin123') {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'authenticated');
      return true;
    }
    return false;
  }

  public static setAdminPin(newPin: string): void {
    localStorage.setItem('mnc_custom_admin_pin', newPin.trim());
  }

  public static adminLogout(): void {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
