// application/useCases/CreateProduct.ts

import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/product';

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(productData: Product): Promise<Product> {
    return this.productRepository.create(productData);
  }
}
