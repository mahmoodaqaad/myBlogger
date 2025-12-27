import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firedb, storage } from "../../../Firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { MyContext } from "../../../context/Data/myState";

export default function Register() {
    const { mode } = useContext(MyContext);
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const isDarkMode = mode === 'dark';

    const register = async () => {
        if (!email || !password || !name || !image) {
            return toast.error("Please fill all required fields and upload an image")
        }
        setLoading(true)
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const id = res.user.uid
            uploadImage(id, res)
        } catch (e) {
            console.error(e);
            toast.error(e.message || "Registration failed");
            setLoading(false)
        }
    }

    const uploadImage = (id, authRes) => {
        if (!image) return;
        const imageRef = ref(storage, `usersImage/${image.name}`);

        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const userDocRef = doc(firedb, "users", id)
                try {
                    setDoc(userDocRef, {
                        role: 2000,
                        id: id,
                        email: email,
                        name: name,
                        image: url,
                        DateLogin: new Date().toLocaleString(
                            "en-US",
                            {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }
                        )
                    })
                    localStorage.setItem("admin", JSON.stringify(authRes))
                    localStorage.setItem("imageUser", url)
                    localStorage.setItem("NameUser", name)
                    localStorage.setItem("emailUser", email)

                    toast.success("Account created successfully")
                    navigate('/dashboard')
                } catch (error) {
                    toast.error("Database sync failed")
                    console.error(error)
                } finally {
                    setLoading(false)
                }
            });
        }).catch(err => {
            toast.error("Image upload failed")
            setLoading(false)
        });
    }

    return (
        <div className={`flex justify-center items-center min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
            }`}>
            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-1/4 -right-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -left-1/4 w-96 h-96 bg-accent-500 rounded-full blur-[120px]" />
            </div>

            <div className={`w-full max-w-xl p-8 sm:p-12 rounded-[3rem] relative z-10 animate-fade-in border backdrop-blur-2xl transition-all ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white/80 border-slate-100 shadow-2xl shadow-slate-200/50'
                }`}>
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/30 mb-6 group cursor-pointer transition-transform hover:rotate-6">
                        <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-10 w-10 invert" alt="logo" />
                    </div>
                    <h1 className={`text-4xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Create Account</h1>
                    <p className="text-slate-500 font-medium">Join our community of creative writers</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left: Avatar Upload */}
                    <div className="flex flex-col items-center justify-start space-y-4">
                        <label className={`text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Profile Photo</label>
                        <div className="relative group">
                            <div className={`w-36 h-36 rounded-full overflow-hidden border-4 transition-all ${isDarkMode ? 'border-slate-800 bg-slate-800' : 'border-white bg-slate-50 shadow-inner'
                                } group-hover:scale-105 group-hover:rotate-3`}>
                                {image ? (
                                    <img className="w-full h-full object-cover" src={URL.createObjectURL(image)} alt="avatar" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-300 mb-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                        </svg>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Click to upload</span>
                                    </div>
                                )}
                            </div>
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={e => setImage(e.target.files[0])}
                            />
                            <div className="absolute bottom-1 right-1 p-2 bg-primary-500 text-white rounded-full shadow-lg border-2 border-white dark:border-slate-900 scale-0 group-hover:scale-100 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Right: Inputs */}
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                            <input
                                type="text"
                                placeholder="Mahmmod Aqaad"
                                className={`w-full px-5 py-3 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
                                    }`}
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@domain.com"
                                className={`w-full px-5 py-3 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
                                    }`}
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className={`w-full px-5 py-3 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
                                    }`}
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button
                        onClick={register}
                        disabled={loading}
                        className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm"
                    >
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>

                    <p className={`mt-8 text-center text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        Already have an account?{' '}
                        <Link className="text-primary-500 font-black hover:underline underline-offset-4" to="/adminlogin">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 