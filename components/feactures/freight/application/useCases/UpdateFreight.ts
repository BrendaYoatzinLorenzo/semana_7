import { Freight } from "../../domain/models/freight";
import { FreightRepository } from "../../domain/repositories/FreightRepository";

export class UpdateFreight {
	constructor(private freightRepository: FreightRepository) {}
  
	async execute(updatedData: any,): Promise<Freight> {
	  const { id, ...updateFields } = updatedData;
	  return this.freightRepository.update(id, updateFields);
	}
  }
  