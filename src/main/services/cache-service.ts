import { createStaleWhileRevalidateCache, StaleWhileRevalidate } from "stale-while-revalidate-cache";

class Storage {
  private storage = new Map<string, unknown>();

  public getItem(key: string): unknown {
    return this.storage.get(key);
  }

  public setItem(key: string, value: unknown): void {
    this.storage.set(key, value);
  }

  public removeItem(key: string): void {
    this.storage.delete(key);
  }
}

export class CacheService {
  private static instance: StaleWhileRevalidate;

  public static getInstance(): StaleWhileRevalidate {
    if (!CacheService.instance) {
      CacheService.instance = createStaleWhileRevalidateCache({
        storage: new Storage(),
        minTimeToStale: 5000, // 5 seconds
        maxTimeToLive: 600000, // 10 minutes
        serialize: JSON.stringify,
        deserialize: JSON.parse,
      });
    }

    return CacheService.instance;
  }
}
