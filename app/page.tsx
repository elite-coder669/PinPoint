// app/page.tsx
// "use client"
import LandingPage from '@/components/Home';
export const metadata = {
  title: 'Pinpoint',
  description: 'A state-preserving canvas for high-fidelity creators.',
};

export default function page(){
  return (
    <LandingPage />
  )
}