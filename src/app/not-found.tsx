import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Page not found (404)</h1>
      <Link href="/">Go back</Link>
    </div>
  );
}
