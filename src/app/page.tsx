import { Footer } from '@/components/layout/footer';
import { About } from '@/components/sections/about';
import { Career } from '@/components/sections/career';
import { Expertise } from '@/components/sections/expertise';
import { Hero } from '@/components/sections/hero';
import { Insights } from '@/components/sections/insights';
import { Interviews } from '@/components/sections/interviews';

export default function Page(_: PageProps<'/'>) {
  return (
    <>
      <Hero />
      <About />
      <Expertise />
      <Career />
      <Interviews />
      <Insights />
      <Footer />
    </>
  );
}
