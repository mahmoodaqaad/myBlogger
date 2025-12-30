import { createContext, useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { auth, firedb } from '../../Firebase/FirebaseConfig';
import toast from 'react-hot-toast';
export const MyContext = createContext()
// eslint-disable-next-line react/prop-types
function MyState({ children }) {
    const [mode, setMode] = useState('light');
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null); // Added global error state

    const [searchkey, setSearchkey] = useState('');
    const [loading, setloading] = useState(false);
    const [getAllBlog, setGetAllBlog] = useState([]);

    const getcurnUser = async () => {
        auth?.onAuthStateChanged(async (user) => {
            try {
                if (user) {
                    const docsnap = await getDoc(doc(firedb, "users", user?.uid))
                    if (docsnap.exists()) {
                        setUser(docsnap?.data());
                    }
                } else {
                    setUser(null);
                }
            } catch (e) {
                console.error("Auth Fetch Error:", e);
                // Don't toast for auth check usually, just log
            }
        })
    }

    useEffect(() => {
        getcurnUser()
    }, [])

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        } else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    // function getAllBlogs() {
    //     console.log("this");
    //     setloading(true);
    //     setError(null); // Reset error before fetch
    //     try {
    //         const q = query(
    //             collection(firedb, "blogPost"),
    //             orderBy('time')
    //         );

    //         const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    //             let blogArray = [];
    //             QuerySnapshot.forEach((doc) => {
    //                 blogArray.push({ ...doc.data(), id: doc.id });
    //             });

    //             setGetAllBlog(blogArray);
    //             setloading(false);

    //         }, (err) => {
    //             // This callback handles Firestore connection/permission errors
    //             console.error("Firestore Snapshot Error:", err);
    //             setError("Failed to connect to the database. Please check your connection.");
    //             setloading(false);
    //             toast.error("Connectivity issue detected");
    //         });

    //         return () => unsubscribe();
    //     } catch (err) {
    //         console.error("Setup error:", err);
    //         setError("An unexpected error occurred.");
    //         setloading(false);
    //     }
    // }


    async function getAllBlogs() {
        setloading(true);
        setError(null);
        try {
            const q = query(collection(firedb, "blogPost"), orderBy('time','desc'));
            const querySnapshot = await getDocs(q);
            const blogArray = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setGetAllBlog(blogArray); // تحديث state مرة واحدة
        } catch (err) {
            console.error("Firestore Fetch Error:", err);
            setError("Failed to load articles.");
            toast.error("Failed to fetch articles.");
        } finally {
            setloading(false);
        }
    }


    useEffect(() => {
        getAllBlogs();
    }, []);

    const deleteBlogs = async (id) => {
        try {
            await deleteDoc(doc(firedb, "blogPost", id));
            toast.success("Blog deleted successfully")
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Failed to delete blog. You may not have permission.");
        }
    }

    return (
        <MyContext.Provider value={{
            mode,
            toggleMode,
            searchkey,
            setSearchkey,
            loading,
            setloading,
            getAllBlog,
            deleteBlogs,
            user,
            setUser,
            error, // Export error state
            getAllBlogs // Allow components to trigger a retry
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState