import { CONCERTS } from "../common_variable";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function getAllConcerts() {
  console.log(`${baseURL}/${CONCERTS}`);
  const response = await fetch(`${baseURL}/${CONCERTS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch concertss");
  }
  return await response.json();
}

export async function createConcert(payload: {
  name: string;
  totalSeats: number;
  description: string;
}) {
  console.log("Pyload", payload);
  const response = await fetch(`${baseURL}/${CONCERTS}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("resioinse", response);
  console.log("Create successful");
  return response.json();
}

export async function deleteConcert(id: string) {
  console.log("uuid delete", id);
  const response = await fetch(`${baseURL}/${CONCERTS}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return;
}
