import { Fragment, useContext, useState } from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/Data/myState";

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const { mode, searchkey, setSearchkey, getAllBlog } = useContext(MyContext);
  const navigate = useNavigate();

  const filteredSearch = getAllBlog?.filter(item =>
    item?.blogs?.title?.toLowerCase().includes(searchkey.toLowerCase()) ||
    item?.blogs?.category?.toLowerCase().includes(searchkey.toLowerCase())
  ).slice(0, 6); // Limit results for a cleaner palette

  const isDarkMode = mode === 'dark';

  return (
    <Fragment>
      <div
        onClick={handleOpen}
        className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors"
        title="Search"
      >
        <AiOutlineSearch size={22} className={isDarkMode ? "text-white" : "text-black"} />
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        className={`bg-transparent shadow-none outline-none transition-all ${open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
      >
        <DialogBody className="p-0">
          <div className={`relative overflow-hidden rounded-3xl border shadow-2xl transition-all duration-300 ${isDarkMode
            ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-xl'
            : 'bg-white/95 border-slate-100 text-slate-900 backdrop-blur-xl'
            }`}>
            {/* Search Input Area */}
            <div className="flex items-center p-6 border-b border-slate-500/10">
              <AiOutlineSearch className={`mr-4 text-2xl ${isDarkMode ? 'text-primary-400' : 'text-primary-500'}`} />
              <input
                type="text"
                placeholder="Search articles, categories..."
                className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-slate-500 outline-none"
                autoFocus
                onChange={(e) => setSearchkey(e.target.value)}
                value={searchkey}
              />
              <div className="hidden sm:block">
                <kbd className="px-2 py-1 text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-400 border border-slate-200 dark:border-slate-700">ESC</kbd>
              </div>
            </div>

            {/* Results Section */}
            <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
              {searchkey.length > 0 ? (
                filteredSearch.length > 0 ? (
                  <div className="grid gap-2">
                    <p className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Search Results</p>
                    {filteredSearch.map((item, key) => (
                      <div
                        key={key}
                        onClick={() => {
                          navigate(`/bloginfo/${item.id}`);
                          handleOpen();
                        }}
                        className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all hover:translate-x-1 ${isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50'
                          }`}
                      >
                        <img className="w-14 h-14 rounded-xl object-cover shadow-sm" src={item.thumbnail} alt="" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold truncate">{item.blogs.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold uppercase tracking-widest">
                              {item.blogs.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                          </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-slate-300 group-hover:text-primary-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
                      <AiOutlineSearch size={32} />
                    </div>
                    <p className="text-slate-500 font-medium">No results found for {"{searchkey}"}</p>
                  </div>
                )
              ) : (
                <div className="py-8 px-4">
                  <p className="text-center text-slate-400 text-sm italic">Type something to search articles...</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'bg-slate-50/50 border-slate-100'}`}>
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Powered By AQAAD.</p>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[8px] bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">↵</kbd>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Select</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 text-[8px] bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">↑↓</kbd>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Navigate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}