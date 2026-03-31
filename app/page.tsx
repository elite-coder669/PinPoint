// app/page.tsx
import LandingPage from '@/components/Home';

export const metadata = {
  title: 'Protocol | Stop Re-prompting',
  description: 'A state-preserving canvas for high-fidelity creators.',
};

export default function Page() {
  return (
    <main>
      <LandingPage />
    </main>
  );
}