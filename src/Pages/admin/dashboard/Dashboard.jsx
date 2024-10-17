import { useContext, useEffect, useState } from 'react'
import Layout from '../../../components/layout/Layout'
import myContext from '../../../context/data/myContext';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, firedb } from '../../../FireBase/FireBaseConfig';
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import TableShow from '../../../components/Table/TableShow';

function Dashboard() {

    const context = useContext(myContext);
    const { mode, getAllBlog, deleteBlogs } = context;
    const [isShow, setIsShow] = useState("user")
    const [users, setUsers] = useState([])
    const Navigate = useNavigate()

    const name = localStorage.getItem("NameUser")
    const email = localStorage.getItem("emmailUser")
    const image = localStorage.getItem("imageUser")
    const [user, setUser] = useState("")

    // getCuurentUser

    useEffect(() => {
        auth?.onAuthStateChanged(async (user) => {
            if (user) {


                const docsnap = await getDoc(doc(firedb, "users", user?.uid))


                if (docsnap.exists()) {

                    setUser(docsnap?.data());

                }
            }
        })
    }, [])



    const logout = () => {
        localStorage.removeItem("NameUser")
        localStorage.removeItem("emmailUser")
        localStorage.removeItem("imageUser")
        localStorage.removeItem("admin")
        setUser(null)
        auth.signOut(auth);
        Navigate('/')




    }

    // getAllUser
    async function getAllUser() {
        const q = query(collection(firedb, "users"), orderBy("name"))
        const querySnabShat = await getDocs(q);
        const data = querySnabShat.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        setUsers(data);


    }
    useEffect(() => { getAllUser() }, [])



    const FilteredPostforUser = getAllBlog.filter(post => post?.emailAuther === user?.email)

    return (

        // admin and writer 
        <div className="py-10">
            {/* header  */}

            <div
                className="flex flex-wrap justify-start items-center lg:justify-center gap-2 lg:gap-10 px-4 lg:px-0 mb-8">
                <div className="left imgdash">
                    <div className='role'>{user?.role === 1990 ? "ADMIN" : user?.role === 1995 ? "WRITER" : "USER"}</div>
                    <img
                        className=" w-40 h-40  object-cover rounded-full border-2 border-pink-600 p-1"
                        src={image || user?.image} alt="profile"
                    />
                </div>
                <div className="right">
                    <h1
                        className='text-center font-bold text-2xl mb-2'
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                        {name || user?.name}                      </h1>

                    <h2
                        style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                        Software Developer
                    </h2>
                    <h2
                        style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">{email || user?.email}
                    </h2>
                    <h2
                        style={{ color: mode === 'dark' ? 'white' : 'black' }} className="font-semibold">
                        <span>Total Blog : </span>  {FilteredPostforUser.length}
                    </h2>
                    <div className=" flex gap-2 mt-2">
                        <Link to={'/createblog'}>
                            <div className=" mb-2">
                                <Button
                                    style={{
                                        background: mode === 'dark'
                                            ? 'rgb(226, 232, 240)'
                                            : 'rgb(30, 41, 59)',
                                        color: mode === 'dark'
                                            ? 'black'
                                            : 'white'
                                    }}
                                    className='px-8 py-2'
                                >
                                    Create Blog
                                </Button>
                            </div>
                        </Link>

                        <div className="mb-2">
                            <Button
                                style={{
                                    background: mode === 'dark'
                                        ? 'rgb(226, 232, 240)'
                                        : 'rgb(30, 41, 59)',
                                    color: mode === 'dark'
                                        ? 'black'
                                        : 'white'
                                }}
                                className='px-8 py-2'
                                onClick={logout}
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* teble  */}


            <TableShow mode={mode} user={user} users={users} getAllBlog={getAllBlog} deleteBlogs={deleteBlogs} />



        </div>




    )
}

export default Dashboard
