import { CreateBranch } from "../../application/useCases/CreateBranch";
import { FetchBranch } from "../../application/useCases/FetchBranch";
import { UpdateBranch } from "../../application/useCases/UpdateBranch";
import { Branch } from "../../domain/models/branch";
import { BranchtApi } from "../../infrastructure/BranchtApi";

export class BranchViewModel {
  private fetchBranches: FetchBranch;
  private createBranch: CreateBranch;
  private updateBranch: UpdateBranch;

  constructor() {
    const branchApi = new BranchtApi();
    this.fetchBranches = new FetchBranch(branchApi);
    this.createBranch = new CreateBranch(branchApi);
    this.updateBranch = new UpdateBranch(branchApi);
  }

  // Obtener todas las sucursales
  async fetchAllBranches(): Promise<Branch[]> {
    return await this.fetchBranches.execute();
  }

  // Crear una nueva sucursal
  async createNewBranch(branch: Branch): Promise<Branch> {
    return await this.createBranch.execute(branch);
  }

  // Actualizar una sucursal
  async updateNewBranch(branch: Branch): Promise<Branch> {
    return await this.updateBranch.execute(branch);
  }
}
