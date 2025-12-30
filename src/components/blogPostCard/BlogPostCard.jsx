import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Blog from '../../Pages/blog/Blog';
import SkeletonShow from '../Skeleton/Skeleton';
import { MyContext } from '../../context/Data/myState';

function BlogPostCard() {
  const { mode, getAllBlog, loading, error , getAllBlogs } = useContext(MyContext); 
  const navigate = useNavigate()
  useEffect(() => {
    getAllBlogs()
  }, [])
  const isDarkMode = mode === 'dark';

  return (
    <section className="py-12 animate-fade-in">
      <div className="container px-6 mx-auto max-w-7xl">
        {error ? (
          <div className={`p-10 rounded-[3rem] text-center border-2 border-dashed transition-all ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
            <div className={`inline-flex items-center justify-center p-6 rounded-full mb-6 ${isDarkMode ? 'bg-red-900/20 text-red-500' : 'bg-red-50 text-red-600'
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className={`text-2xl font-black uppercase tracking-widest mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Database Connection Error</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">{error}</p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {loading ? (
              /* Loading State */
              [1, 2, 3].map((i) => (
                <div key={i} className={`rounded-3xl border overflow-hidden transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                  }`}>
                  <SkeletonShow height="240px" />
                  <div className="p-6 space-y-4">
                    <div className="flex gap-2">
                      <SkeletonShow width="60px" height="20px" />
                      <SkeletonShow width="80px" height="20px" />
                    </div>
                    <SkeletonShow width="100%" height="28px" />
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-500/5">
                      <SkeletonShow width="32px" height="32px" className="rounded-full" />
                      <SkeletonShow width="120px" height="16px" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              getAllBlog.length === 0 ? (
                <div className="col-span-full py-20 text-center opacity-40">
                  <p className="text-xl font-bold uppercase tracking-widest text-slate-500">No articles available yet</p>
                </div>
              ) : (
                getAllBlog.map((item, key) => (
                  <Blog key={key} item={item} />
                ))
              )
            )}
          </div>
        )}

        {/* See More Button */}
        {getAllBlog.length > 0 && !error && !loading && (
          <div className="flex justify-center pt-8 border-t border-slate-500/10">
            <button
              onClick={() => navigate("/allblogs")}
              className={`px-8 py-3 font-bold rounded-2xl transition-all hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest shadow-xl ${isDarkMode
                ? 'bg-white text-slate-900 shadow-white/10'
                : 'bg-slate-900 text-white shadow-slate-900/20'
                }`}
            >
              Explore All Articles
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogPostCard