import { Button } from '@material-tailwind/react'
import { useContext, useEffect, useState } from 'react'
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { auth, firedb } from '../../Firebase/FirebaseConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SkeletonShow from '../Skeleton/Skeleton';
import { MyContext } from '../../context/Data/myState';

function Comment({ id }) {
  const { mode, loading, setloading }= useContext(MyContext);

  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate()
  const [user, setUser] = useState()

  const isDarkMode = mode === 'dark';

  // get user
  const getcurnUser = async () => {
    try {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const docsnap = await getDoc(doc(firedb, "users", user.uid))
          if (docsnap.exists()) {
            setUser(docsnap.data());
          }
        }
      })
    } catch (e) {
      toast.error(e)
    }
  }

  useEffect(() => {
    getcurnUser()
  }, [])

  const addComment = async () => {
    if (auth?.currentUser) {
      if (!commentText.trim()) return;
      const commentRef = collection(firedb, "blogPost/" + `${id}/` + "comment")
      try {
        await addDoc(
          commentRef, {
          image: user.image,
          email: user.email,
          name: user.name,
          commentText,
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
        toast.success('Comment Added Successfully');
        setCommentText("")
      } catch (error) {
        console.error(error)
      }
    }
    else {
      navigate('/adminlogin')
    }
  }

  const [allComment, setAllComment] = useState([]);

  const getcomment = async () => {
    setloading(true)
    try {
      const q = query(
        collection(firedb, "blogPost/" + `${id}/` + "comment/"),
        orderBy('time')
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let commentArray = [];
        QuerySnapshot.forEach((doc) => {
          commentArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(commentArray)
        setloading(false)
      });
      return () => data;
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getcomment()
  }, []);

  return (
    <section className="py-12 lg:py-20 animate-fade-in">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-2xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Comments <span className="text-primary-500 font-bold ml-2">({allComment.length})</span>
          </h2>
        </div>

        {/* Comment Form */}
        <div className={`p-8 rounded-3xl border mb-12 shadow-sm ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-100'
          }`}>
          <div className="flex gap-4 mb-6">
            <img
              className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm"
              src={user?.image || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
              alt="avatar"
            />
            <div className="flex-1">
              <textarea
                onChange={e => setCommentText(e.target.value)}
                value={commentText}
                rows={4}
                className={`w-full p-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm resize-none ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-600' : 'border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                placeholder="What are your thoughts?"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={addComment}
              className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest"
            >
              Post Comment
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {loading ? (
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className={`p-6 rounded-3xl border ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                  <div className="flex gap-4 mb-4">
                    <SkeletonShow width="48px" height="48px" className="rounded-full" />
                    <div className="space-y-2 flex-1">
                      <SkeletonShow width="120px" height="16px" />
                      <SkeletonShow width="80px" height="12px" />
                    </div>
                  </div>
                  <SkeletonShow width="100%" height="40px" />
                </div>
              ))}
            </div>
          ) : (
            allComment?.map((comment, key) => (
              <article key={key} className={`p-6 rounded-3xl border transition-all hover:shadow-md ${isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-50'
                }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <img className='w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm' src={comment?.image || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="" />
                    <div>
                      <h4 className={`font-bold text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{comment?.name}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{comment?.date}</p>
                    </div>
                  </div>
                </div>
                <div className={`text-sm leading-relaxed pl-13 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {comment?.commentText}
                </div>
              </article>
            ))
          )}

          {!loading && allComment.length === 0 && (
            <div className="py-12 text-center opacity-50">
              <p className="text-slate-500 italic">No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Comment