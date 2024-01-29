import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response.statusText || `Error fetching from ${url}}`);
  }

  return response.json() as Promise<T>;
};

type UseGetDataProps<T> = {
  initialData?: T;
  key: (number | string)[];
  url: string;
};

function useGetData<T>({ initialData, key, url }: UseGetDataProps<T>) {
  const queryResult = useQuery({
    initialData,
    placeholderData: keepPreviousData,
    queryFn: () => fetcher<T>(url),
    queryKey: key,
  });

  return queryResult;
}

export default useGetData;
