'use server';

// import { setTimeout } from 'timers/promises';

// taken from https://github.com/maurer2/blue-harvest/blob/main/src/app/server-actions/getDataFromEndpoint/getDataFromEndpoint.ts
export const getDataFromEndpoint = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText || `Error fetching from ${url}}`);
  }

  // await setTimeout(2000);

  return response.json() as Promise<T>;
};
