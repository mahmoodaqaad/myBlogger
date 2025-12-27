import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SkeletonShow from '../Skeleton/Skeleton'

const TableShow = (props) => {
    const [isShow, setIsShow] = useState("user")
    const Navigate = useNavigate()
    const FilteredPostforUser = props.getAllBlog.filter(post => post?.emailAuther === props.user?.email)

    const isDarkMode = props.mode === 'dark';
    const dataList = isShow === "user" ? props.users : (props.user?.role === 1990 ? props.getAllBlog : FilteredPostforUser);

    return (
        <div className="animate-fade-in p-2 md:p-6 flex-1 flex flex-col">
            {props.user?.role === 1990 && (
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-2xl w-fit mb-8 shadow-inner">
                    <button
                        onClick={() => setIsShow("user")}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${isShow === "user"
                                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setIsShow("post")}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${isShow === "post"
                                ? 'bg-white dark:bg-slate-700 text-primary-600 dark:text-primary-400 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                            }`}
                    >
                        All Posts
                    </button>
                </div>
            )}

            <div className="overflow-x-auto rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm flex-1">
                <table className="w-full text-sm text-left">
                    <thead className={`text-xs uppercase tracking-wider ${isDarkMode ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-50 text-slate-500'
                        }`}>
                        <tr>
                            <th className="px-6 py-4 font-bold">#</th>
                            {isShow === "user" ? (
                                <>
                                    <th className="px-6 py-4 font-bold">User</th>
                                    <th className="px-6 py-4 font-bold">Email</th>
                                    <th className="px-6 py-4 font-bold">Role</th>
                                    <th className="px-6 py-4 font-bold">Last Login</th>
                                </>
                            ) : (
                                <>
                                    <th className="px-6 py-4 font-bold">Thumbnail</th>
                                    <th className="px-6 py-4 font-bold">Title</th>
                                    <th className="px-6 py-4 font-bold">Category</th>
                                    <th className="px-6 py-4 font-bold">Author</th>
                                    <th className="px-6 py-4 font-bold">Date</th>
                                </>
                            )}
                            <th className="px-6 py-4 font-bold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {props.loading ? (
                            [1, 2, 3, 4, 5].map((i) => (
                                <tr key={i}>
                                    <td colSpan={7} className="px-6 py-4">
                                        <SkeletonShow height="24px" width="100%" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            dataList.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center opacity-40">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                            <p className="text-lg font-bold uppercase tracking-widest">No {isShow === "user" ? "users" : "articles"} found</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                dataList.map((item, key) => (
                                    <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                                        <td className="px-6 py-4 font-medium text-slate-400 group-hover:text-primary-500 transition-colors">{key + 1}</td>
                                        {isShow === "user" ? (
                                            <>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <img className='w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm group-hover:scale-110 transition-transform' src={item?.image || 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="avatar" />
                                                        <div>
                                                            <p className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                                                                {item?.name} {item.email === props.user?.email && <span className="text-primary-500 ml-1 text-[10px] font-black uppercase tracking-widest">(You)</span>}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 font-medium">{item?.email}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${item?.role === 1990 ? 'bg-primary-100 text-primary-700' :
                                                            item?.role === 1995 ? 'bg-accent-100 text-accent-700' : 'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        {item?.role === 1990 ? "Admin" : item?.role === 1995 ? "Writer" : "User"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 text-xs">{item?.DateLogin || 'N/A'}</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4">
                                                    <img className='w-16 h-10 rounded-lg object-cover shadow-sm group-hover:scale-110 transition-transform' src={item.thumbnail} alt="thumbnail" />
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-700 dark:text-slate-200 truncate max-w-xs">{item.blogs?.title}</td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700 text-center inline-block min-w-[70px]">
                                                        {item.blogs?.category}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-slate-500 font-medium">{item.auther}</td>
                                                <td className="px-6 py-4 text-slate-400 text-xs">{item.date}</td>
                                            </>
                                        )}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {isShow === "post" && (
                                                    <button
                                                        onClick={() => props.deleteBlogs(item.id)}
                                                        className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                                        title="Delete Post"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => Navigate(isShow === "user" ? `/EditUser/${item.id}` : `/Editblog/${item.id}`)}
                                                    className="p-2 text-slate-400 hover:text-primary-500 transition-colors"
                                                    title={isShow === "user" ? "Edit User" : "Edit Post"}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableShow;
