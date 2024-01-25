import { getDataFromEndpoint } from '../server-actions/getDataFromEndpoint/getDataFromEndpoint';

const baseURL = 'https://swapi.dev/api';

type Payload = {
  count: number;
  next: null | string;
  results: unknown[];
};

export default async function Category({ params }: { params: Record<string, string> }) {
  const { category } = params;
  // first page of category
  const urlOfFirstPage = `${baseURL}/${category}`;

  const responseData = await getDataFromEndpoint<Payload>(urlOfFirstPage);

  console.log(params, responseData);

  return (
    <div>
      <h2>{category}</h2>
      <code>{JSON.stringify(responseData, null, 4)}</code>
    </div>
  );
}
