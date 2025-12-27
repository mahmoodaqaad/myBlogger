import { useContext, useEffect, useState, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { firedb } from '../../Firebase/FirebaseConfig';
import Comment from '../../components/comment/Comment';
import ShowContent from '../../components/ShowContent/ShowContent';
import SkeletonShow from '../../components/Skeleton/Skeleton';
import { MyContext } from '../../context/Data/myState';

const BlogInfo = () => {
  const { mode, loading, setloading } = useContext(MyContext);

  const [getBlogs, setGetBlogs] = useState()
  const [localError, setLocalError] = useState(null)
  const { id } = useParams()

  const isDarkMode = mode === 'dark';

  const getBlogData = useCallback(async () => {
    setloading(true);
    setLocalError(null);
    try {
      const docRef = doc(firedb, "blogPost", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setGetBlogs(docSnap.data());
      } else {
        setLocalError("This article no longer exists or the link is broken.");
      }
    } catch (error) {
      console.error("Fetch Blog Error:", error);
      setLocalError("Failed to load article. Please check your connection.");
    } finally {
      setloading(false)
    }
  }, [id, setloading]);

  useEffect(() => {
    getBlogData();
    window.scrollTo(0, 0)
  }, [getBlogData]);

  return (
    <section className={`min-h-screen py-16 sm:py-32 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="container mx-auto max-w-4xl px-6">
        {loading ? (
          <div className="space-y-16 animate-fade-in">
            <div className="text-center space-y-6">
              <SkeletonShow width="120px" height="20px" className="mx-auto rounded-lg" />
              <SkeletonShow width="85%" height="72px" className="mx-auto rounded-2xl" />
            </div>
            <SkeletonShow height="520px" className="rounded-[4rem]" />
            <div className="space-y-8">
              <SkeletonShow width="100%" height="28px" />
              <SkeletonShow width="95%" height="28px" />
              <SkeletonShow width="98%" height="28px" />
              <SkeletonShow width="65%" height="28px" />
            </div>
          </div>
        ) : localError ? (
          <div className="p-20 rounded-[5rem] text-center border-2 border-dashed glass-card">
            <div className={`inline-flex items-center justify-center p-8 rounded-full mb-10 ${isDarkMode ? 'bg-amber-900/20 text-amber-500' : 'bg-amber-50 text-amber-600'
              }`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <h2 className={`text-3xl font-black uppercase tracking-[0.2em] mb-6 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Something Went Wrong</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-12 text-lg font-medium leading-relaxed">{localError}</p>
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={getBlogData} className="btn-primary">Try Again</button>
              <Link
                to="/allblogs"
                className={`px-10 py-5 font-black uppercase tracking-widest rounded-2xl border-2 transition-all hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 active:scale-95 text-sm ${isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-600'
                  }`}
              >
                Back to Archives
              </Link>
            </div>
          </div>
        ) : (
          <article className="animate-fade-in">
            {/* Header Area */}
            <header className="mb-16 text-center">
              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="px-4 py-1.5 bg-primary-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl shadow-lg shadow-primary-500/20">
                  {getBlogs?.blogs?.category || 'Perspective'}
                </span>
                <span className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                  5 min read
                </span>
              </div>

              <h1 className={`text-5xl sm:text-8xl font-black tracking-tighter mb-12 leading-[0.95] ${isDarkMode ? 'text-white' : 'text-slate-900'
                }`}>
                {getBlogs?.blogs?.title}
              </h1>

              <div className="flex items-center justify-center gap-4">
                <div className={`flex items-center gap-4 p-2.5 pr-8 rounded-full border transition-all ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
                  }`}>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-black shadow-xl">
                    {getBlogs?.auther?.[0] || 'A'}
                  </div>
                  <div className="text-left">
                    <p className={`text-base font-black tracking-tight leading-none mb-1.5 ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                      {getBlogs?.auther}
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary-500">
                      {getBlogs?.date}
                    </p>
                  </div>
                </div>
              </div>
            </header>

            {/* Hero Image */}
            <div className="relative mb-20 group">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-[5rem] blur-3xl opacity-0 group-hover:opacity-100 transition duration-700" />
              <img
                alt={getBlogs?.blogs?.title}
                className="relative z-10 w-full aspect-video object-cover rounded-[5rem] shadow-2xl border-8 border-white dark:border-slate-900"
                src={getBlogs?.thumbnail}
              />
            </div>

            {/* Content Body */}
            <div className={`prose prose-lg sm:prose-2xl max-w-none mb-24 px-4 ${isDarkMode ? 'prose-invert prose-headings:text-white prose-p:text-slate-400 prose-p:font-medium' : 'prose-slate prose-p:text-slate-600 prose-p:font-medium'
              }`}>
              <ShowContent pargraph={getBlogs?.blogs?.content} />
            </div>

            {/* Author/Bio Footer Section */}
            <footer className="pt-20 border-t border-slate-500/10">
              <div className={`p-10 md:p-16 rounded-[4.5rem] border glass-card transition-all`}>
                <div className="flex flex-col sm:flex-row items-center gap-10 text-center sm:text-left">
                  <div className="w-28 h-28 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-5xl font-black shadow-inner overflow-hidden">
                    {getBlogs?.auther?.[0] || 'A'}
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-primary-500 mb-3">About The Editor</p>
                    <h3 className={`text-3xl font-black mb-4 tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {getBlogs?.auther}
                    </h3>
                    <p className={`text-lg leading-relaxed font-medium ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                          A senior contributor focused on the convergence of digital craftsmanship and human experience. Passionate about sharing insights that shape tomorrow{"'"}s technology landscape.
                    </p>
                  </div>
                </div>
              </div>
            </footer>

            <div className="mt-32">
              <Comment id={id} />
            </div>
          </article>
        )}
      </div>
    </section>
  )
}

export default BlogInfo;
