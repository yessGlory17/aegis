export const CREATE_VAULT_MUTATION_KEY = "createWorkspace";

async function createVault({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const response = await fetch("/api/vault", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
    }),
  });

  return await response.json();
}

export default createVault;
