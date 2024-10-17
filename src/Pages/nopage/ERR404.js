import { NavLink } from "react-router-dom";

export default function ERR404() {

    return <div className="page404">
        <p>404 | this page not found</p>
        <div> <NavLink to={'/'} className='btn btn-primary'>Home</NavLink></div>
    </div>

}