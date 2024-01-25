'use server';

// taken from https://github.com/maurer2/blue-harvest/blob/main/src/app/server-actions/getDataFromEndpoint/getDataFromEndpoint.ts
export const getDataFromEndpoint = async <T>(url: string): Promise<T> => {
  const fullURL = new URL(url);

  const response = await fetch(fullURL.toString());

  return response.json() as Promise<T>;
};
