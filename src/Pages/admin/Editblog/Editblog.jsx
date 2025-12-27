import { useState, useContext, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsArrowLeft } from "react-icons/bs"
import myContext from '../../../context/Data/myState';
import { Link, useNavigate, useParams } from "react-router-dom";
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { firedb } from '../../../Firebase/FirebaseConfig';
import Loading from '../../../components/Loading/Loading';
import ShowContent from '../../../components/ShowContent/ShowContent';

function Editblog() {
    const context = useContext(myContext);
    const { mode } = context;
    const [loading, setLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate();

    const [blogs, setBlogs] = useState({
        title: '',
        category: '',
        content: '',
    });

    const isDarkMode = mode === 'dark';

    const getBlogData = async () => {
        setLoading(true);
        try {
            const res = await getDoc(doc(firedb, "blogPost", id))
            if (res.exists()) {
                const data = res.data()
                setBlogs({
                    title: data.blogs.title,
                    category: data.blogs.category,
                    content: data.blogs.content,
                });
            } else {
                toast.error("Blog not found");
                navigate("/dashboard");
            }
        } catch (e) {
            console.error(e);
            toast.error("Failed to load blog data");
            navigate("/dashboard");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getBlogData()
    }, [])

    const handleEdit = async () => {
        if (blogs.title === "" || blogs.category === "" || blogs.content === "") {
            toast.error('Please Fill All Fields');
            return;
        }

        setLoading(true)
        const postRef = doc(firedb, "blogPost", id)
        try {
            await updateDoc(postRef, {
                blogs,
                EditTime: Timestamp.now()
            });
            toast.success("Article updated successfully");
            navigate("/dashboard");
        } catch (e) {
            console.error(e);
            toast.error("Failed to update article");
        } finally {
            setLoading(false)
        }
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
                            Edit <span className="text-primary-500">Article</span>
                        </h2>
                    </div>
                </div>

                {/* Main Form Container */}
                <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'
                    }`}>
                    <div className="p-8 space-y-8">
                        {/* Title & Category Inputs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={`block text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Article Title
                                </label>
                                <input
                                    type="text"
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
                                Article Content
                            </label>
                            <div className={`rounded-3xl overflow-hidden border ${isDarkMode ? 'border-slate-800 shadow-inner' : 'border-slate-100'}`}>
                                <Editor
                                    apiKey='g446uqbn2t8nk0ou4etgiut98y9skofgq2g8md61co69s89s'
                                    value={blogs.content}
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                                        content_style: 'body { font-family:Outfit,sans-serif; font-size:14px }',
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
                                onClick={handleEdit}
                                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest rounded-3xl shadow-xl shadow-primary-500/25 transition-all hover:-translate-y-1 active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Live Preview Area */}
                <div className="mt-20 space-y-8 animate-slide-up">
                    <div className="text-center">
                        <h2 className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            Article <span className="text-accent-500">Preview</span>
                        </h2>
                    </div>
                    <div className={`p-8 md:p-12 rounded-[3rem] border border-dashed transition-all ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-slate-50/50 border-slate-200'
                        }`}>
                        <article className="prose prose-slate dark:prose-invert max-w-none">
                            <h1 className="text-4xl font-black mb-8">{blogs.title || 'Draft Title'}</h1>
                            <ShowContent pargraph={blogs.content} />
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Editblog;