import { ArrowDown } from 'lucide-react';

export function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById('waitlist-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F1C2A] via-[#1a2a3a] to-[#0F1C2A] pt-20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #2762ea 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-8 border border-white/20">
          <span className="text-[#2762ea]">✓</span>
          Built for MBA Students | Trusted by 500+ Job Seekers
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
          Your Resume Isn't Getting You
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2762ea] to-[#5b8ef7]">
            Shortlisted. We Fix That.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          RefineCV uses AI to transform your generic CV into role-specific, ATS-optimized resumes that actually get noticed by recruiters.
        </p>

        <button
          onClick={scrollToForm}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2762ea] to-[#5b8ef7] text-white text-lg font-bold rounded-full hover:shadow-2xl hover:shadow-[#2762ea]/50 transition-all duration-300 hover:scale-105"
        >
          Get Shortlisted
          <ArrowDown className="w-5 h-5 group-hover:animate-bounce" />
        </button>

        <p className="text-sm text-gray-400 mt-4">
          No credit card required • 5-minute setup
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="w-6 h-6 text-white/50" />
      </div>
    </section>
  );
}
