import { Button } from '@material-tailwind/react'
import { useContext } from 'react'
import myContext from '../../context/data/myContext';
import {  useNavigate } from 'react-router-dom';
import Blog from '../../Pages/blog/Blog';
import SkeletonShow from '../Skeleton/Skeleton';

function BlogPostCard() {
  const context = useContext(myContext);
  const { mode, getAllBlog } = context;

  const navgaite = useNavigate()

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto max-w-7xl ">

          {/* Main Content  */}
          <div className="flex flex-wrap justify-center -m-4 mb-5">
            {/* Card 1  */}
            {getAllBlog.length == 0 ?
              <>
                <div className="SkeletonShowStyle" style={{ background:  mode ==="dark" ? "#1e293b" : "#fefefe" }}>

                  <SkeletonShow height="300px" />
                  <div className='px-2'>     <SkeletonShow height="30px" width="80%" />
                    <SkeletonShow height="30px" width="190px" className="autherSket" /></div>
                </div>
                <div className="SkeletonShowStyle" style={{ background:  mode ==="dark" ? "#1e293b" : "#fefefe" }}>

                  <SkeletonShow height="300px" />
                  <div className='px-2'>     <SkeletonShow height="30px" width="80%" />
                    <SkeletonShow height="30px" width="190px" className="autherSket" /></div>
                </div>
                <div className="SkeletonShowStyle" style={{ background:  mode ==="dark" ? "#1e293b" : "#fefefe" }}>

                  <SkeletonShow height="300px" />
                  <div className='px-2'>     <SkeletonShow height="30px" width="80%" />
                    <SkeletonShow height="30px" width="190px" className="autherSket" /></div>
                </div>



              </>
              : (

                getAllBlog.length > 0 ?
                  getAllBlog.map((item, key) => (
                    <Blog key={key} item={item} />


                  ))


                  : <h1>Not Found</h1>
              )}





          </div>

          {/* See More Button  */}
          <div className="flex justify-center my-5">
            <Button
              style={{
                background: mode === 'dark'
                  ? 'rgb(226, 232, 240)'
                  : 'rgb(30, 41, 59)',
                color: mode === 'dark'
                  ?
                  'rgb(30, 41, 59)'
                  : 'rgb(226, 232, 240)'
              }} onClick={() => navgaite("/allblogs")}>
              See More
            </Button>
          </div>
        </div>
      </section >
    </div >
  )
}

export default BlogPostCard