import { Star, Shield, CreditCard } from 'lucide-react';

export function SocialProof() {
  const testimonials = [
    {
      name: 'Priya S.',
      role: 'MBA Student, IIM Bangalore',
      content: 'Went from 2 interview calls to 8 in just one week. The AI rewrites are incredibly specific.',
      rating: 5
    },
    {
      name: 'Rahul M.',
      role: 'Consultant, Big 4',
      content: 'I thought my resume was good. RefineCV showed me it was just average. Now I\'m getting headhunter calls.',
      rating: 5
    },
    {
      name: 'Sneha K.',
      role: 'Product Manager, Startup',
      content: 'The ATS score feature is a game-changer. Finally understood why my applications were getting rejected.',
      rating: 5
    }
  ];

  const trustBadges = [
    {
      icon: CreditCard,
      text: 'No Credit Card Required'
    },
    {
      icon: Shield,
      text: 'GDPR Compliant'
    }
  ];

  return (
    <section className="py-20 bg-[#F7F7FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <p className="text-[#2762ea] font-bold text-lg mb-4">
            500+ students already waitlisted
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0F1C2A] mb-12">
            What Students Are Saying
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2762ea] to-[#5b8ef7] flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#0F1C2A]">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200"
            >
              <badge.icon className="w-5 h-5 text-[#2762ea]" />
              <span className="font-bold text-[#0F1C2A]">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
