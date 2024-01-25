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

  const urlOfFirstPage = `${baseURL}/${category}/?page=1`;
  const initialData = await getDataFromEndpoint<Payload>(urlOfFirstPage);

  return (
    <div>
      <h2>{category}</h2>
      <CategoryContent
        category={category}
        initialData={initialData}
        urlOfFirstPage={urlOfFirstPage}
      />
    </div>
  );
}
