export type GameEvents = {
  message: string;
};

export class EventBus {
  private readonly listeners = new Map<
    keyof GameEvents,
    Set<(value: string) => void>
  >();

  on<K extends keyof GameEvents>(
    event: K,
    listener: (value: GameEvents[K]) => void,
  ): () => void {
    const group = this.listeners.get(event) ?? new Set();
    group.add(listener);
    this.listeners.set(event, group);
    return () => group.delete(listener);
  }

  emit<K extends keyof GameEvents>(event: K, value: GameEvents[K]): void {
    this.listeners.get(event)?.forEach((listener) => listener(value));
  }
}
