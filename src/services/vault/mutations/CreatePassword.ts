export const CREATE_PASSWORD_MUTATION_KEY = "createPassword";

async function createPassword({
  vaultID,
  title,
  service,
  username,
  password
}: {
    vaultID: string;
  title: string;
  service: string;
  username: string;
  password: string;
}) {
  const response = await fetch(`/api/vault/${vaultID}/password`, {
    method: "POST",
    body: JSON.stringify({
        title,
        service,
        username,
        password,
        vault: vaultID
    }),
  });

  return await response.json();
}

export default createPassword;
