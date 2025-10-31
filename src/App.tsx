import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { Process } from './components/Process';
import { TargetAudience } from './components/TargetAudience';
import { Pricing } from './components/Pricing';
import { WaitlistForm } from './components/WaitlistForm';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <TargetAudience />
      <Pricing />
      <WaitlistForm />
      <SocialProof />
      <Footer />
    </div>
  );
}

export default App;
