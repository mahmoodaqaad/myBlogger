import { useContext, useState } from "react";
import {
  Input,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firedb } from "../../../Firebase/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MyContext } from "../../../context/Data/myState";

export default function AdminLogin() {
  const { mode } = useContext(MyContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isDarkMode = mode === 'dark';

  const login = async () => {
    if (!email || !password) {
      return toast.error("Please fill all required fields")
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login Success")
      localStorage.setItem("admin", JSON.stringify(res))

      try {
        await updateDoc(doc(firedb, "users", res.user.uid), {
          DateLogin: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          )
        })
        const userDoc = await getDoc(doc(firedb, "users", res.user.uid))
        const userData = userDoc.data();

        localStorage.setItem("imageUser", userData?.image || '')
        localStorage.setItem("NameUser", userData?.name || '')
        localStorage.setItem("emailUser", userData?.email || '')

        navigate("/")
      } catch (e) {
        console.error(e);
        navigate("/") // Still navigate if metadata update fails
      }
    } catch (e) {
      console.error(e);
      return toast.error(e.message || "Login failed")
    }
  }

  return (
    <div className={`flex justify-center items-center min-h-screen relative overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}>
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-accent-500 rounded-full blur-[100px]" />
      </div>

      {/* Login Card */}
      <div className={`w-full max-w-md p-8 sm:p-12 rounded-[3rem] relative z-10 animate-fade-in border backdrop-blur-xl transition-all ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white/80 border-slate-100 shadow-2xl shadow-slate-200/50'
        }`}>
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/30 mb-6 group cursor-pointer transition-transform hover:rotate-6">
            <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-10 w-10 invert" alt="Login Icon" />
          </div>
          <h1 className={`text-4xl font-black tracking-tight mb-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Welcome Back</h1>
          <p className="text-slate-500 font-medium">Please enter your credentials to login</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-1">
            <label className={`text-[10px] font-black uppercase tracking-widest ml-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email Address</label>
            <input
              type="email"
              placeholder="name@domain.com"
              className={`w-full px-5 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
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
              className={`w-full px-5 py-4 rounded-2xl border bg-transparent focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm font-medium ${isDarkMode ? 'border-slate-800 text-white placeholder-slate-700' : 'border-slate-100 text-slate-900 placeholder-slate-300'
                }`}
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/25 transition-all hover:-translate-y-1 active:scale-95 text-sm"
            onClick={login}
          >
            Sign In
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Don't have an account?{' '}
            <Link className="text-primary-500 font-black hover:underline underline-offset-4" to="/Register">
              Join us today
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 