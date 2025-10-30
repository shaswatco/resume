import { Upload, FileSearch, Download, Clock } from 'lucide-react';

export function Process() {
  const steps = [
    {
      number: '1',
      icon: Upload,
      title: 'Upload resume',
      description: 'Share your current CV with our AI'
    },
    {
      number: '2',
      icon: FileSearch,
      title: 'Paste job description',
      description: 'Add the role you\'re targeting'
    },
    {
      number: '3',
      icon: Download,
      title: 'Download optimized resume',
      description: 'Get your ATS-ready resume instantly'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0F1C2A] to-[#1a2a3a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #2762ea 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6">
            3 Steps to Better Shortlists
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Simple, fast, effective. No learning curve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#2762ea] to-[#5b8ef7] flex items-center justify-center text-white font-black text-xl shadow-lg">
                {step.number}
              </div>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2762ea]/20 to-[#5b8ef7]/20 flex items-center justify-center mb-6 mt-4">
                <step.icon className="w-8 h-8 text-[#5b8ef7]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-[#2762ea]/20 to-[#5b8ef7]/20 backdrop-blur-sm rounded-full px-6 py-4 border border-[#2762ea]/30 max-w-md mx-auto">
          <Clock className="w-6 h-6 text-[#5b8ef7]" />
          <p className="text-white font-bold text-lg">
            Takes 5 minutes. Lasts a career.
          </p>
        </div>
      </div>
    </section>
  );
}
