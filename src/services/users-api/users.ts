import type { User } from "./types";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://mp67826640ab2b64d1bd.free.beeceptor.com/clients"
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  return response.json();
};
