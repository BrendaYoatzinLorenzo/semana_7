import { CreateFreight } from "../../application/useCases/CreateFreight";
import { FetchFreight } from "../../application/useCases/FetchFreight";
import { UpdateFreight } from "../../application/useCases/UpdateFreight";


import { Freight } from "../../domain/models/freight";
import { FreightApi } from "../../infrastructure/FreightApi";


export class FreightViewModel {
  private fetchFreights: FetchFreight;
  private createFreight: CreateFreight;
  private updateFreight: UpdateFreight;

  constructor() {
    const freightApi = new FreightApi();
    this.fetchFreights = new FetchFreight(freightApi);
    this.createFreight = new CreateFreight(freightApi);
    this.updateFreight = new UpdateFreight(freightApi);
  }

  async fetchAllFreights(): Promise<Freight[]> {
    return await this.fetchFreights.execute();
  }

  async createNewFreight(freight: Freight): Promise<Freight> {
    return await this.createFreight.execute(freight);
  }

  async updateNewFreight(freight:Freight): Promise<Freight> {
    return await this.updateFreight.execute(freight);
  }
}
