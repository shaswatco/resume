import { useState, FormEvent, useEffect } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [waitlistCount, setWaitlistCount] = useState(1000);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/waitlist_submissions?select=count`,
          {
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json',
              'Prefer': 'count=exact'
            }
          }
        );
        const count = response.headers.get('Content-Range')?.split('/')[1];
        if (count) {
          setWaitlistCount(parseInt(count) || 1000);
        }
      } catch (error) {
        console.error('Error fetching count:', error);
      }
    };
    fetchCount();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address');
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setIsSubmitting(false);
      setSubmitStatus('error');
      return;
    }

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-waitlist`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitStatus('success');
      setEmail('');
      setWaitlistCount(data.waitlist_count || waitlistCount + 1);
    } catch (error: any) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist-form" className="py-20 bg-gradient-to-br from-[#0F1C2A] to-[#1a2a3a] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #2762ea 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Get Shortlisted
          </h2>
          <p className="text-lg text-gray-300">
            Join {waitlistCount.toLocaleString()}+ students. Enter your email for early access.
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/20 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              You're Shortlisted!
            </h3>
            <p className="text-gray-300 text-lg">
              Check your email for next steps and early access details.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 sm:p-12 border border-white/20">
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-white font-bold mb-2 text-center">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-xl text-[#0F1C2A] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2762ea] text-lg"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {submitStatus === 'error' && errorMessage && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <p className="text-red-400 text-center">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#2762ea] to-[#5b8ef7] text-white py-4 px-8 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-[#2762ea]/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  'Get Shortlisted'
                )}
              </button>

              <p className="text-gray-400 text-sm text-center">
                Join the waitlist • Get early access • No spam, ever
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
