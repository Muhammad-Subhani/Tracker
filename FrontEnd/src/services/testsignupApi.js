const BASE_URL = "http://localhost:8080";
export async function SignUpUser(username, email, password) {
  const response = await fetch(`${BASE_URL}/Auth/SignUP`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, email, password })
  });
  const data = await response.json();
  return { ok: response.ok, data: data };
}
