// application/useCases/FetchProducts.ts

import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/product'; 

export class FetchProducts {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.fetchAll();
  }
}
