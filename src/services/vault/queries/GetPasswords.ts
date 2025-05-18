import { ApiResponse } from "~/lib/response";

export type Data = {
  _id: string;
  title: string;
  service: string;
  username: string;
  password: string;
  vault: string;
  createdAt: string;
  updatedAt: string;
};

type GetPasswordsResponse = ApiResponse & {
  data: Data[];
};

export const GET_PASSWORDS_KEY = 'passwords';

async function GetPasswords(id: string): Promise<GetPasswordsResponse> {
  const resp = await fetch(`/api/vault/${id}/password`);
  const passwords = await resp.json();

  return passwords;
}
export default GetPasswords;
