// application/useCases/EditProduct.ts

import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/product';

export class UpdateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(updatedData: any): Promise<Product> {
    const { id, ...updateFields } = updatedData;
    return this.productRepository.update(id, updateFields);
  }
}
