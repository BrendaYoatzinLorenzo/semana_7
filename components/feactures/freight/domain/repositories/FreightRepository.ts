import { Freight } from "../models/freight";


export interface FreightRepository {
  fetchAll(): Promise<Freight[]>;
  findById(id: number): Promise<Freight>
  create(freight: Freight): Promise<Freight>;
  update(id: number, freight: Freight): Promise<Freight>;
}

