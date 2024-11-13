import { Branch } from "../../domain/models/branch";
import { BranchRepository } from "../../domain/repositories/BranchRepository";

export class CreateBranch {
  constructor(private branchRepository: BranchRepository) {}

  async execute(branchData: Branch): Promise<Branch> {
    return this.branchRepository.create(branchData);
  }
}
