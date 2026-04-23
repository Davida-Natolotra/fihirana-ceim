import {Injectable, signal} from '@angular/core';

const DB_NAME = 'fihirana-ceim-device';
const STORE_NAME = 'device-info';
const DEVICE_ID_KEY = 'device-id';

@Injectable({
  providedIn: 'root'
})
export class DeviceIdService {

  devId = signal('')
  private deviceIdPromise: Promise<string> | null = null;

  setDeviceId(deviceId: string) {
    this.devId.set(deviceId);
  }

  /**
   * Gets the unique device ID, generating one if it doesn't exist.
   * The ID is stored in IndexedDB and persists across sessions, refreshes, and updates.
   */
  async getDeviceId(): Promise<string> {
    if (!this.deviceIdPromise) {
      this.deviceIdPromise = this.loadOrCreateDeviceId();
    }
    return this.deviceIdPromise;
  }

  private async loadOrCreateDeviceId(): Promise<string> {
    const db = await this.openDatabase();

    // Try to get existing device ID
    let deviceId = await this.getFromStore(db, DEVICE_ID_KEY);

    if (!deviceId) {
      // Generate a new UUID
      deviceId = this.generateUUID();
      await this.saveToStore(db, DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
  }

  private openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
    });
  }

  private getFromStore(db: IDBDatabase, key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  private saveToStore(db: IDBDatabase, key: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(value, key);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  private generateUUID(): string {
    // Use crypto.randomUUID() if available (modern browsers), fallback to manual generation
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }

    // Fallback for older browsers
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
