export interface Product {
  id: number;
  name: string;
  brand: string;
  model: string;
  description?: string;
  category: string;
  stock: number;
  productCode: number;
  status:  string;
  isActive?: boolean;
  branchId?: number;
}

export interface ProductForm {
  name: string;
  brand: string;
  model: string;
  description?: string;
  category: string;
  stock: number;
  productCode: number;
  status:  string;
  branchId?: number;
}