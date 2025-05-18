import { ApiResponse } from "~/lib/response";

export type Data = {
  _id: string;
  title: string;
  description: string;
};

type GetVaultResponse = ApiResponse & {
  data: Data;
};

export const GET_VAULT_KEY = 'vault';

async function GetVault(id: string): Promise<GetVaultResponse> {
  const resp = await fetch(`/api/vault/${id}`);
  const tasks = await resp.json();

  return tasks;
}
export default GetVault;
