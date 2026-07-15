const BASE_URL = "http://localhost:8080";
export async function OtpValidation(email, otp) {
  const response = await fetch(`${BASE_URL}/Auth/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, otp })
  });
  const data = await response.json();
  return { ok: response.ok, data: data };
}  
