import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Layout from '../../../components/layout/Layout'
import { Button, Input, MenuItem, Select } from '@material-tailwind/react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firedb, storage } from '../../../Firebase/FirebaseConfig'
import { updateEmail } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import toast from 'react-hot-toast'
import Loading from '../../../components/Loading/Loading'
import { MyContext } from '../../../context/Data/myState'

const EditUser = () => {
    const [user, setUser] = useState()

    const [image, SetIamge] = useState()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        email: "",
        name: "",
        role: "",
        image: "",
        DateLogin: ""

    })
    const { mode } = useContext(MyContext);

    const { id } = useParams()
    const navigate = useNavigate();
    const getUser = async () => {
        setLoading(true)

        try {
            const res = await getDoc(doc(firedb, 'users', id))
            const data = res.data()
            setUser(res.data())
            setForm({
                name: data.name,
                email: data.email,
                role: data.role,
                DateLogin: data.DateLogin

            })
            setLoading(false)

        } catch (e) {
            console.error(e);

        }

    }
    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value })

    }

    useEffect(() => {


        getUser()
    }, [])

    const EditUserFun = async (e) => {


        e.preventDefault()


        try {

            if (form.email === auth?.currentUser?.email) {
                const user = auth?.currentUser;

                await updateEmail(user, form.email);
            }
            uploadImage()

        } catch (e) {
            console.error(e);
        }
    }
    const uploadImage = () => {
        // if (!image) return;
        setLoading(true)

        if (image) {

            const imageRef = ref(storage, `usersImage/${image.name}`);


            uploadBytes(imageRef, image).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {



                    const productRef = doc(firedb, "users", id)
                    try {
                        setDoc(productRef, {
                            role: Number(form.role),
                            id: id,
                            email: form.email,
                            name: form.name,
                            image: url,
                            DateLogin: form.DateLogin


                        })
                        setLoading(false)
                        toast.success("Edit success")
                        navigate("/dashboard")

                    } catch (error) {
                        setLoading(false)
                        toast.error("Edit Files")
                        console.error(error)
                    }
                });
            });
        }
        else {
            const productRef = doc(firedb, "users", id)
            try {
                setDoc(productRef, {
                    role: Number(form.role),
                    id: id,
                    email: form.email,
                    name: form.name,
                    image: user?.image,
                    DateLogin: form.DateLogin


                })
                setLoading(false)
                toast.success("Edit success")
                navigate("/dashboard")

            } catch (error) {
                setLoading(false)
                toast.error("Edit Files")
                console.error(error)
            }
        }
    }
    return (<>

        {loading && <Loading />}
        <div className="container mx-auto max-w-5xl py-6 px-2 mt-5">
            <form onSubmit={EditUserFun} className="flex flex-col gap-4 mt-5">
                {/* Input Email */}
                <Input
                    disabled={id === auth?.currentUser?.uid ? false : true}
                    value={form.email}
                    onChange={handleChange}
                    label="Email"
                    type="email"
                    name="email"
                    variant="outlined"
                    style={{
                        backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                        color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                    }}
                />

                {/* Input Text */}
                <Input
                    required
                    value={form.name}
                    onChange={handleChange}
                    label="Name"
                    type="text"
                    name="name"
                    variant="outlined"
                    style={{
                        backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                        color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                    }}
                />

                {/* Select Role */}
                <select
                    className="p-3"
                    name="role"
                    required
                    value={form.role}
                    onChange={handleChange}
                    style={{
                        backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                        color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                    }}
                >
                    <option value="">Select an Option</option>
                    <option value={1990}>Admin</option>
                    <option value={1995}>Writer</option>
                    <option value={2000}>User</option>
                </select>

                {/* Input Image */}
                <Input

                    onChange={(e) => SetIamge(e.target.files[0])}
                    label="Upload Image"
                    type="file"
                    style={{
                        backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                        color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                    }}
                />

                {/* Submit Button */}
                <Button
                    style={{
                        backgroundColor: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                        color: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                        width: "fit-content",
                    }}
                    className="py-3 px-7"
                    type="submit"
                >
                    Edit
                </Button>
            </form>
        </div>

    </>
    );
}

export default EditUser;
