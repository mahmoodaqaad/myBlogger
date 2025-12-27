import { useContext } from 'react'
import { AiFillFacebook, AiFillGithub, AiFillInstagram } from 'react-icons/ai';
import { MyContext } from '../../context/Data/myState';

function Footer() {
  const { mode } = useContext(MyContext);
  const isDarkMode = mode === 'dark';

  return (
    <footer className={`relative overflow-hidden border-t transition-colors duration-300 ${isDarkMode
      ? 'bg-slate-900 border-slate-800'
      : 'bg-white border-slate-100 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)]'
      }`}>
      {/* Decorative Blob */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container px-6 py-12 mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-4 group cursor-pointer">
              <div className="p-2 bg-primary-500 rounded-xl shadow-lg shadow-primary-500/20 group-hover:rotate-12 transition-transform">
                <img className='w-6 h-6 invert brightness-0'
                  src="https://cdn-icons-png.flaticon.com/128/3685/3685253.png" alt="logo"
                />
              </div>
              <span className={`text-xl font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Mahmood
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Sharing thoughts, stories, and ideas through a modern digital lens. Joined by a community of creators.
            </p>
          </div>

          {/* Navigation/Social */}
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex items-center gap-4">
              {[
                { icon: AiFillFacebook, href: "https://www.facebook.com/profile.php?id=100022618519064", label: "Facebook" },
                { icon: AiFillInstagram, href: "https://www.instagram.com/dev._mahmood/", label: "Instagram" },
                { icon: AiFillGithub, href: "https://github.com/mahmoodaqaad", label: "Github" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-2xl transition-all hover:-translate-y-1 active:scale-95 ${isDarkMode
                    ? 'bg-slate-800 text-slate-400 hover:text-primary-400 hover:bg-slate-700'
                    : 'bg-slate-50 text-slate-500 hover:text-primary-600 hover:bg-slate-100'
                    }`}
                  title={social.label}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              © 2023 Mahmood Aqaad — All Rights Reserved
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-500/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 space-x-2">
            <span>Powered by</span>

            <span className={isDarkMode ? 'text-accent-400' : 'text-accent-600'}>Mahmmod Aqaad</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer