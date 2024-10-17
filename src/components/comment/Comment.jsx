import { Button } from '@material-tailwind/react'
import { useContext, useEffect, useState } from 'react'
import myContext from '../../context/data/myContext';
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, Timestamp } from 'firebase/firestore';
import { auth, firedb } from '../../FireBase/FireBaseConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SkeletonShow from '../Skeleton/Skeleton';


function Comment({ id }) {

  const context = useContext(myContext);
  const { mode, loading, setloading } = context;

  const [commentText, setCommentText] = useState('');
  const navigate = useNavigate()

  const [user, setUser] = useState()

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
        toast.success('Comment Add Successfully');
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
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setAllComment(productsArray)
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
    <section className=" py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg lg:text-2xl font-bold" style={{ color: mode === 'dark' ? 'white' : 'black' }}>
            Make Comment
          </h2>
        </div>
        {/* Comment Form  */}
        <form className="mb-6">

          {/* Text Area  */}
          <div
            className="py-2 px-4 mb-4 rounded-lg rounded-t-lg 
          shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] border border-gray-200 "
            style={{
              background: mode === 'dark'
                ? '#353b48'
                : 'rgb(226, 232, 240)'
            }}
          >
            <label htmlFor="comment" className="sr-only">Your comment</label>
            <textarea onChange={e => setCommentText(e.target.value)} id="comment" rows={6} className="px-0 w-full text-sm border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 " style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }} placeholder="Write a comment..." required defaultValue={""} />
          </div>
          {/* Button  */}
          <div className="">
            <Button style={{
              background: mode === 'dark'
                ? 'rgb(226, 232, 240)'
                : 'rgb(30, 41, 59)',
              color: mode === 'dark'
                ? 'rgb(30, 41, 59)'
                : 'rgb(226, 232, 240)'
            }}
              onClick={addComment}      >
              Post comment
            </Button>
          </div>
        </form>

        {/* Bottom Item  */}
        {
          loading ?
            <div className='commentSkot'>
              <div className='flex gap-3 align-center'>
                <SkeletonShow className="rounded" width="55px" height="55px" />
                <SkeletonShow width="130px" />

              </div>
                ↳   <SkeletonShow height="50px" className="paddingLeft" width="90%" />

            </div>
            :
            allComment?.map((comment, key) => (<article key={key} className="p-6 mb-6 text-base rounded-lg " style={{ background: mode === 'dark' ? '#353b48' : 'rgb(226, 232, 240)' }}>
              <footer className="flex justify-between items-center mb-">
                <div className="flex items-center my-2 bg-white px-2 py-1 rounded-lg ">

                  <div>
                    <img className='r-img' style={{
                      "marginRight": "9px"
                    }} src={comment?.image} alt="" />
                  </div>
                  <p className="inline-flex items-center mr-3 text-lg  " style={{ color: mode === 'dark' ? 'black' : 'black' }}
                  >
                    {comment?.name}
                  </p>
                  <p className="text-sm " style={{ color: mode === 'dark' ? 'black' : 'black' }}
                  >
                    {comment?.date}
                  </p>
                </div>
              </footer>
              <p className="text-gray-500 dark:text-gray-400 text-md" style={{ color: mode === 'dark' ? 'white' : 'black' }}>↳<span> </span>{comment?.commentText}</p>
            </article>
            ))}
      </div>
    </section>
  )
}

export default Comment