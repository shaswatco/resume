import { FileText, X, TrendingDown } from 'lucide-react';

export function Problem() {
  const problems = [
    {
      icon: FileText,
      title: 'Generic CVs',
      description: 'Same resume for every job application',
      color: 'text-red-400'
    },
    {
      icon: X,
      title: 'ATS Rejections',
      description: '75% of resumes never reach human eyes',
      color: 'text-orange-400'
    },
    {
      icon: TrendingDown,
      title: 'No Metrics',
      description: 'Lack of quantified achievements and keywords',
      color: 'text-yellow-400'
    }
  ];

  return (
    <section className="py-20 bg-[#F7F7FE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0F1C2A] mb-6">
            Why Students Lose Job Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your resume is your first impression. Make it count.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6`}>
                <problem.icon className={`w-8 h-8 ${problem.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-[#0F1C2A] mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#2762ea] to-[#5b8ef7] rounded-2xl p-8 text-center shadow-2xl">
          <p className="text-2xl sm:text-3xl font-bold text-white">
            Only <span className="text-yellow-300">2%</span> of applicants get interviews.
            <br className="hidden sm:block" />
            Are you one of them?
          </p>
        </div>
      </div>
    </section>
  );
}
