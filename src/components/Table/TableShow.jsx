import { deleteDoc, doc } from 'firebase/firestore'
import React, { useState } from 'react'
import { firedb } from '../../FireBase/FireBaseConfig'
import { Link, useNavigate } from 'react-router-dom'

const TableShow = (props) => {

    const [isShow, setIsShow] = useState("user")
    const Navigate = useNavigate()
    const FilteredPostforUser = props.getAllBlog.filter(post => post?.emailAuther === props.user?.email)


    const stylenoPostYet = {
        textAlign: "center", color: "red", textTransform: "uppercase", fontWeight: "bold", fontSize: "24px", padding: "20px"
    }

    return (


        props.user?.role === 1990 ?
            // user 
            <>

                {/* Admin  */}
                <div className='flex align-center'>
                    <Link onClick={() => setIsShow("user")} className='btn btn-primary'>USERS</Link>
                    <Link onClick={() => setIsShow("post")} className='btn btn-secandrey'>POST</Link>
                    {/* <Link to="/addUser" ><Button className=''>AddUser</Button></Link> */}
                </div>
                {/* Line  */}
                <hr className={`border-2
                 ${props.mode === 'dark'
                        ? 'border-gray-300'
                        : 'border-gray-400'}`
                }
                />
                {
                    isShow === "user" ?
                        <>

                            {/* Table  */}
                            <div className="">
                                <div className=' container mx-auto px-4 max-w-7xl my-5' >
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                                        {/* table  */}
                                        <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                                            {/* thead  */}
                                            <thead
                                                style={{
                                                    background: props.mode === 'dark'
                                                        ? '#aaa'
                                                        : 'rgb(30, 41, 59)'
                                                }}
                                                className="text-xs ">
                                                <tr>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        S.No
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
Image                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Name
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Email
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Role
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Date Login
                                                    </th>

                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            {/* tbody  */}
                                            <tbody>
                                                {props.users.map((userItem, key) => (
                                                    <tr key={key} className=" border-b-2" style={{ background: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}>

                                                        <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                            {key + 1}
                                                        </td>

                                                        {/* Blog Thumbnail  */}
                                                        < td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} scope="row" className="px-6 py-4 font-medium " >
                                                            {/* thumbnail  */}
                                                            < img className='w-16 rounded-lg' src={userItem?.image} alt="thumbnail" />
                                                        </ td>



                                                        {/* Blog Title  */}
                                                        <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                            {userItem?.name}{userItem.email === props.user.email && " (You)"}
                                                        </td >


                                                        {/* Blog Category  */}
                                                        <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                            {userItem?.email}
                                                        </td>

                                                        {/* Blog date  */}
                                                        <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                            {userItem?.role === 1990 ? "Admin" : userItem?.role === 1995 ? "Writer" : "user"}
                                                        </td>

                                                        {/* Blog date  */}
                                                        <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                            {userItem?.DateLogin}
                                                        </td>


                                                        {/* Blog date  */}
                                                        <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4 flex gap-2 justify-center align-center" >
                                                            <button onClick={() => Navigate(`/EditUser/${userItem.id}`)} className='ms-2 px-4 py-1 rounded-lg text-white font-bold bg-green-500'>
                                                                Edit
                                                            </button>
                                                      
                                                        </td>
                                                    </tr>
                                                ))

                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>

                        </>

                        :


                        <>
                            {/* post  */}
                            {/* Table  */}
                            <div className="">
                                <div className=' container mx-auto px-4 max-w-7xl my-5' >
                                    <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                                        {/* table  */}
                                        <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                                            {/* thead  */}
                                            <thead
                                                style={{
                                                    background: props.mode === 'dark'
                                                        ? '#aaa'
                                                        : 'rgb(30, 41, 59)'
                                                }}
                                                className="text-xs ">
                                                <tr>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        S.No
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Thumbnail
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Title
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Category
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Date
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Auther
                                                    </th>
                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Email  Auther
                                                    </th>

                                                    <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>

                                            {/* tbody  */}
                                            <tbody>
                                                {
                                                    props.getAllBlog.length == 0 ?
                                                        <tr><td colSpan={12} style={stylenoPostYet}>Loading ...</td></tr> :
                                                        (props.getAllBlog.length > 0 ?
                                                            props.getAllBlog.map((item, key) => (
                                                                <tr key={key} className=" border-b-2" style={{ background: item.emailAuther == props.user?.email ? (props.mode === 'dark' ? '#2f2f2f' : '#bcbcbc') : props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}>

                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                        {key + 1}
                                                                    </td>

                                                                    {/* Blog Thumbnail  */}
                                                                    < td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} scope="row" className="px-6 py-4 font-medium " >
                                                                        {/* thumbnail  */}
                                                                        < img className='w-16 rounded-lg' src={item.thumbnail} alt="thumbnail" />
                                                                    </ td>



                                                                    {/* Blog Title  */}
                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                        {item.blogs.title}
                                                                    </td >


                                                                    {/* Blog Category  */}
                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                        {item.blogs.category}
                                                                    </td>

                                                                    {/* Blog date  */}
                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                        {item.date}
                                                                    </td>

                                                                    {/* Blog date  */}
                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                        {item.auther}
                                                                    </td>

                                                                    {/* Blog date  */}
                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                        {item.emailAuther}
                                                                    </td>



                                                                    {/* Blog date  */}
                                                                    <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4 flex " >
                                                                        <button onClick={() => deleteBlogs(item.id)} className=' px-4 py-1 rounded-lg text-white font-bold bg-red-500'>
                                                                            Delete
                                                                        </button>
                                                                        <button onClick={() => Navigate(`/Editblog/${item.id}`)} className='ms-2 px-4 py-1 rounded-lg text-white font-bold bg-green-500'>
                                                                            Edit
                                                                        </button>
                                                                    </td>
                                                                </tr>

                                                            ))

                                                            : <tr> <td colSpan={12} style={stylenoPostYet}>No post yet</td></tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </>


                }

            </>






























            // writer 
            : props.user?.role === 1995 ?

                <>
                    {/* writere  */}
                    {/* Line  */}
                    <hr className={`border-2
                 ${props.mode === 'dark'
                            ? 'border-gray-300'
                            : 'border-gray-400'}`
                    }
                    />


                    <>

                        {/* Table  */}
                        <div className="">
                            <div className=' container mx-auto px-4 max-w-7xl my-5' >
                                <div className="relative overflow-x-auto shadow-md sm:rounded-xl">
                                    {/* table  */}
                                    <table className="w-full border-2 border-white shadow-md text-sm text-left text-gray-500 dark:text-gray-400" >
                                        {/* thead  */}
                                        <thead
                                            style={{
                                                background: props.mode === 'dark'
                                                    ? '#aaa'
                                                    : 'rgb(30, 41, 59)'
                                            }}
                                            className="text-xs ">
                                            <tr>
                                                <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                    S.No
                                                </th>
                                                <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                    Thumbnail
                                                </th>
                                                <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                    Title
                                                </th>
                                                <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                    Category
                                                </th>
                                                <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                    Date
                                                </th>

                                                <th style={{ color: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }} scope="col" className="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        {/* tbody  */}
                                        <tbody>
                                            {
                                                props.getAllBlog.length == 0 ?
                                                    <tr><td colSpan={12} style={stylenoPostYet}>Loading ...</td></tr> :
                                                    (FilteredPostforUser.length > 0 ?
                                                        FilteredPostforUser.map((item, key) => (
                                                            <tr key={key} className=" border-b-2" style={{ background: props.mode === 'dark' ? 'rgb(30, 41, 59)' : 'white' }}>

                                                                <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                    {key + 1}
                                                                </td>

                                                                {/* Blog Thumbnail  */}
                                                                < td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} scope="row" className="px-6 py-4 font-medium " >
                                                                    {/* thumbnail  */}
                                                                    < img className='w-16 rounded-lg' src={item.thumbnail} alt="thumbnail" />
                                                                </ td>



                                                                {/* Blog Title  */}
                                                                <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                    {item.blogs.title}
                                                                </td >


                                                                {/* Blog Category  */}
                                                                <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                    {item.blogs.category}
                                                                </td>

                                                                {/* Blog date  */}
                                                                <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4" >
                                                                    {item.date}
                                                                </td>



                                                                {/* Blog date  */}
                                                                <td style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="px-6 py-4 flex " >
                                                                    <button disabled={user?.email === item?.emailAuther ? false : true} onClick={() => deleteBlogs(item.id)} className=' px-4 py-1 rounded-lg text-white font-bold bg-red-500'>
                                                                        Delete
                                                                    </button>
                                                                    <button disabled={user?.email === item?.emailAuther ? false : true} onClick={() => Navigate(`/Editblog/${item.id}`)} className='ms-2 px-4 py-1 rounded-lg text-white font-bold bg-green-500'>
                                                                        Edit
                                                                    </button>
                                                                </td>
                                                            </tr>

                                                        ))

                                                        : <tr> <td colSpan={12} style={stylenoPostYet}>No post yet</td></tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </>






                </>
                :
                ""

    )
}

export default TableShow
