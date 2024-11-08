

export interface Product {
  name: string;
  brand: string;
  model: string;
  description: string;
  category: string;
  stock: number;
  productCode: number;
  status:  'ENTREGADO' | 'ENTREGADO_MANANA' | 'PENDIENTE' | 'ENTREGAR_DIA' | 'NO_ENTREGADO';
  isActive?: boolean;
  branchId: number;
}

export interface ProductForm {
  name: string;
  brand: string;
  model: string;
  description: string;
  stock: number;
  status:  'ENTREGADO' | 'ENTREGADO_MANANA' | 'PENDIENTE' | 'ENTREGAR_DIA' | 'NO_ENTREGADO';
}