import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from '../../../components/layout/Layout'
import { Button, Input, MenuItem, Select } from '@material-tailwind/react'
import myContext from '../../../context/Data/myState'
import { addDoc, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, firedb, storage } from '../../../Firebase/FirebaseConfig'
import { createUserWithEmailAndPassword, getAdditionalUserInfo, updateEmail } from 'firebase/auth'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const AddUser = () => {
    const context = useContext(myContext);
    const [image, SetIamge] = useState()
    const [form, setForm] = useState({
        email: "",
        name: "",
        role: "",
        password: "",
        image: ""

    })
    const { mode } = context;

    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value })

    }

    const AddUserFun = async (e) => {



        e.preventDefault()


        try {

            const res = createUserWithEmailAndPassword(auth, form.email, form.password)
            console.error(res);

            const id = auth.currentUser.uid

            uploadImage(id)


        } catch (e) {
            console.error(e);
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
                        role: form.role,
                        id: id,
                        email: form.email,
                        name: form.name,
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
                    window, location.pathname = '/dashboard'


                } catch (error) {
                    console.error(error)
                }
            });
        });
    }

    return (
        <Layout>
            <div className='container mx-auto max-w-5xl py-6'>
                <form onSubmit={AddUserFun} className="flex flex-col gap-4">

                    {/* Input Text */}
                    <Input
                        required
                        value={form.name}
                        onChange={handleChange}
                        label="Name"
                        type="text"
                        name='name'
                        variant="outlined"
                        fullWidth
                        style={{
                            backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                            color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                        }}
                        InputLabelProps={{
                            style: {
                                color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        }}
                    />

                    {/* Input Email */}
                    <Input
                        value={form.email}
                        onChange={handleChange}
                        label="Email"
                        type="email"
                        name='email'
                        variant="outlined"
                        fullWidth
                        style={{
                            backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                            color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                        }}
                        InputLabelProps={{
                            style: {
                                color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        }}
                    />

                    {/* Input Email */}
                    <Input
                        value={form.password}
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        name='password'
                        variant="outlined"
                        fullWidth
                        style={{
                            backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                            color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                        }}
                        InputLabelProps={{
                            style: {
                                color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        }}
                    />


                    {/* Select */}
                    <select className='p-3'
                        name='role'
                        required
                        value={form.role}
                        onChange={handleChange}
                        style={{
                            backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                            color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                        }}
                    >
                        <MenuItem value="">

                            <em>Select an Option</em>
                        </MenuItem>
                        <option value={1990}>Admin</option>
                        <option value={1995}>Writer</option>
                        <option value={2000}>User</option>
                    </select>

                    {/* Input Image */}
                    <Input
                        required
                        onChange={e => SetIamge(e.target.files[0])}
                        label="Upload Image"
                        type="file"
                        inputProps={{ accept: 'image/*' }}
                        fullWidth
                        style={{
                            backgroundColor: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                            color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                        }}
                        InputLabelProps={{
                            style: {
                                color: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                            },
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: mode === 'dark' ? '#e2e8f0' : '#1e293b',
                            color: mode === 'dark' ? '#1e293b' : '#e2e8f0',
                            width: "fit-content",
                        }}
                        className='py-3 px-7'
                        type='submit'                    >
                        Edit
                    </Button>
                </form>
            </div>
        </Layout>
    );
}

export default AddUser;
