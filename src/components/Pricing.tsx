import { Check, Sparkles } from 'lucide-react';

export function Pricing() {
  const scrollToForm = () => {
    const formSection = document.getElementById('waitlist-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const benefits = [
    'Free resume audit (worth ₹499)',
    '50% lifetime discount for early users',
    'Priority access at launch (January 2026)',
    'Bonus: Interview prep checklist'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2762ea]/10 to-[#5b8ef7]/10 rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-[#2762ea]" />
            <span className="text-[#2762ea] font-bold">Pre-Launch Offer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1C2A] mb-6">
            Join Early, Save Big
          </h2>
        </div>

        <div className="relative bg-gradient-to-br from-[#2762ea] to-[#5b8ef7] p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <p className="text-white/80 text-lg mb-2">Early Bird Special</p>
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/50 text-3xl line-through">₹999</span>
                <span className="text-white text-5xl sm:text-6xl font-black">FREE</span>
              </div>
              <p className="text-white/80 mt-2">For first 1,000 users</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                    <span className="text-white text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full bg-white text-[#2762ea] py-4 px-8 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              Claim Your Spot Now
            </button>

            <p className="text-white/60 text-center mt-4 text-sm">
              No credit card required • Join 1,000+ students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
