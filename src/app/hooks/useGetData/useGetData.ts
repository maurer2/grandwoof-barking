import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText || `Error fetching from ${url}}`);
  }

  return response.json() as Promise<T>;
};

function useGetData<T>({
  initialData,
  key,
  url,
}: {
  initialData: T | undefined;
  key: string[];
  url: string;
}) {
  const queryResult = useQuery({
    initialData,
    placeholderData: keepPreviousData,
    queryFn: () => fetcher<T>(url),
    queryKey: key,
  });

  return queryResult;
}

export default useGetData;
