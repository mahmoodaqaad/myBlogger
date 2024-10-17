import React, { useContext } from 'react'
import myContext from '../../context/data/myContext';

function Footer() {
  const context = useContext(myContext);
  const { mode } = context;
  return (
    <footer className="body-font" style={{ background: mode === 'dark' ? 'rgb(30, 41, 59)' : '#30336b' }}>
      {/* Left Content  */}
      <div className="container px-5 py-3 mx-auto flex items-center sm:flex-row flex-col">
        {/* Blog Logo  */}
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          {/* logo  */}
          <img className='w-10'
            src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png" alt="logo"
          />
          {/* logo text  */}
          <span className="ml-3 text-xl text-white">
            Mahmood
          </span>
        </div>

        {/* items  */}
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2023 Mahmood —
          <a
            href="https://twitter.com/knyttneve"
            className="text-gray-600 ml-1"
            rel="noopener noreferrer"
            target="_blank"
          >
            @Mahmood
          </a>
        </p>

        {/* Right item  */}
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          {/* Icon 1  */}
          <a className="text-gray-500 pointer" href="https://www.facebook.com/profile.php?id=100022618519064" target="_blank">
            <svg
              fill="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>



          {/* Icon 3  */}
          <a className="ml-3 text-gray-500 pointer" href="https://www.instagram.com/dev._mahmood/" target="_blank">

            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>


        </span>
      </div>
    </footer>

  )
}

export default Footer