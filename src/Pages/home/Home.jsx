import { useContext } from 'react'
import HeroSection from '../../components/heroSection/HeroSection'
import BlogPostCard from '../../components/blogPostCard/BlogPostCard'
import { MyContext } from '../../context/Data/myState';

function Home() {
  const { mode } = useContext(MyContext);
  const isDarkMode = mode === 'dark';

  return (
    <div className={`overflow-x-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <HeroSection />

      {/* Stats / Impact Section */}
      <section className="py-20 bg-primary-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white">
            <div className="space-y-2">
              <h3 className="text-5xl font-black italic tracking-tighter transition-transform hover:scale-110 duration-500">1.2M</h3>
              <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">Annual Readers</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-black italic tracking-tighter transition-transform hover:scale-110 duration-500">500+</h3>
              <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">Expert Articles</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-black italic tracking-tighter transition-transform hover:scale-110 duration-500">50K+</h3>
              <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-70">Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Articles Section */}
      <div className="pt-20">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className={`text-4xl md:text-6xl font-black tracking-tight mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Featured <span className="text-primary-500">Perspectives.</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto">
            Explore our latest thinking on the intersect of digital design, culture, and tomorrow&apos;s technology.
          </p>
        </div>
        <BlogPostCard />
      </div>

      {/* Newsletter Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="container mx-auto px-6">
          <div className={`p-10 md:p-20 rounded-[4rem] relative overflow-hidden border transition-all duration-500 ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-100 shadow-2xl shadow-slate-200/50'
            }`}>
            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-accent-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/20 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Stay Ahead of the <span className="italic">Curve.</span>
              </h2>
              <p className="text-slate-500 text-lg md:text-xl font-medium mb-10 leading-relaxed">
                Join our private newsletter and receive weekly insights that you won&apos;t find on our public feed. No spam, just deep-dives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className={`flex-1 px-8 py-5 rounded-3xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-200 text-slate-900 placeholder-slate-300 shadow-inner'
                    }`}
                />
                <button className="px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase tracking-widest rounded-3xl shadow-2xl transition-all hover:scale-105 active:scale-95 text-sm">
                  Subscribe Now
                </button>
              </div>
              <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400 opacity-60">
                100% Privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home