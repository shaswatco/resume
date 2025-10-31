export function Header() {
  const scrollToForm = () => {
    const formSection = document.getElementById('waitlist-form');
    formSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1C2A]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/WhatsApp Image 2025-10-30 at 21.26.03.jpeg"
              alt="RefineCV Logo"
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-black text-white">RefineCV</h1>
              <p className="text-xs text-gray-400">PRECISION EDITING</p>
            </div>
          </div>

          <button
            onClick={scrollToForm}
            className="px-6 py-2 bg-gradient-to-r from-[#2762ea] to-[#5b8ef7] text-white font-bold rounded-full hover:shadow-lg hover:shadow-[#2762ea]/50 transition-all duration-300 hover:scale-105"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
}
