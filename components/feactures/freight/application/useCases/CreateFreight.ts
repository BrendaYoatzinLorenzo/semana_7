import { Freight } from "../../domain/models/freight";
import { FreightRepository } from "../../domain/repositories/FreightRepository";

export class CreateFreight {
  constructor(private freightRepository: FreightRepository) {}

  async execute(productData: Freight): Promise<Freight> {
    return this.freightRepository.create(productData);
  }
}
