export interface InventoryQuantity {
  day: Date;
  quantity: number;
}

export interface Inventory {
  id: number;
  name: string;
  quantities: InventoryQuantity[];
}

export interface ProductLog {
  created_at: string;
  product_id: number;
  new_quantity: number;
}
