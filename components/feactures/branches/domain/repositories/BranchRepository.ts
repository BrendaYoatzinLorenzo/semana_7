import { Branch } from "../models/branch";

export interface BranchRepository {
  fetchAll(): Promise<Branch[]>;
  findById(id: number): Promise<Branch>;
  create(branch: Branch): Promise<Branch>;
  update(id: number, branch: Branch): Promise<Branch>;
}
