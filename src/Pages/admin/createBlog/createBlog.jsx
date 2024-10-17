import { useState, useContext } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import myContext from '../../../context/data/myContext';
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
} from "@material-tailwind/react";
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { firedb, storage } from '../../../firebase/FirebaseConfig';
import Loading from '../../../components/Loading/Loading';
import Layout from '../../../components/layout/Layout';
import ShowContent from '../../../components/ShowContent/ShowContent';
function CreateBlog() {
  const context = useContext(myContext);
  const { mode, user } = context;
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  // const [blogs, setBlogs] = useState('');
  const [blogs, setBlogs] = useState({
    title: '',
    category: '',
    content: '',
    time: Timestamp.now(),
  });
  const [thumbnail, setthumbnail] = useState();

  //* Add Post Function 
  const addPost = async () => {
    if (blogs.title === "" || blogs.category === "" || blogs.content === "" || blogs.thumbnail === "") {
      toast.error('Please Fill All Fields');
      return false
    }
    uplconsole.error
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
          toast.error(error)
          console.log(error)
        } console.error
      });
    });
  }

  const [text, settext] = useState('');


  //* Create markup function 
  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <>
      {loading && <Loading />}
      <div className=' container mx-auto max-w-5xl py-6' >
        < div className="p-5" style={{
          background: mode === 'dark'
            ? '#353b48'
            : 'rgb(226, 232, 240)',
          borderBottom: mode === 'dark'
            ? ' 4px solid rgb(226, 232, 240)'
            : ' 4px solid rgb(30, 41, 59)'
        }
        }>
          {/* Top Item  */}
          < div className="mb-2 flex justify-between" >
            <div className="flex gap-2 items-center">
              {/* Dashboard Link  */}
              <Link to={'/dashboard'}>
                <BsFillArrowLeftCircleFill size={25} />
              </Link>

              {/* Text  */}
              <Typography
                variant="h4"
                style={{
                  color: mode === 'dark'
                    ? 'white'
                    : 'black'
                }}
              >
                Create blog
              </Typography>
            </div>
          </div >

          {/* main Content  */}
          < div className="mb-3" >
            {/* Thumbnail  */}
            {
              thumbnail && <img className=" w-full rounded-md mb-3 "
                src={thumbnail
                  ? URL.createObjectURL(thumbnail)
                  : ""}
                alt="thumbnail"
              />
            }

            {/* Text  */}
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-2 font-semibold"
              style={{ color: mode === 'dark' ? 'white' : 'black' }}
            >
              Upload Thumbnail
            </Typography>

            {/* First Thumbnail Input  */}
            <input
              type="file"
              label="Upload thumbnail"
              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              style={{
                background: mode === 'dark'
                  ? '#dcdde1'
                  : 'rgb(226, 232, 240)'
              }}
              onChange={(e) => {
                console.log(e);
                console.error
                setthumbnail(e.target.files[0])
              }}
            />
          </div >

          {/* Second Title Input */}
          < div className="mb-3" >
            <input
              label="Enter your Title"
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                  ? 'placeholder-black'
                  : 'placeholder-black'}`}
              placeholder="Enter Your Title"
              style={{
                background: mode === 'dark'
                  ? '#dcdde1'
                  : 'rgb(226, 232, 240)'
              }}
              name="title"
              onChange={(e) => setBlogs({ ...blogs, title: e.target.value })}
              value={blogs.title}
            />
          </div >

          {/* Third Category Input  */}
          < div className="mb-3" >
            <input
              label="Enter your Category"
              className={`shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] w-full rounded-md p-1.5 
                 outline-none ${mode === 'dark'
                  ? 'placeholder-black'
                  : 'placeholder-black'}`}
              placeholder="Enter Your Category"
              style={{
                background: mode === 'dark'
                  ? '#dcdde1'
                  : 'rgb(226, 232, 240)'
              }}
              name="category"
              onChange={(e) => setBlogs({ ...blogs, category: e.target.value })}
              value={blogs.category}

            />
          </div >

          {/* Four Editor  */}

          < Editor

            apiKey='g446uqbn2t8nk0ou4etgiut98y9skofgq2g8md61co69s89s'
            init={{
              plugins: [
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons',
                'image', 'link', 'lists', 'media', 'searchreplace', 'table',
                'visualblocks', 'wordcount', 'checklist', 'mediaembed',
                'casechange', 'export', 'formatpainter', 'pageembed',
                'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste',
                'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions',
                'tinycomments', 'tableofcontents', 'footnotes', 'mergetags',
                'autocorrect', 'typography', 'inlinecss', 'markdown',
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
              tinycomments_mode: 'embedded',
              tinycomments_author: 'Author name',
              mergetags_list: [
                { value: 'First.Name', title: 'First Name' },
                { value: 'Email', title: 'Email' },
              ],
              ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
            }}
            // 
            onEditorChange={(newValue, editor) => {
              setBlogs({ ...blogs, content: newValue });
              settext(editor.getContent({ format: 'text' }));
            }}
            // 
            onInit={(evt, editor) => {
              settext(editor.getContent({ format: 'text' }));
            }}
          />

          {/* Five Submit Button  */}
          <Button className=" w-full mt-5"
            onClick={addPost}
            style={{
              background: mode === 'dark'
                ? 'rgb(226, 232, 240)'
                : 'rgb(30, 41, 59)',
              color: mode === 'dark'
                ? 'rgb(30, 41, 59)'
                : 'rgb(226, 232, 240)'
            }}
          >
            Send
          </Button>

          {/* Six Preview Section  */}
          <div className="">
            <h1 className=" text-center mb-3 text-2xl">Preview</h1>
            <ShowContent pargraph={blogs.content}/>
          </div>
        </div >
      </div >

    </>
  )
}

export default CreateBlog