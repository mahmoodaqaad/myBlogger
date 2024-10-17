import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import myContext from "../../../context/data/myContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firedb } from "../../../FireBase/FireBaseConfig";
import Layout from "../../../components/layout/Layout";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function AdminLogin() {
  const context = useContext(myContext);
  const { mode } = context;

  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {

  },)
  const login = async () => {


    if (!email || !password) {

      return toast.error("fill all required Fileds")
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login Success")
      localStorage.setItem("admin", JSON.stringify(res))

      navigate("/")
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
        const users = await getDoc(doc(firedb, "users", res.user.uid))

        localStorage.setItem("imageUser", users.data().image)
        localStorage.setItem("NameUser", users.data().name)
        localStorage.setItem("emailUser", users.data().email)

      } catch (e) {

        console.error(e);

      }


    } catch (e) {
      console.error(e);

      return toast.error(e.massage)


    }
  }


  return (

      <div className="flex justify-center items-center h-screen" style={{ background: mode === "light" ? "#f3f3f3" : "#666" }}>

        {/* Card  */}
        <Card
          className="w-full max-w-[24rem]"
          style={{
            background: mode === 'dark'
              ? 'rgb(30, 41, 59)'
              : 'rgb(226, 232, 240)'
          }}
        >
          {/* CardHeader */}
          <CardHeader
            color="blue"
            floated={false}
            shadow={false}
            className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
            style={{
              background: mode === 'dark'
                ? 'rgb(148 148 148)'
                : 'rgb(30, 41, 59)'
            }}
          >
            <div className="mb-4 rounded-full border border-white/10 bg-white/10 p-2 text-white">
              <div className=" flex justify-center">
                {/* Image  */}
                <img src="https://cdn-icons-png.flaticon.com/128/727/727399.png" className="h-20 w-20"
                />
              </div>
            </div>

            {/* Top Haeding  */}
            <Typography variant="h4" style={{
              color: mode === 'dark'
                ? 'rgb(30, 41, 59)'
                : 'rgb(226, 232, 240)'
            }}>
              Admin Login
            </Typography>
          </CardHeader>

          {/* CardBody */}
          <CardBody>
            <form className=" flex flex-col gap-4">
              {/* First Input  */}
              <div>
                <Input
                  type="email"
                  label="Email"
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              {/* Second Input  */}
              <div>
                <Input
                  type="password"
                  label="Password"
                  onChange={e => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              {/* Login Button  */}
              <Button
                style={{
                  background: mode === 'dark'
                    ? 'rgb(226, 232, 240)'
                    : 'rgb(30, 41, 59)',
                  color: mode === 'dark'
                    ? 'rgb(30, 41, 59)'
                    : 'rgb(226, 232, 240)'
                }}
                onClick={login}>
                Login
              </Button>
            </form>
            <p style={{
              color: mode === 'dark'
                ? '#eee'
                : '#222'
            }} className="mt-3 text-right">Do Not have an acount ? <Link className="link" to="/Register">Register</Link></p>
          </CardBody>
        </Card>
      </div>

  );
} 