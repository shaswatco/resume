import { Target, Bot, BarChart3, TrendingUp } from 'lucide-react';

export function Solution() {
  const features = [
    {
      icon: Target,
      title: 'JD-CV Matching',
      description: 'Upload resume + job description, get instant fit score',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Bot,
      title: 'AI-Powered Rewrite',
      description: 'Transform bullet points with quantified achievements',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: 'ATS Score',
      description: 'See exactly why you\'re getting rejected',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: TrendingUp,
      title: 'Track Improvements',
      description: 'Dashboard shows before/after metrics',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1C2A] mb-6">
            How RefineCV Gets You Shortlisted
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stop playing the numbers game. Start getting results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#2762ea]/30"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1C2A] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
