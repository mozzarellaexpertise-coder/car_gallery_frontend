export const API_URL = "https://bumpahead.pythonanywhere.com";

export async function getCars() {
  const res = await fetch(`${API_URL}/cars`);
  return await res.json();
}

export async function addCar(car) {
  const res = await fetch(`${API_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car)
  });
  return await res.json();
}