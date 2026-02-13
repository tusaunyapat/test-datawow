import { RESERVATIONS } from "../common_variable";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default async function getAllReservations() {
  console.log(`${baseURL}/${RESERVATIONS}`);
  const response = await fetch(`${baseURL}/${RESERVATIONS}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch RESERVATIONs");
  }
  return await response.json();
}
