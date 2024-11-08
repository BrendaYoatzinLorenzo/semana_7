import { Product } from "../../domain/models/product";
import { ProductRepository } from "../../domain/repositories/ProductRepository";


export class ProductApi implements ProductRepository {
  async fetchAll(): Promise<Product[]> {
    const response = await fetch('http://localhost:3000/api/products');
    return response.json();
  }

  async create(product: Product): Promise<Product> {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  }

  async update(productId: number, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    return response.json();
  }
}
