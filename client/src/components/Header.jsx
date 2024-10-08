import{FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Logo from '../assets/logo2.png'
import { useState, useEffect } from 'react';


export default function Header() {
    const {currentUser} = useSelector(state=> state.user);
    const[ searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault()
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
          setSearchTerm(searchTermFromUrl);
        }
      }, [location.search]);
  return (
    <header className='bg-slate-200 shadow-md' >
        
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
        {/* <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'> */}
        {/* <span className='text-slate-500'>View</span> */}
        <span className='text-slate-700'> <img className='w-20 h-12 object-cover' src={Logo} alt="" /></span>
    {/* </h1> */}
    </Link>
    <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center w-30 sm:w-64 '>
        <input type='text' placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64'
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)} />
        <button>
        <FaSearch className="text-slate-600 "/>
        </button>
    </form>
    <ul className="flex gap-4 cursor-pointer">
            <Link to='/'>
        <li className='hidden text-sm sm:inline text-slate-700 hover:underline font-bold'>
            Home
        </li>
            </Link>
            <Link to='/about'>
        <li  className='text-sm sm:inline text-slate-700 hover:underline font-bold'>
            About
        </li>
            </Link>
        <Link to='/profile'>
            {currentUser ? (
                <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
                ): (<li className='tetxt-sm text-slate-700 hover:underline font-bold'>Sign in </li>
                 )}
                </Link>
    </ul>
    
        </div>
    
    </header>
  )
}
