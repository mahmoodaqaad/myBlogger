import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import myContext from '../../context/data/myContext';
import { doc, getDoc } from 'firebase/firestore';
import { firedb } from '../../FireBase/FireBaseConfig';
import Loading from '../../components/Loading/Loading';
import Layout from '../../components/layout/Layout';
import Comment from '../../components/comment/Comment';
import SkeletonShow from '../../components/Skeleton/Skeleton'
import ShowContent from '../../components/ShowContent/ShowContent';
const BlogInfo = () => {
  const context = useContext(myContext);
  const { mode, loading, setloading } = context;

  // function create

  const [getBlogs, setGetBlogs] = useState()
  const { id } = useParams()







  const getAllBlogs = async () => {
    setloading(true);
    try {
      const productTemp = await getDoc(doc(firedb, "blogPost", id))
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.error("Document does not exist")
      }
      setloading(false)
    } catch (error) {
      console.error(error)
      setloading(false)
    }
  }


  useEffect(() => {
    getAllBlogs();
    window.scrollTo(0, 0)
  }, []);

  //* Create markup function 
  function createMarkup(c) {
    return { __html: c };
  }

  return (


    <section className="rounded-lg h-full overflow-hidden max-w-4xl mx-auto px-4 ">
      <div className=" py-4 lg:py-8">
        {loading ? <>
          <SkeletonShow
            height={"500px"}
            length={1}
            className={"col-md-4 col-lg-1 col-6"}
          />

          <div className="flex justify-between items-center mb-3">
            <SkeletonShow
              height={"20px"}
              width={"400px"}
              length={1}
              className={"m-0"}

            />
            <SkeletonShow
              height={"20px"}
              width={"120px"}
              length={1}
              className={"m-0"}

            />
          </div>

          <div
            className={`border-b mb-5 ${mode === 'dark' ?
              'border-gray-600' : 'border-gray-400'}`}
          />
          <SkeletonShow
            height={"30px"}
            length={5}
            className={"m-0"}

          />
          <SkeletonShow
            height={"20px"}
            width={"120px"}
            length={1}
            className={"m-0"}

          />
        </> :
          <div style={{ width: "700px", margin: "auto", maxWidth: "70%", position: "relative" }} >
            {/* 
          Thumbnail  */}
            <img alt="content" className="mb-3 rounded-lg h-full w-full"
              src={getBlogs?.thumbnail}
            />

            {/* title And date  */}
            <div className="flex justify-between items-center mb-3">
              <h1 style={{ color: mode === 'dark' ? 'white' : 'black' }}
                className=' text-xl md:text-2xl lg:text-2xl font-semibold'>
                {getBlogs?.blogs?.title}
              </h1>
              <p style={{ color: mode === 'dark' ? 'white' : 'black' }}>
                {getBlogs?.date}
              </p>
            </div>
            <div
              className={`border-b mb-5 ${mode === 'dark' ?
                'border-gray-600' : 'border-gray-400'}`}
            />

            {/* blog Content  */}
            <ShowContent pargraph={getBlogs?.blogs.content} />
            <div style={{ position: "absolute", right: "0px", bottom: "80px" }} className="title-font text-lg auther font-bold text-gray-900 mb-3 p-2 flex align-center">
              Auther : <h1 className=" me-auto">{getBlogs?.auther} </h1>
            </div>
          </div>}
      </div>

      <Comment id={id} />
    </section>
  )
}

export default BlogInfo
