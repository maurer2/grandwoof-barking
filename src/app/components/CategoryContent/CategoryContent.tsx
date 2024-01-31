'use client';

import type { ReactElement } from 'react';

import { useMemo, useState } from 'react';

import type { CategoryContentKeyFields } from './schema';

import useGetData from '../../hooks/useGetData/useGetData';
import categoryContentKeyFieldsSchema from './schema';

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
  const {
    data: categoryData,
    isFetching,
    isPending,
    isSuccess,
  } = useGetData<Payload>({
    // https://github.com/TanStack/query/issues/6353
    initialData: initialPageNumber === currentPageNumber ? initialData : undefined,
    key: [category, currentPageNumber],
    url: `${baseURLOfCategory}/?page=${currentPageNumber}`,
  });

  const categoryContentKeyFields: CategoryContentKeyFields | string = useMemo(() => {
    const parsedCategoryData = categoryContentKeyFieldsSchema.safeParse(categoryData?.results);

    if (!parsedCategoryData.success) {
      return parsedCategoryData.error.message;
    }

    return parsedCategoryData.data;
  }, [categoryData]);

  const hasPreviousPage = !isPending && Boolean(categoryData?.previous?.length);
  const hasNextPage = !isPending && Boolean(categoryData?.next?.length);

  function handlePreviousButtonClick(): void {
    if (hasPreviousPage) {
      setCurrentPageNumber((previousValue) => previousValue - 1);
    }
  }

  function handleNextButtonClick(): void {
    if (hasNextPage) {
      setCurrentPageNumber((previousValue) => previousValue + 1);
    }
  }

  return (
    <div>
      <h3>
        <span>Results</span> {isSuccess && <span>({categoryData.count})</span>}{' '}
        {isFetching && <span>(Loading data on the client!)</span>}
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
      {typeof categoryContentKeyFields !== 'string' && categoryContentKeyFields.length > 0 && (
        <ul>
          {categoryContentKeyFields.map((entry) => (
            <li key={'name' in entry ? (entry.name as string) : entry.title}>
              <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(entry, null, 4)}</code>
            </li>
          ))}
        </ul>
      )}
      {typeof categoryContentKeyFields === 'string' && <p>{categoryContentKeyFields}</p>}
    </div>
  );
}

export default CategoryContent;
