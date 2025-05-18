import { ApiResponse } from "~/lib/response";

export type Data = {
  _id: string;
  title: string;
  description: string;
};

type GetWorkspacesResponse = ApiResponse & {
  data: Data[];
};

export const GET_VAULTS_KEY = 'vaults';

async function GetVaults(): Promise<GetWorkspacesResponse> {
  const resp = await fetch("/api/vault");
  const tasks = await resp.json();

  return tasks;
}
export default GetVaults;
