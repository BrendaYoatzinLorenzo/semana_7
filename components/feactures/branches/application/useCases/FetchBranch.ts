// application/useCases/fetchBranch.ts
import { Branch } from "../../domain/models/branch";
import { BranchRepository } from "../../domain/repositories/BranchRepository";

export class FetchBranch {
  constructor(private branchRepository: BranchRepository) {}

  async execute(): Promise<Branch[]> {
    return this.branchRepository.fetchAll();
  }
}
