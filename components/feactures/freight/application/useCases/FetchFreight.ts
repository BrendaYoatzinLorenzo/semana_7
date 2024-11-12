// application/useCases/FetchProducts.ts

import { Freight } from "../../domain/models/freight";
import { FreightRepository } from "../../domain/repositories/FreightRepository";


export class FetchFreight {
  constructor(private freightRepository: FreightRepository) {}

  async execute(): Promise<Freight[]> {
    return this.freightRepository.fetchAll();
  }
}
