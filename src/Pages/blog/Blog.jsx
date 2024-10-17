import { useContext } from "react";
import myContext from "../../context/data/myContext";
import { Link } from "react-router-dom";

const Blog = ({ item }) => {
  const context = useContext(myContext);

  const { mode, getAllBlog } = context;


  function createMarkup(c) {
    return { __html: c };
  }
  return (
    <Link to={`bloginfo/${item.id}`} className="p-4 md:w-1/3" >
      <div
        style={{
          background: mode === 'dark'
            ? 'rgb(30, 41, 59)'
            : 'white',
          borderBottom: mode === 'dark'
            ?
            ' 4px solid rgb(226, 232, 240)'
            : ' 4px solid rgb(30, 41, 59)'
          ,
          position: "relative",
          height: "460px"

        }}
        className={` h-full shadow-lg  hover:-translate-y-1 cursor-pointer hover:shadow-gray-400
               ${mode === 'dark'
            ? 'shadow-gray-700'
            : 'shadow-xl'
          } 
               rounded-xl overflow-hidden`}
      >
        {/* Blog Thumbnail  */}
        <img className=" w-full" style={{ width: "300px", height: "300px", objectFit: "cover", display: "block", margin: "auto" }} src={item.thumbnail} alt="blog" />

        {/* Top Items  */}
        <div className="p-6">
          {/* Blog Date  */}
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{
            color: mode === 'dark'
              ? 'rgb(226, 232, 240)'
              : ' rgb(30, 41, 59)'
          }}>
            {item.date}
          </h2>

          {/* Blog Title  */}
          <h1 className="title-font text-lg font-bold text-gray-900 mb-3" style={{
            color: mode === 'dark'
              ? 'rgb(226, 232, 240)'
              : ' rgb(30, 41, 59)'
          }}>
            {item.blogs.title}
          </h1>

          {/* Blog Description  */}

        </div>
        <div className="title-font text-lg auther font-bold text-gray-900 mb-3 p-2 flex align-center">
          Auther : <h1 className=" me-auto">{item.auther} </h1>
        </div>
      </div>
    </Link >
  )
}

export default Blog
