import{FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Logo from '../assets/Logo.png'

export default function Header() {
    const {currentUser} = useSelector(state=> state.user)
  return (
    <header className='bg-slate-200 shadow-md'>
        
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
        {/* <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'> */}
        {/* <span className='text-slate-500'>View</span> */}
        <span className='text-slate-700'> <img className='w-20 h-12 object-cover' src={Logo} alt="" /></span>
    {/* </h1> */}
    </Link>
    <form className='bg-slate-100 p-3 rounded-lg flex items-center w-24 sm:w-64 '>
        <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none' />
        <FaSearch className="text-slate-600 " />
    </form>
    <ul className="flex gap-4 cursor-pointer">
            <Link to='/'>
        <li className='hidden sm:inline text-slate-700 hover:underline font-bold'>
            Home
        </li>
            </Link>
            <Link to='/about'>
        <li  className='hidden sm:inline text-slate-700 hover:underline font-bold'>
            About
        </li>
            </Link>
        <Link to='/profile'>
            {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
                ): (<li className=' text-slate-700 hover:underline font-bold'>Sign in </li>
                 )}
                </Link>
    </ul>
    
        </div>
    
    </header>
  )
}
