import {
  BrowserRouter as Router,
  Route,
  Routes,

  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/Data/myState";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import { Toaster } from "react-hot-toast";
import Editblog from "./Pages/admin/Editblog/Editblog";
import './app.css'
import Register from "./Pages/admin/AdminRegster/AdminRejester";
import EditUser from "./Pages/admin/EditUser/EditUser";
import AddUser from "./Pages/admin/AddUser/AddUser";
import RequiredAuth from "./Pages/admin/RequiredAuth";
import Layout from "./components/layout/Layout";
function App() {
  return (
    <MyState>
      <Router>
        <Layout>
          <Routes>


            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/allblogs" element={<AllBlogs />} />
            <Route path="/bloginfo/:id" element={<BlogInfo />} />
            <Route path="allblogs/bloginfo/:id" element={<BlogInfo />} />






            <Route element={<RequirdBack />}>

              <Route path="/adminlogin" element={<AdminLogin />} />
              <Route path="/Register" element={<Register />} />
            </Route>




            {/* Admin  */}
            <Route element={<RequiredAuth alowedRole={[1990]} />}>
              <Route path="/editUser/:id" element={<EditUser />} />
            </Route>

            {/* Admin Writer  */}

            <Route element={<RequiredAuth alowedRole={[1990, 1995]} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/Editblog/:id" element={<Editblog />} />
              <Route path="/createblog" element={<CreateBlog />} />




            </Route>



            <Route path="/*" element={<NoPage />} />
          </Routes>
          <Toaster />
        </Layout>
      </Router>
    </MyState >
  )
}


export default App

// export const requiredAuth = () => {

//   return <Outlet />
// }

export const RequirdBack = () => {
  const admin = JSON.parse(localStorage.getItem("admin"))
  return admin ? window.history.back() : <Outlet />

}