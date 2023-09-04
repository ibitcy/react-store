export enum StoreEventType {
  All,
  Init,
  Update,
  DumpUpdate,
}

export type TOnFire<T> = (storeState: T, prevState: T, type: StoreEventType) => void;
export type TOnFireWithKeys<T> = (
  storeState: T,
  prevState: T,
  includeKeys: Array<keyof T>,
  type: StoreEventType,
) => void;

export type TStoreEvent<T> = StoreEvent<T> | StoreEventSpecificKeys<T>;

export type TEventId = string;

export class StoreEvent<StoreState> {
  public timeout: any = null;

  constructor(
    readonly id: TEventId,
    readonly types: StoreEventType[],
    readonly onFire: TOnFire<StoreState>,
    readonly onRemove: (id: TEventId) => void,
  ) {}

  public remove() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.onRemove(this.id);
  }
}

export class StoreEventSpecificKeys<StoreState> {
  public timeout: any = null;

  constructor(
    readonly id: TEventId,
    readonly types: StoreEventType[],
    readonly onFire: TOnFireWithKeys<StoreState>,
    readonly onRemove: (id: TEventId) => void,
    readonly includeKeys: Array<keyof StoreState> = [],
  ) {}

  public remove() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.onRemove(this.id);
  }
}
