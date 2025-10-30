import { GraduationCap, Briefcase } from 'lucide-react';

export function TargetAudience() {
  const audiences = [
    {
      icon: GraduationCap,
      title: 'MBA Students',
      subtitle: 'Primary',
      description: 'Transitioning from academics to corporate roles. Need resumes that highlight leadership, projects, and potential.',
      gradient: 'from-[#2762ea] to-[#5b8ef7]'
    },
    {
      icon: Briefcase,
      title: 'UG Graduates & Professionals',
      subtitle: 'Secondary',
      description: 'Early career professionals looking to switch roles or industries. Need to showcase transferable skills.',
      gradient: 'from-gray-700 to-gray-900'
    }
  ];

  return (
    <section className="py-20 bg-[#F7F7FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1C2A] mb-6">
            Who's It For?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Built for ambitious students and early professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#2762ea]/30"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${audience.gradient} flex items-center justify-center flex-shrink-0`}>
                  <audience.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#0F1C2A] mb-1">
                    {audience.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#2762ea]/10 to-[#5b8ef7]/10 text-[#2762ea] text-sm font-bold rounded-full">
                    {audience.subtitle}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
