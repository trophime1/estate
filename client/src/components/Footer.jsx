import { Link } from 'react-router-dom';
import Logo from '../assets/logo2.png';
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className='bg-gray-100 text-white py-8'>
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to='/'>
            <img className='w-24 h-16 object-cover' src={Logo} alt="Evently Logo" />
          </Link>
          <p className='text-gray-900'>&copy; {currentYear} ViewHomeBase. All Rights Reserved.</p>
        </div>
        
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link to='https://twitter.com/ViewHome2024' target='_blank'>
            <FaXTwitter className='text-2xl hover:text-blue-400 transition duration-300 text-black' />
          </Link>
          <Link to='https://www.facebook.com/profile.php?id=61554594932656' target='_blank'>
            <FaFacebook className='text-2xl hover:text-blue-600 transition duration-300 text-black' />
          </Link>
          <Link to='https://www.instagram.com/viewhome2024/' target='_blank'>
            <FaInstagram className='text-2xl hover:text-pink-400 transition duration-300 text-black' />
          </Link>
          <Link to='mailto:viewhome2024@gmail.com'>
            <MdOutlineMarkEmailRead className='text-2xl hover:text-green-400 transition duration-300 text-black' />
          </Link>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <Link 
          to='https://wa.me/250786992184' 
          target='_blank' 
          className='font-bold bg-green-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300'>
          Direct Contact Us!
        </Link>
      </div>
    </footer>
  )
}
