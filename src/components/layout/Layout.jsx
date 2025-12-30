import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'


// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className='content min-h-screen'>

                <Outlet />
            </div>

            <Footer />
        </div>
    )
}

export default Layout
