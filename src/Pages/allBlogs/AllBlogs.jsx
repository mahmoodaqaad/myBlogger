import { useContext } from 'react'
import Blog from '../../Pages/blog/Blog';
import SkeletonShow from '../../components/Skeleton/Skeleton';
import { MyContext } from '../../context/Data/myState';

function AllBlogs() {
  const { mode, getAllBlog, loading, error, retryFetch } = useContext(MyContext);

  const isDarkMode = mode === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      {/* Header Section */}
      <div className={`py-24 sm:py-32 ${isDarkMode ? 'bg-slate-900/50' : 'bg-primary-600'} text-white relative overflow-hidden transition-colors duration-300`}>
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-[0.2em] mb-6">
            The Knowledge Base
          </div>
          <h1 className="text-5xl sm:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
            Unified <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-200 via-white to-accent-200 italic">Thinking.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-primary-100 font-medium opacity-80 leading-relaxed">
            Discover a comprehensive archive of articles, perspectives, and tutorials designed for the modern creator and thinker.
          </p>
        </div>
      </div>

      <section className="py-20 sm:py-32">
        <div className="container px-6 mx-auto max-w-7xl animate-fade-in">
          {error ? (
            <div className={`p-16 rounded-[4rem] text-center border-2 border-dashed transition-all glass-card`}>
              <div className={`inline-flex items-center justify-center p-8 rounded-full mb-8 ${isDarkMode ? 'bg-red-900/20 text-red-500' : 'bg-red-50 text-red-600'
                }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <h2 className={`text-3xl font-black uppercase tracking-widest mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Connection Lost</h2>
              <p className="text-slate-500 max-w-lg mx-auto mb-10 text-lg font-medium">{error}</p>
              <button
                onClick={() => retryFetch?.()}
                className="btn-primary"
              >
                Restore Connectivity
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
              {loading ? (
                /* Loading State */
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className={`rounded-[2.5rem] border overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                    }`}>
                    <SkeletonShow height="280px" />
                    <div className="p-8 space-y-4">
                      <div className="flex gap-2">
                        <SkeletonShow width="60px" height="20px" />
                        <SkeletonShow width="80px" height="20px" />
                      </div>
                      <SkeletonShow width="100%" height="32px" />
                      <div className="flex items-center gap-3 pt-6 border-t border-slate-500/5">
                        <SkeletonShow width="40px" height="40px" className="rounded-full" />
                        <SkeletonShow width="140px" height="18px" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                getAllBlog.length === 0 ? (
                  <div className="col-span-full py-40 text-center opacity-20 flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-32 h-32 mb-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                    <p className="text-3xl font-black uppercase tracking-[0.3em] text-slate-500">No Archives Found</p>
                  </div>
                ) : (
                  getAllBlog.map((item, key) => (
                    <Blog key={key} item={item} />
                  ))
                )
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default AllBlogs;