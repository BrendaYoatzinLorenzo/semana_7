import { CreateProduct } from "../../application/useCases/CreateProduct";
import { FetchProducts } from "../../application/useCases/FetchProducts";
import { Product } from "../../domain/models/product";
import { ProductApi } from "../../infrastructure/api/ProductApi";


export class ProductViewModel {
  private fetchProducts: FetchProducts;
  private createProduct: CreateProduct;

  constructor() {
    const productApi = new ProductApi();
    this.fetchProducts = new FetchProducts(productApi);
    this.createProduct = new CreateProduct(productApi);
  }

  async fetchAllProducts(): Promise<Product[]> {
    return await this.fetchProducts.execute();
  }

  async createNewProduct(product: Product): Promise<Product> {
    return await this.createProduct.execute(product);
  }
}
