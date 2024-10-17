import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Blog from '../blog/Blog';
import SkeletonShow from '../../components/Skeleton/Skeleton';

function AllBlogs() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;

  const navigate = useNavigate();
  return (
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">
          {/* Top Heading  */}
          <div className="mb-5">
            <h1 className=' text-center text-2xl font-bold'
              style={{ color: mode === 'dark' ? 'white' : 'black' }}>
              All Blogs
            </h1>
          </div>
          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Card 1  */}
            {getAllBlog.length == 0 ?
              <>
                <div className="SkeletonShowStyle" style={{ background: mode ==="dark" ? "#1e293b" : "#fefefe" }}>

                  <SkeletonShow height="300px" />
                  <div className='px-2'>     <SkeletonShow height="30px" width="80%" />
                    <SkeletonShow height="30px" width="190px" className="autherSket" /></div>
                </div>
                <div className="SkeletonShowStyle" style={{ background: mode ==="dark" ? "#1e293b" : "#fefefe" }}>

                  <SkeletonShow height="300px" />
                  <div className='px-2'>     <SkeletonShow height="30px" width="80%" />
                    <SkeletonShow height="30px" width="190px" className="autherSket" /></div>
                </div>
                <div className="SkeletonShowStyle" style={{ background: mode ==="dark" ? "#1e293b" : "#fefefe" }}>

                  <SkeletonShow height="300px" />
                  <div className='px-2'>     <SkeletonShow height="30px" width="80%" />
                    <SkeletonShow height="30px" width="190px" className="autherSket" /></div>
                </div>



              </>
              :
              (
                getAllBlog.length > 0
                  ?
                  <>
                    {getAllBlog.map((item, key) => {
                      return (
                        <Blog key={key} item={item} />

                      )
                    })}
                  </>
                  :
                  <>
                    <h1 className='text-xl font-bold'>Not Found</h1>
                  </>
              )
            }
          </div>
        </div>
      </section >
  )
}

export default AllBlogs