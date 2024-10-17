import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'
import { firedb, auth } from '../../FireBase/FireBaseConfig'
import { doc, getDoc } from 'firebase/firestore'

const RequiredAuth = ({ alowedRole }) => {

    const admin = JSON.parse(localStorage.getItem("admin"))




    const [user, setUser] = useState("")

    // getCuurentUser

    useEffect(() => {
        auth?.onAuthStateChanged(async (user) => {
            try {

                if (user) {


                    const docsnap = await getDoc(doc(firedb, "users", user?.uid))


                    if (docsnap.exists()) {

                        setUser(docsnap?.data());

                    }
                }
            } catch (e) {
                console.error(e);
            }

        })
    }, [])


    return admin ? (user == "" ? < Loading /> : alowedRole.includes(user.role) ? <Outlet /> : window.location.pathname = "/nopage") : window.location.pathname = "/login"

}

export default RequiredAuth
