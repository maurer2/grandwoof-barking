'use client';

import type { ReactElement } from 'react';

import { useMemo, useState } from 'react';

import useGetData from '../../hooks/useGetData/useGetData';

type Payload = {
  count: number;
  next: null | string;
  previous: null | string;
  results: unknown[];
};

export type CategoryContentProps = {
  category: string;
  initialData: Payload;
  urlOfFirstPage: string;
};

function CategoryContent({
  category,
  initialData,
  urlOfFirstPage,
}: CategoryContentProps): ReactElement {
  const [currentPage, setCurrentPage] = useState(urlOfFirstPage);
  const { data, isFetching, isLoading, isSuccess } = useGetData<Payload>({
    initialData,
    key: [category, currentPage],
    url: currentPage,
  });

  const currentPageNumber = useMemo(() => {
    const queryParams = new URL(currentPage).searchParams;
    const page = queryParams.get('page');

    return page;
  }, [currentPage]);

  const prevPage = data?.previous;
  const nextPage = data?.next;

  function handlePreviousButtonClick() {
    if (!prevPage) {
      return;
    }

    setCurrentPage(prevPage);
  }

  function handleNextButtonClick() {
    if (!nextPage) {
      return;
    }

    setCurrentPage(nextPage);
  }

  return (
    <div>
      <h3>Results for page: {currentPage}</h3>
      <div>
        <button disabled={!prevPage} onClick={handlePreviousButtonClick} type="button">
          Previous page
        </button>{' '}
        <span> {currentPageNumber ?? '-'} </span>{' '}
        <button disabled={!nextPage} onClick={handleNextButtonClick} type="button">
          Next page
        </button>
      </div>
      {(isLoading || isFetching) && <p>Loading data on the client!</p>}
      {!isLoading && !isFetching && isSuccess && (
        <ul>
          {data.results.map((entry) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
            <li key={(entry as any)?.name as string}>
              <code>{JSON.stringify(entry, null, 4)}</code>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryContent;
