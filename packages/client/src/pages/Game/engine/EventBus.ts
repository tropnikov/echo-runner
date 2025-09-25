/**
 * EventBus, просто EventBus
 */
export class EventBus {
  private static instance: EventBus;
  private listeners: Record<string, ((...args: unknown[]) => void)[]>;

  private constructor() {
    this.listeners = {};
  }

  static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  on<TEvent extends string, TArgs extends unknown[]>(event: TEvent, callback: (...args: TArgs) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback as (...args: unknown[]) => void);
  }

  off<TEvent extends string, TArgs extends unknown[]>(event: TEvent, callback: (...args: TArgs) => void) {
    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit<TEvent extends string, TArgs extends unknown[]>(event: TEvent, ...args: TArgs) {
    if (!this.listeners[event]) return;

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
