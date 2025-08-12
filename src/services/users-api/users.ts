import type { User } from "./types";

export const fetchUsers = async (): Promise<User[]> => {
  // const response = await fetch("https://mp67826640ab2b64d1bd.free.beeceptor.com/clients"
  const response = await fetch("https://689b995758a27b18087bc239.mockapi.io/clients/users"
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
};
