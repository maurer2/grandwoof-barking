'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <h2>Error</h2>
      <p>{error.message}</p>
    </>
  );
}
