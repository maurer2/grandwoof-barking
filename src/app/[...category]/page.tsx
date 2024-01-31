import CategoryContent from '../components/CategoryContent/CategoryContent';
import { getDataFromEndpoint } from '../server-actions/getDataFromEndpoint/getDataFromEndpoint';
import categoryPageParamsSchema from './schema';

const baseURL = 'https://swapi.dev/api';

type Payload = {
  count: number;
  next: null | string;
  previous: null | string;
  results: unknown[];
};

type CategoryParams = {
  params: Record<string, string[]>; // array because of catch all route ([...])
};

export default async function Category({ params }: CategoryParams) {
  const parsedParams = categoryPageParamsSchema.safeParse(params);
  if (!parsedParams.success) {
    throw new Error(parsedParams.error.message, { cause: parsedParams.error.flatten() });
  }

  const [category, pageNumber] = parsedParams.data.category;

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
