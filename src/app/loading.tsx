import Marquee from 'react-fast-marquee';

export default function Loading() {
  return (
    <Marquee direction="right" speed={100}>
      <p>Loading</p>
    </Marquee>
  );
}
