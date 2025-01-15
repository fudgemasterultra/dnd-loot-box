export namespace Types {
  export interface TableCreateRequest {
    name: string;
    description: string;
  }
  export interface TableUpdateRequest {
    id: number;
    name: string | undefined;
    description: string | undefined;
  }
  export interface TableDeleteRequest {
    id: number;
  }
  export interface TableReadRequest {
    id: number;
  }
  export interface TableSelectRequest {
    id: number;
  }
  export interface ItemCreateRequest {
    name: string;
    description: string;
    lootTableId: number;
  }
  export interface ItemUpdateRequest {
    id: number;
    name: string | undefined;
    description: string | undefined;
  }
  export interface ItemDeleteRequest {
    id: number;
  }
}
