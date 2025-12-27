import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth, firedb } from '../../../Firebase/FirebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import TableShow from '../../../components/Table/TableShow';
import { MyContext } from '../../../context/Data/myState';

function Dashboard() {
    const { mode, getAllBlog, deleteBlogs, user, error: globalError } = useContext(MyContext);
    const [users, setUsers] = useState([])
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState(null);
    const navigate = useNavigate()

    const storedName = localStorage.getItem("NameUser")
    const storedEmail = localStorage.getItem("emailUser") // Fixed typo emmailUser -> emailUser
    const storedImage = localStorage.getItem("imageUser")

    const logout = () => {
        localStorage.clear(); // Clear all for safety
        auth.signOut();
        navigate('/')
    }

    async function getAllUser() {
        setUserLoading(true);
        setUserError(null);
        try {
            const q = query(collection(firedb, "users"), orderBy("name"))
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setUsers(data);
        } catch (err) {
            console.error("Dashboard Fetch Users Error:", err);
            setUserError("Failed to load user list");
        } finally {
            setUserLoading(false);
        }
    }

    useEffect(() => {
        getAllUser();
    }, [])

    const FilteredPostforUser = getAllBlog.filter(post => post?.emailAuther === user?.email)

    return (
        <div className={`min-h-screen py-12 ${mode === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
            <div className="container mx-auto px-4 max-w-7xl animate-fade-in">
                {/* Header / Profile Card */}
                <div className={`mb-12 p-8 rounded-3xl ${mode === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-100 shadow-xl shadow-slate-200/50'
                    } border`}>
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full opacity-75 blur transition duration-300 group-hover:opacity-100" />
                            <div className="relative">
                                <img
                                    className="w-40 h-40 object-cover rounded-full border-4 border-white dark:border-slate-800 shadow-2xl"
                                    src={user?.image || storedImage || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                                    alt="profile"
                                />
                                <div className="absolute -top-2 -left-2">
                                    <span className="px-3 py-1 rounded-full bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                                        {user?.role === 1990 ? "ADMIN" : user?.role === 1995 ? "WRITER" : "USER"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-black tracking-tight mb-2">
                                {user?.name || storedName || "Explorer"}
                            </h1>
                            <p className="text-primary-500 font-bold mb-4 uppercase tracking-widest text-xs">
                                {user?.role === 1990 ? "System Administrator" : "Creative Contributor"}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-8 mt-2">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email</span>
                                    <span className="font-medium">{user?.email || storedEmail}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Articles</span>
                                    <span className="font-medium">{FilteredPostforUser.length}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <Link to="/createblog">
                                    <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest">
                                        Create Article
                                    </button>
                                </Link>
                                <button
                                    onClick={logout}
                                    className={`px-6 py-3 font-bold rounded-2xl border transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 text-sm uppercase tracking-widest ${mode === 'dark' ? 'border-slate-700 text-slate-300' : 'border-slate-200 text-slate-600'
                                        }`}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className={`rounded-3xl overflow-hidden min-h-[400px] flex flex-col ${mode === 'dark' ? 'bg-slate-800/30' : 'bg-white shadow-xl shadow-slate-200/50'
                    }`}>
                    {(globalError || userError) ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                            <div className={`inline-flex items-center justify-center p-6 rounded-full mb-6 ${mode === 'dark' ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-500'
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-black uppercase tracking-widest mb-2">Connectivity Issue</h2>
                            <p className="text-slate-500 max-w-md mx-auto mb-8 font-medium">
                                {globalError || userError || "We're having trouble connecting to the database. Please check your internet connection and try again."}
                            </p>
                        </div>
                    ) : (
                        <TableShow mode={mode} user={user} users={users} getAllBlog={getAllBlog} deleteBlogs={deleteBlogs} loading={userLoading} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
