'use server';

// taken from https://github.com/maurer2/blue-harvest/blob/main/src/app/server-actions/getDataFromEndpoint/getDataFromEndpoint.ts
export const getDataFromEndpoint = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText || `Error fetching from ${url}}`);
  }

  return response.json() as Promise<T>;
};
