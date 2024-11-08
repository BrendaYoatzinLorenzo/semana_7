import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { Product } from '../../domain/models/product';

export class CreateProduct {
  constructor(private productRepository: ProductRepository) {}

  async execute(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }
}
