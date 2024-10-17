import { useEffect, useState } from 'react'
import MyContext from './myContext';
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { auth, firedb } from '../../firebase/FirebaseConfig';
import toast from 'react-hot-toast';

function MyState({ children }) {
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const [user, setUser] = useState()
    const getcurnUser = async () => {






        auth?.onAuthStateChanged(async (user) => {
            try {
                if (user) {


                    const docsnap = await getDoc(doc(firedb, "users", user?.uid))


                    if (docsnap.exists()) {

                        setUser(docsnap?.data());

                    }
                }
            } catch (e) { toast.error("filed" + e) }
        })

    }
    useEffect(() => {
        getcurnUser()
    }, [])

    const toggleMode = () => {


        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(17, 24, 39)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }

    //* search state
    const [searchkey, setSearchkey] = useState('');

    //* loading state
    const [loading, setloading] = useState(false);

    //* getAllBlog State 
    const [getAllBlog, setGetAllBlog] = useState([]);

    //* getAllBlogs Function
    function getAllBlogs() {
        setloading(true);
        try {
            const q = query(
                collection(firedb, "blogPost"),
                orderBy('time')
            );
            /////////////
            const data = onSnapshot(q, (QuerySnapshot) => {
                let blogArray = [];
                QuerySnapshot.forEach((doc) => {
                    blogArray.push({ ...doc.data(), id: doc.id });
                });

                setGetAllBlog(blogArray)
                // console.error(blogArray)
                setloading(false)
            });
            /////////////////////
            return () => data;
        } catch (error) {
            console.error(error)
            setloading(false)
        }
    }



    useEffect(() => {


        getAllBlogs();
    }, []);

    // Blog Delete Function 
    const deleteBlogs = async (id) => {
        try {
            await deleteDoc(doc(firedb, "blogPost", id));
            getAllBlogs()
            toast.success("Blogs deleted successfully")
        } catch (error) {
            console.error(error)
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
            user, setUser
        }}>
            {children}
        </MyContext.Provider>
    )
}

export default MyState