import { Branch } from "../../domain/models/branch";
import { BranchRepository } from "../../domain/repositories/BranchRepository";

export class UpdateBranch {
  constructor(private branchRepository: BranchRepository) {}

  async execute(updatedData: any): Promise<Branch> {
    const { id, ...updateFields } = updatedData;
    return this.branchRepository.update(id, updateFields);
  }
}
