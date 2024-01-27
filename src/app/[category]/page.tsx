import CategoryContent from '../components/CategoryContent/CategoryContent';
import { getDataFromEndpoint } from '../server-actions/getDataFromEndpoint/getDataFromEndpoint';

const baseURL = 'https://swapi.dev/api';

type Payload = {
  count: number;
  next: null | string;
  previous: null | string;
  results: unknown[];
};

export default async function Category({ params }: { params: Record<string, string> }) {
  const { category } = params;

  const pageNumber = 1; // todo use value from page path
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
