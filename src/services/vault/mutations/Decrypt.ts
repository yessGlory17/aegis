export const DECRYPT_MUTATION_KEY = "createPassword";

type DecryptResponse = {
    status: string;
    data:{
        password: string;
    }
}

async function decrypt({ vaultID, passwordID }: { vaultID: string; passwordID: string }): Promise<DecryptResponse> {
  const response = await fetch(`/api/vault/${vaultID}/password/${passwordID}/decrypt`, {
    method: "POST",
    body: JSON.stringify({
      vault: vaultID,
      password: passwordID,
    }),
  });

  return await response.json();
}

export default decrypt;
