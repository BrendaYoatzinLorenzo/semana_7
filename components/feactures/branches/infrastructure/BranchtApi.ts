import { Branch } from "../domain/models/branch";
import { BranchRepository } from "../domain/repositories/BranchRepository";

export class BranchtApi implements BranchRepository {
  async fetchAll(): Promise<Branch[]> {
    const response = await fetch('http://localhost:3000/api/branches');
    return response.json();
  }

  async create(branch: Branch): Promise<Branch> {
    const response = await fetch('http://localhost:3000/api/branches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(branch),
    });
    return response.json();
  }

  async update(id: number, branch: Partial<Branch>): Promise<Branch> {
    const response = await fetch(`http://localhost:3000/api/branches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(branch),
    });
    return response.json();
  }

  async findById(id: number): Promise<Branch> {
    const response = await fetch(`http://localhost:3000/api/branches/${id}`);
    return response.json();
  }
}
