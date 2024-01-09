
import { Link} from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { FaXTwitter,FaInstagram  } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";


export default function Footer() {
  return (
    <footer className='bg-slate-200 shadow-md ' >
        
        <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
            <Link to='/'>
        <span className='text-slate-700'> <img className='w-20 h-12 object-cover' src={Logo} alt="" /></span>
    </Link>
    <h1>contact us:</h1>

        <Link to='https://twitter.com/home' target='blank'> <FaXTwitter  className='text-2xl ' /> 
        </Link>
        <Link to='https://www.facebook.com/profile.php?id=61554594932656' target='blank'> <FaFacebook className='text-2xl ' />
        </Link>
        <Link to='https://www.instagram.com/viewhome2024/' target='blank'> <FaInstagram  className='text-2xl ' />
        </Link>
        <Link to={`mailto:viewhome2024@gmail.com`}> <MdOutlineMarkEmailRead className='text-2xl' /> </Link>
  <Link to='https://wa.me/250786992184' target='blank' className='font-bold bg-green-500 p-3 rounded-lg'>Direct contact us !!</Link>
    
        </div>
    
    </footer>
  )
}
