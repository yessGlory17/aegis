export const LOGIN_MUTATION_KEY = "login";

async function login({ email, password }: { email: string; password: string }) {
  const response = await fetch("/api/auth", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await response.json();
}

export default login;
