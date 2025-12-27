import { useContext, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import SearchDialog from "../searchDialog/SearchDialog";
import ShareDialogBox from "../shareDialogBox/ShareDialogBox";
import { auth } from "../../Firebase/FirebaseConfig";
import { MyContext } from "../../context/Data/myState";

export default function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { mode, toggleMode, user, setUser } = useContext(MyContext);
  const navigate = useNavigate();
  const location = useLocation();

  const admin = localStorage.getItem('admin');
  const storedImage = localStorage.getItem("imageUser");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => setOpenNav(false), [location]);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    auth.signOut();
    navigate('/adminlogin');
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Articles", path: "/allblogs" },
  ];

  const NavItem = ({ title, path }) => (
    <Link
      to={path}
      className={`nav-link py-2 ${location.pathname === path
        ? 'text-primary-500 after:w-full'
        : mode === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
        }`}
    >
      {title}
    </Link>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 ${scrolled
        ? 'py-3 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm'
        : 'py-6 bg-transparent'
        }`}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-10">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="relative p-2 bg-slate-900 dark:bg-white rounded-xl shadow-lg transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                  <img
                    className="w-6 h-6 invert dark:invert-0"
                    src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png"
                    alt="Logo"
                  />
                </div>
              </div>
              <span className={`text-2xl font-black tracking-tighter transition-colors ${mode === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                AQAAD<span className="text-primary-500">.</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <NavItem key={link.path} {...link} />
              ))}
              {!admin && (
                <Link to="/adminlogin" className="px-6 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/10 dark:shadow-white/5">
                  Sign In
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4 relative z-10 ">
              <SearchDialog />

              <div className="hidden sm:block">
                <ShareDialogBox />
              </div>

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1 hidden lg:block" />

              {/* Theme Toggle */}
              <button
                onClick={toggleMode}
                className={`p-2.5 rounded-xl transition-all ${mode === 'dark'
                  ? 'bg-slate-800 text-amber-400 hover:bg-slate-700'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {mode === 'light' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  </svg>
                )}
              </button>

              {/* User / Admin */}
              {admin && (
                <div className="flex items-center gap-3">
                  <Link
                    to={user?.role === 1995 || user?.role === 1990 ? "/dashboard" : "/"}
                    className="group"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={user?.image || storedImage || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'}
                        className="w-full h-full object-cover"
                        alt="pfp"
                      />
                    </div>
                  </Link>
                  <button onClick={logout} className="hidden md:block p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                  </button>
                </div>
              )}

              {/* Mobile Toggle */}
              <button
                className={`lg:hidden p-2.5 rounded-xl transition-all ${openNav
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 rotate-90'
                  : mode === 'dark' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-700 ${openNav ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        <div className="absolute inset-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-2xl" onClick={() => setOpenNav(false)} />
        <div className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-700 ease-expo ${openNav ? 'translate-x-0' : 'translate-x-full'
          }`}>
          <div className="flex flex-col h-full p-10 pt-32">
            <div className="space-y-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block text-4xl font-black tracking-tighter ${location.pathname === link.path
                    ? 'text-primary-500'
                    : mode === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}
                >
                  {link.title}
                </Link>
              ))}
            </div>

            <div className="mt-auto space-y-6">
              {!admin && (
                <Link to="/adminlogin" className="block w-full py-5 bg-primary-600 text-white text-center font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary-500/20">
                  Sign In
                </Link>
              )}
              {admin && (
                <button onClick={logout} className="w-full py-5 border border-red-500/20 text-red-500 font-black uppercase tracking-widest rounded-2xl transition-all active:scale-95">
                  Logout Account
                </button>
              )}
              <div className="flex justify-center gap-6 pt-6">
                <ShareDialogBox />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}