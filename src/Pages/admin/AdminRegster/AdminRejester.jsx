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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firedb, storage } from "../../../FireBase/FireBaseConfig";
import Layout from "../../../components/layout/Layout";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

export default function Register() {
    const context = useContext(myContext);
    const { mode } = context;

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    useEffect(() => {

    },)
    const register = async () => {


        if (!email || !password) {

            return toast.error("fill all required Fileds")
        }
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password)
            const id = auth.currentUser.uid

            uploadImage(id)
            toast.success("Register Success")
            localStorage.setItem("admin", JSON.stringify(res))
            navigate("/dashboard")

        } catch (e) {
            console.log(e);

            toast.error("error", { position: "top-center" })


        }
    }
    const uploadImage = (id) => {
        if (!image) return;
        const imageRef = ref(storage, `usersImage/${image.name}`);


        uploadBytes(imageRef, image).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {



                const productRef = doc(firedb, "users", id)
                try {
                    setDoc(productRef, {
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
                    localStorage.setItem("imageUser", url)
                    localStorage.setItem("NameUser", name)
                    localStorage.setItem("emailUser", email)

                    navigate('/')


                } catch (error) {
                    toast.error(error)
                    console.error(error)
                }
            });
        });
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
                            Register
                        </Typography>
                    </CardHeader>

                    {/* CardBody */}
                    <CardBody>
                        <form className=" flex flex-col gap-4">
                            {/* First Input  */}
                            {
                                image ? <img className="imgUser" src={URL.createObjectURL(image)} />
                                    : ""}

                            <div>
                                <Input
                                    type="file"
                                    label="image"
                                    name="iamge"
                                    onChange={e => setImage(e.target.files[0])}
                                />
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    label="Name"
                                    name="name"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

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
                                onClick={register}>
                                Register
                            </Button>
                        </form>
                        <p style={{
                            color: mode === 'dark'
                                ? '#eee'
                                : '#222'
                        }} className="mt-3 text-right">Do have an acount ? <Link className="link" to="/adminlogin">Login</Link></p>

                    </CardBody>
                </Card>
            </div>

    );
} 