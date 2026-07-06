import { BehaviorSubject } from 'rxjs';
import type { IWSModel } from '../Models.ts';

export type ModelId = number;
export type EntityId = string | number | bigint;

class IwsStore {
  private store = new Map<ModelId, Map<EntityId, IWSModel>>();
  private subject = new BehaviorSubject<Map<ModelId, Map<EntityId, IWSModel>>>(this.store);

  // Subscribe to full store changes
  subscribe(callback: (store: Map<ModelId, Map<EntityId, IWSModel>>) => void) {
    return this.subject.subscribe(callback);
  }

  /**
   * Get all objects of a given modelid, typed as T[].
   * Usage: const accounts = iwsStore.getByModelId<IAccount>(formEnum.ACCOUNT);
   */
  getByModelId<T extends IWSModel = IWSModel>(modelId: ModelId): T[] {
    const innerMap = this.store.get(modelId);
    return innerMap ? (Array.from(innerMap.values()) as T[]) : [];
  }

  // Get a single object, typed as T | undefined
  getOne<T extends IWSModel = IWSModel>(modelId: ModelId, id: EntityId): T | undefined {
    return this.store.get(modelId)?.get(id) as T | undefined;
  }

  // Insert or replace a single item
  set(item: IWSModel): void {
    const modelId = item.modelid;
    const id = item.id;
    if (modelId === undefined || id === undefined || !item.company) {
      console.warn('Item must have modelid, id, and company', item);
      return;
    }
    let innerMap = this.store.get(modelId);
    if (!innerMap) {
      innerMap = new Map();
      this.store.set(modelId, innerMap);
    }
    innerMap.set(id, item);
    this.emit();
  }

  /**
   * PUT – replace all items for a given modelid.
   * Now accepts a generic type T extends IWSModel.
   */
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

  // Update a single item (partial merge)
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
    const updated = { ...existing, ...partialItem };
    innerMap.set(id, updated);
    this.emit();
  }

  // Delete one object
  deleteOne(modelId: ModelId, id: EntityId): void {
    const innerMap = this.store.get(modelId);
    if (!innerMap) return;
    innerMap.delete(id);
    if (innerMap.size === 0) this.store.delete(modelId);
    this.emit();
  }

  // Delete all objects of a given modelid
  deleteByModelId(modelId: ModelId): void {
    if (this.store.delete(modelId)) this.emit();
  }

  // Clear everything
  clear(): void {
    this.store.clear();
    this.emit();
  }

  // Raw map access (use sparingly)
  getRawMap(): Map<ModelId, Map<EntityId, IWSModel>> {
    return this.store;
  }

  private emit(): void {
    this.subject.next(new Map(this.store));
  }
}

const iwsStore = new IwsStore();
export default iwsStore;
