import { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsArrowLeft } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firedb, storage } from '../../../Firebase/FirebaseConfig';
import Loading from '../../../components/Loading/Loading';
import ShowContent from '../../../components/ShowContent/ShowContent';
import { MyContext } from '../../../context/Data/myState';

function CreateBlog() {
  const context = useContext(MyContext);
  const mode = context?.mode || 'light';
  const user = context?.user || null;  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState({
    title: '',
    category: '',
    content: '',
    time: Timestamp.now(),
  });
  const [thumbnail, setthumbnail] = useState();

  const isDarkMode = mode === 'dark';

  //* Add Post Function 
  const addPost = async () => {
    if (blogs.title === "" || blogs.category === "" || blogs.content === "" || !thumbnail) {
      toast.error('Please Fill All Fields');
      return false
    }
    uploadImage()
  }

  //* Upload Image Function 
  const uploadImage = () => {
    if (!thumbnail) return;
    setLoading(true)
    const imageRef = ref(storage, `blogimage/${thumbnail.name}`);

    uploadBytes(imageRef, thumbnail).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const productRef = collection(firedb, "blogPost")
        try {
          addDoc(productRef, {
            auther: user?.name,
            emailAuther: user?.email,
            IDAuther: user?.id,
            blogs,
            thumbnail: url,
            time: Timestamp.now(),
            date: new Date().toLocaleString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )
          })
          navigate('/dashboard')
          toast.success('Post Added Successfully');
        } catch (error) {
          toast.error("Failed to add post");
          console.error(error);
        } finally {
          setLoading(false)
        }
      });
    }).catch(() => {
      toast.error("Failed to upload image");
      setLoading(false);
    });
  }

  return (
    <section className="py-12 animate-fade-in">
      {loading && <Loading />}
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header Area */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard"
              className={`p-2 rounded-xl transition-all shadow-sm ${isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-white text-slate-600 hover:text-slate-900'
                }`}
            >
              <BsArrowLeft size={24} />
            </Link>
            <h2 className={`text-2xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Create <span className="text-primary-500">New Article</span>
            </h2>
          </div>
        </div>

        {/* Main Form Container */}
        <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
          }`}>
          <div className="p-8 space-y-8">
            {/* Thumbnail Upload */}
            <div className="space-y-4">
              <label className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Article Cover Image
              </label>
              <div className={`relative group border-2 border-dashed rounded-3xl p-4 transition-all ${isDarkMode ? 'border-slate-800 bg-slate-800/20' : 'border-slate-100 bg-slate-50/50'
                }`}>
                {thumbnail ? (
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner">
                    <img className="w-full h-full object-cover" src={URL.createObjectURL(thumbnail)} alt="thumbnail" />
                    <button
                      onClick={() => setthumbnail(null)}
                      className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg transition-all"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center aspect-video cursor-pointer">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6.75v12.5a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Choose a thumbnail</span>
                    <span className="text-xs text-slate-500 mt-2">Highly recommended 16:9 aspect ratio</span>
                    <input type="file" className="hidden" onChange={(e) => setthumbnail(e.target.files[0])} />
                  </label>
                )}
              </div>
            </div>

            {/* Title & Category Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Article Title
                </label>
                <input
                  type="text"
                  placeholder="The Future of Web Dev..."
                  className={`w-full px-6 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
                    }`}
                  value={blogs.title}
                  onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  Category
                </label>
                <input
                  type="text"
                  placeholder="Technology, Lifestyle, etc."
                  className={`w-full px-6 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
                    }`}
                  value={blogs.category}
                  onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
                />
              </div>
            </div>

            {/* Content Editor */}
            <div className="space-y-4">
              <label className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                What{"'"}s on your mind?
              </label>
              <div className={`rounded-3xl overflow-hidden border ${isDarkMode ? 'border-slate-800 shadow-inner' : 'border-slate-100'}`}>
                <Editor
                  apiKey='g446uqbn2t8nk0ou4etgiut98y9skofgq2g8md61co69s89s'
                  init={{
                    selector: "textarea",
                    
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
                    ],
                    toolbar: 'undo redo | blocks | bold italic forecolor | image | preview |link | code | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    content_style: 'body { font-family:Outfit,sans-serif; font-size:14px }',
                    link_default_target: '_blank',
                    skin: isDarkMode ? 'oxide-dark' : 'oxide',
                    content_css: isDarkMode ? 'dark' : 'default',
                  }}
                  onEditorChange={(content) => setBlogs({ ...blogs, content })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                onClick={addPost}
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-primary-500/25 transition-all hover:-translate-y-1 active:scale-95"
              >
                Publish Article
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview Area */}
        <div className="mt-20 space-y-8 animate-slide-up">
          <div className="text-center">
            <h2 className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Live <span className="text-accent-500">Preview</span>
            </h2>
          </div>
          <div className={`p-8 md:p-12 rounded-[3rem] border border-dashed transition-all ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50/50 border-slate-200'
            }`}>
            {blogs.content ? (
              <article className="prose prose-slate dark:prose-invert max-w-none">
                <h1 className="text-4xl font-black mb-8">{blogs.title || 'Draft Title'}</h1>
                {thumbnail && <img className="w-full rounded-3xl shadow-2xl mb-12" src={URL.createObjectURL(thumbnail)} alt="preview" />}
                <ShowContent pargraph={blogs.content} />
              </article>
            ) : (
              <div className="py-20 text-center text-slate-400 italic font-medium">
                Start writing to see the preview here...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateBlog;