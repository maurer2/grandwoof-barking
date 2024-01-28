import CategoryContent from '../components/CategoryContent/CategoryContent';
import { getDataFromEndpoint } from '../server-actions/getDataFromEndpoint/getDataFromEndpoint';

const baseURL = 'https://swapi.dev/api';

type Payload = {
  count: number;
  next: null | string;
  previous: null | string;
  results: unknown[];
};

type CategoryParams = {
  params: Record<string, string | string[]>; // array in case of catch all route ([...])
};

export default async function Category({ params }: CategoryParams) {
  const { category: categoryParam } = params;

  const pageNumber =
    typeof categoryParam === 'string' || categoryParam.length <= 1
      ? 1
      : parseInt(categoryParam[1], 10) || 1;
  const category = typeof categoryParam === 'string' ? categoryParam : categoryParam[0];
  const baseURLOfCategory = `${baseURL}/${category}`;
  const urlOfPage = `${baseURLOfCategory}/?page=${pageNumber}`;
  const initialData = await getDataFromEndpoint<Payload>(urlOfPage);

  return (
    <div>
      <h2>{category}</h2>
      <CategoryContent
        baseURLOfCategory={baseURLOfCategory}
        category={category}
        initialData={initialData}
        initialPageNumber={pageNumber}
      />
    </div>
  );
}
