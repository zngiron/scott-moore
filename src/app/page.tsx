import { Career } from '@/components/sections/career';
import { Expertise } from '@/components/sections/expertise';
import { Hero } from '@/components/sections/hero';
import { Interviews } from '@/components/sections/interviews';

export default function Page(_: PageProps<'/'>) {
  return (
    <>
      <Hero />
      <Expertise />
      <Career />
      <Interviews />
    </>
  );
}
