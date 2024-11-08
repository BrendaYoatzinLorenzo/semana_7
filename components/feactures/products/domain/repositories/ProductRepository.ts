import { Product } from "../models/product";

export interface ProductRepository {
  fetchAll(): Promise<Product[]>;
  create(product: Product): Promise<Product>;
  update(productId: number, product: Partial<Product>): Promise<Product>;
}
