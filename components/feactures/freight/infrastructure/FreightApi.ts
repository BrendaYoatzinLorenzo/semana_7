import { Freight } from "../domain/models/freight";
import { FreightRepository } from "../domain/repositories/FreightRepository";

export class FreightApi implements FreightRepository {
  async fetchAll(): Promise<Freight[]> {
    const response = await fetch('http://localhost:3000/api/freight');
    return response.json();
  }

  async create(freight: Freight): Promise<Freight> {
    const response = await fetch('http://localhost:3000/api/freight', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freight),
    });
    return response.json();
  }

  async update(id: number, freight:Freight): Promise<Freight> {
    const response = await fetch(`http://localhost:3000/api/freight/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(freight),
    });
    return response.json();
  }

  async findById(id: number): Promise<Freight> {
    const response = await fetch(`http://localhost:3000/api/freight/${id}`);
    return response.json();
  }
}
