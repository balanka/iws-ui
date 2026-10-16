import { BehaviorSubject } from 'rxjs';
import type { IWSModel } from '../Models.ts';

export type ModelId = number;
export type EntityId = string | number | bigint;

type StoreMap = Map<ModelId, Map<EntityId, IWSModel>>;

class IwsStore {
  private store: StoreMap = new Map();
  // Snapshot reference exposed to React — replaced on every emit()
  private snapshot: StoreMap = this.store;
  private subject = new BehaviorSubject<StoreMap>(this.store);

  // RxJS-style subscribe (kept for backward compat)
  subscribe(callback: (store: StoreMap) => void) {
    return this.subject.subscribe(callback);
  }

  // React-friendly subscribe
  subscribeSimple = (onStoreChange: () => void): (() => void) => {
    const subscription = this.subject.subscribe(() => onStoreChange());
    return () => subscription.unsubscribe();
  };

  getByModelId<T extends IWSModel = IWSModel>(modelId: ModelId): T[] {
    const innerMap = this.snapshot.get(modelId);
    return innerMap ? (Array.from(innerMap.values()) as T[]) : [];
  }

  getOne<T extends IWSModel = IWSModel>(modelId: ModelId, id: EntityId): T | undefined {
    return this.snapshot.get(modelId)?.get(id) as T | undefined;
  }

  set(item: IWSModel): void {
    const modelId = item.modelid;
    const id = item.id;
    if (modelId === undefined || id === undefined || !item.company) {
      console.warn('Item must have modelid, id, and company', item);
      return;
    }
    const existingInner = this.store.get(modelId);
    const newInner = existingInner ? new Map(existingInner) : new Map<EntityId, IWSModel>();
    newInner.set(id, item);
    this.store.set(modelId, newInner);
    this.emit();
  }

  put<T extends IWSModel>(modelId: ModelId, items: T[]): void {
    const newInnerMap = new Map<EntityId, IWSModel>();
    for (const item of items) {
      if (item.modelid !== modelId) {
        console.warn(`Item modelid ${item.modelid} does not match put modelid ${modelId}, skipping`, item);
        continue;
      }
      if (item.id === undefined) {
        console.warn('Item missing id, skipping', item);
        continue;
      }
      newInnerMap.set(item.id, item);
    }
    this.store.set(modelId, newInnerMap);
    this.emit();
  }

  update(modelId: ModelId, id: EntityId, partialItem: Partial<IWSModel>): void {
    const innerMap = this.store.get(modelId);
    if (!innerMap) {
      console.warn(`No data for modelid ${modelId}`);
      return;
    }
    const existing = innerMap.get(id);
    if (!existing) {
      console.warn(`No item with id ${id} for modelid ${modelId}`);
      return;
    }
    const newInner = new Map(innerMap);
    newInner.set(id, { ...existing, ...partialItem });
    this.store.set(modelId, newInner);
    this.emit();
  }

  deleteOne(modelId: ModelId, id: EntityId): void {
    const innerMap = this.store.get(modelId);
    if (!innerMap) return;
    const newInner = new Map(innerMap);
    newInner.delete(id);
    if (newInner.size === 0) {
      this.store.delete(modelId);
    } else {
      this.store.set(modelId, newInner);
    }
    this.emit();
  }

  deleteByModelId(modelId: ModelId): void {
    if (this.store.delete(modelId)) this.emit();
  }

  clear(): void {
    this.store = new Map();
    this.emit();
  }

  // Stable snapshot for useSyncExternalStore
  getRawMap = (): StoreMap => this.snapshot;

  private emit(): void {
    // New outer Map → new reference → React re-renders
    this.snapshot = new Map(this.store);
    this.subject.next(this.snapshot);
  }
}

const iwsStore = new IwsStore();
export default iwsStore;
