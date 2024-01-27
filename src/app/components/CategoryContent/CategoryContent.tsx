'use client';

import type { ReactElement } from 'react';

import { useState } from 'react';

import useGetData from '../../hooks/useGetData/useGetData';

type Payload = {
  count: number;
  next: null | string;
  previous: null | string;
  results: unknown[];
};

export type CategoryContentProps = {
  baseURLOfCategory: string;
  category: string;
  initialData: Payload;
  initialPageNumber: number;
};

function CategoryContent({
  baseURLOfCategory,
  category,
  initialData,
  initialPageNumber,
}: CategoryContentProps): ReactElement {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(initialPageNumber);
  const currentPageURL = `${baseURLOfCategory}/?page=${currentPageNumber}`;

  const {
    data: categoryData,
    isFetching,
    isPending,
    isSuccess,
  } = useGetData<Payload>({
    // https://github.com/TanStack/query/issues/6353
    initialData: initialPageNumber === currentPageNumber ? initialData : undefined,
    key: [category, currentPageNumber.toString()],
    url: currentPageURL,
  });

  const hasPreviousPage = !isPending && Boolean(categoryData?.previous?.length);
  const hasNextPage = !isPending && Boolean(categoryData?.next?.length);

  function handlePreviousButtonClick() {
    if (hasPreviousPage) {
      setCurrentPageNumber((previousValue) => previousValue - 1);
    }
  }

  function handleNextButtonClick() {
    if (hasNextPage) {
      setCurrentPageNumber((previousValue) => previousValue + 1);
    }
  }

  return (
    <div>
      <h3>
        <span>Results</span> {isFetching && <span>(Loading data on the client!)</span>}
      </h3>
      <div>
        <button
          disabled={!hasPreviousPage || isFetching}
          onClick={handlePreviousButtonClick}
          type="button"
        >
          Previous page
        </button>{' '}
        <span> {currentPageNumber} </span>{' '}
        <button disabled={!hasNextPage || isFetching} onClick={handleNextButtonClick} type="button">
          Next page
        </button>
      </div>
      {isSuccess && (
        <ul>
          {categoryData.results.map((entry) => (
            <li key={(entry as any).name || (entry as any).title}>
              <code>{JSON.stringify(entry, null, 4)}</code>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryContent;
