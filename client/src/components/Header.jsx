import{FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>View</span>
        <span className='text-slate-700'>Home</span>

    </h1>
    </Link>
    <form className='bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64 '>
        <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none' />
        <FaSearch className="text-slate-600 " />
    </form>
    <ul className="flex gap-4 cursor-pointer">
        <li className='hidden sm:inline text-slate-700 hover:underline font-bold'>
            <Link to='/'>
            Home
            </Link>
        </li>
        <li  className='hidden sm:inline text-slate-700 hover:underline font-bold'>
            <Link to='/about'>
            About
            </Link>
        </li>
        <li className=' text-slate-700 hover:underline font-bold'>
            <Link to='/sign-in'>
            Sign in
            </Link>
        </li>
    </ul>
    
        </div>
    
    </header>
  )
}
