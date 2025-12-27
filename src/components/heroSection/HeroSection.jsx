import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/Data/myState';

function HeroSection() {
  const { mode } = useContext(MyContext);
  const navigate = useNavigate();

  const isDarkMode = mode === 'dark';

  return (
    <section className={`relative min-h-[90vh] flex items-center overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
      }`}>
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-30 animate-pulse ${isDarkMode ? 'bg-primary-900' : 'bg-primary-100'
          }`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] opacity-20 animate-pulse [animation-delay:2s] ${isDarkMode ? 'bg-accent-900' : 'bg-accent-100'
          }`} />

        {/* Floating Spheres */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-primary-500/40 animate-bounce [animation-duration:4s]" />
        <div className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-accent-500/30 animate-bounce [animation-duration:6s]" />
        <div className="absolute top-1/2 right-1/3 w-3 h-3 rounded-full bg-primary-400/50 animate-bounce [animation-duration:5s]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20 text-center flex flex-col items-center">
        {/* Badge */}
        {/* <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] mb-10 animate-fade-in shadow-xl shadow-primary-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Curated Design & Tech
        </div> */}

        {/* Main Heading */}
        <h1 className="max-w-5xl text-6xl sm:text-8xl font-black tracking-tight mb-8 leading-[1] animate-slide-up">
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500">Digital Stories</span> for the Future.
        </h1>

        {/* Subtitle */}
        <p className={`max-w-3xl text-lg sm:text-2xl font-medium leading-relaxed mb-12 animate-slide-up [animation-delay:200ms] ${isDarkMode ? 'text-slate-500' : 'text-slate-500'
          }`}>
          Explore a premium collection of deep-dives, creative tutorials, and cutting-edge tech perspectives curated by <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>MAHMOOD AQAAD</span>.
        </p>

        {/* CTA Stack */}
        <div className="flex flex-col sm:flex-row items-center gap-6 animate-slide-up [animation-delay:400ms]">
          <button
            onClick={() => navigate('/allblogs')}
            className="px-10 py-5 bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-2xl shadow-primary-500/30 transition-all hover:-translate-y-2 active:scale-95 text-sm"
          >
            Start Exploring
          </button>
          <button
            className={`px-10 py-5 font-black uppercase tracking-widest rounded-2xl border-2 transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 active:scale-95 text-sm ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
              }`}
          >
            Our Mission
          </button>
        </div>

        {/* Stats Preview / Social Proof */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 opacity-40 animate-fade-in [animation-delay:800ms]">
          {[
            { label: 'Articles', val: '250+' },
            { label: 'Readers', val: '10K+' },
            { label: 'Experience', val: '8 YRS' },
            { label: 'Rating', val: '4.9/5' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl font-black tracking-tighter mb-1">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg className={`relative block w-full h-[80px] ${isDarkMode ? 'text-slate-950' : 'text-gray-50'}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}

export default HeroSection