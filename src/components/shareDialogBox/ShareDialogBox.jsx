import { Fragment, useContext, useState } from "react";
import {
  Dialog,
  DialogBody,
} from "@material-tailwind/react";
import { AiOutlineShareAlt, AiFillLinkedin, AiFillInstagram, AiFillGithub, AiFillFacebook } from 'react-icons/ai';
import { toast } from "react-hot-toast";
import { MyContext } from "../../context/Data/myState";

export default function ShareDialogBox() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const { mode }  = useContext(MyContext);
  const isDarkMode = mode === 'dark';

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const socialLinks = [
    { icon: AiFillLinkedin, color: 'text-blue-600', label: 'LinkedIn', href: '#' },
    { icon: AiFillInstagram, color: 'text-pink-600', label: 'Instagram', href: '#' },
    { icon: AiFillGithub, color: 'text-slate-900 dark:text-white', label: 'GitHub', href: '#' },
    { icon: AiFillFacebook, color: 'text-blue-700', label: 'Facebook', href: '#' },
  ];

  return (
    <Fragment>
      <div
        onClick={handleOpen}
        className="cursor-pointer p-2 hover:bg-white/10 rounded-full transition-colors ml-auto"
        title="Share"
      >
        <AiOutlineShareAlt size={22} className={isDarkMode ? "text-white" : "text-black"} />
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="bg-transparent shadow-none outline-none"
      >
        <DialogBody className="p-0">
          <div className={`overflow-hidden rounded-3xl border shadow-2xl transition-all duration-300 ${isDarkMode
            ? 'bg-slate-900/90 border-slate-800 text-white backdrop-blur-xl'
            : 'bg-white/95 border-slate-100 text-slate-900 backdrop-blur-xl'
            }`}>
            <div className="p-8 text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${isDarkMode ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-50 text-primary-500'}`}>
                <AiOutlineShareAlt size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Share this Post</h3>
              <p className="text-slate-500 text-sm mb-8">Spread the word with your community</p>

              <div className="grid grid-cols-4 gap-4 mb-8">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`flex flex-col items-center gap-2 group p-2 rounded-2xl transition-all ${isDarkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}
                    title={social.label}
                  >
                    <social.icon size={28} className={`${social.color} transition-transform group-hover:scale-110`} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary-500">{social.label}</span>
                  </a>
                ))}
              </div>

              <div className="relative group">
                <input
                  type="text"
                  readOnly
                  value={window.location.href}
                  className={`w-full pr-24 pl-4 py-3 rounded-2xl text-xs font-medium border outline-none transition-all ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}
                />
                <button
                  onClick={copyLink}
                  className="absolute right-2 top-1.5 bottom-1.5 px-4 bg-primary-600 hover:bg-primary-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-95"
                >
                  Copy
                </button>
              </div>
            </div>

            <div className={`p-4 border-t text-center ${isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'bg-slate-50/50 border-slate-100'}`}>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Powered By AQAAD.</p>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}