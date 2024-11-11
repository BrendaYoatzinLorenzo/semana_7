import { Product } from "../models/product";

export interface ProductRepository {
  fetchAll(): Promise<Product[]>;
  findById(id: number): Promise<Product>
  create(product: Product): Promise<Product>;
  update(id: number, product: Partial<Product>): Promise<Product>;
}

