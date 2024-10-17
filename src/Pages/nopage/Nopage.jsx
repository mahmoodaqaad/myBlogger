import React from 'react'
import Layout from '../../components/layout/Layout'
import { NavLink } from 'react-router-dom'
import './404.css'
const Nopage = () => {
  return (

      <div className="page404">
        <p>404 | this page not found</p>
        <div> <NavLink to={'/'} className='btn btn-primary'>Home</NavLink></div>
      </div>

  )
}

export default Nopage
