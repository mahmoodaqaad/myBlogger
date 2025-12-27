import { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { MyContext } from "../../context/Data/myState";

const Blog = ({ item }) => {
  const { mode } = useContext(MyContext);

  const isDarkMode = mode === 'dark';

  return (
    <div className="p-4  animate-fade-in group">
      <Link to={`/bloginfo/${item?.id}`} className="block h-full">
        <div className={`h-full flex flex-col overflow-hidden rounded-[2.5rem] border transition-all duration-700 hover:-translate-y-4 ${isDarkMode
          ? 'bg-slate-900 border-slate-800 hover:border-primary-500/50 hover:shadow-[0_20px_50px_rgba(8,112,184,0.15)]'
          : 'bg-white border-slate-100 hover:border-primary-200 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
          }`}>

          {/* Image Section */}
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 z-10" />
            <img
              className="w-full h-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
              src={item?.thumbnail || 'https://via.placeholder.com/600x400'}
              alt={item?.blogs?.title}
              loading="lazy"
            />
            {/* Category Badge - Minimalist */}
            <div className="absolute top-6 left-6 z-20">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] shadow-xl">
                {item?.blogs?.category || 'Article'}
              </span>
            </div>

            {/* Read More Overlay */}
            <div className="absolute bottom-6 left-6 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                Begin Reading
                <div className="w-8 h-[1px] bg-primary-400 group-hover:w-12 transition-all duration-500" />
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-5">
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {item?.date}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500/30" />
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                5m Insight
              </span>
            </div>

            <h2 className={`text-2xl font-black tracking-tight mb-4 leading-[1.15] transition-colors group-hover:text-primary-500 ${isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
              {item?.blogs?.title}
            </h2>

            <p className={`text-sm leading-relaxed line-clamp-3 mb-8 font-medium italic ${isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
              {item?.blogs?.content ? item.blogs.content.replace(/<[^>]*>/g, '').substring(0, 120) + '...' : 'Delve into the core concepts and latest developments in this expert analysis.'}
            </p>

            {/* Author Section - Premium Footnote */}
            <div className="mt-auto pt-8 border-t border-slate-500/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-500 rounded-full blur-md opacity-0 group-hover:opacity-20 transition-opacity" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-primary-600 dark:text-primary-400 font-black text-xs shadow-sm relative z-10">
                    {item?.auther?.[0] || 'A'}
                  </div>
                </div>
                <div>
                  <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-slate-300' : 'text-slate-800'}`}>
                    {item?.auther}
                  </p>
                  <p className="text-[9px] font-bold text-primary-500/50 uppercase tracking-widest">Thought Leader</p>
                </div>
              </div>

              <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:text-white ${isDarkMode ? 'border-slate-800 text-slate-600' : 'border-slate-100 text-slate-300'
                }`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

Blog.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    date: PropTypes.string,
    auther: PropTypes.string,
    blogs: PropTypes.shape({
      title: PropTypes.string,
      category: PropTypes.string,
      content: PropTypes.string,
    }),
  }).isRequired,
};

export default Blog;
