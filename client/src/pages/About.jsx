import { Link } from 'react-router-dom';
import image1 from '../assets/jules.jpg'
import image2 from '../assets/trophime.jpg'
import { FaFacebook, FaWhatsapp, FaInstagram   } from "react-icons/fa";

export default function About() {
  return (
    <div className="">
      <div className='flex flex-col gap-6 p-26 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Your Property, <span className='text-slate-500'>Your Control, </span>
          <br />
          with ViewHome.
        </h1>
        </div>
       
<div className="flex gap-5 p-3 justify-between max-w-6xl mx-auto my-5">
  <div className="border rounded-lg "> 
    <h1 className=" uppercase rounded-lg underline  text-slate-700 font-bold text-center ">our mission</h1>
    <p className="p-3 text-center">Since our launch in 2023, ViewHome has been driven by a singular mission:
       to revolutionize the way property owners connect with renters and buyers, 
       providing a seamless and efficient solution that eliminates the need for 
       third-party commissioners. We're committed to simplifying the process and empowering 
      property owners to take control of their real estate transactions effortlessly.</p>
  </div>
  <div className="border rounded-lg">
    <h1 className=" uppercase rounded-lg underline text-slate-700 font-bold text-center ">our Vision</h1>
    <p className="p-3 text-center">At ViewHome, our vision is clear to be the guiding light for 
      students and immigrants in search of their ideal residence, whether 
      it's for work, family, or university. With ViewHome, the journey to finding your 
      dream home is streamlined to less than 10 minutes, ensuring a swift and hassle-free 
      experience. We aspire to be the go-to platform, 
      making the process of discovering the perfect home both efficient and delightful..</p>
  </div>

</div>
  <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl text-center'>who we are? </h1>
  <div className="flex gap-4 p-3 justify-around my-10">
    <div className="flex flex-col ">
      <div className='items-center'>
      <img src={image1} alt=" image" className="max-h-40 rounded-full p-3"/>
      </div>
      <div>
      <h4 className='font-semibold text-2xl'>Jules Sano KABAYIZA</h4>
      <p className='text-sm'>Chief Operations Officer and Co-Founder</p>
      <div className='flex justify-between my-3'>
        <Link to='https://www.facebook.com/edwin.jules.9?mibextid=2JQ9oc'><FaFacebook className='text-2xl' /></Link>
        <Link to='https://www.instagram.com/kab_j.u.l.e.s?igsh=YzVkODRmOTdmMw%3D%3D&utm_source=qr'><FaInstagram className='text-2xl' /></Link>
       <Link to='https://wa.me/250786992184'> <FaWhatsapp className='text-2xl' /></Link> 

      </div>
    </div>
    
    </div>
    <div className="flex flex-col">
    <div className='items-center'>
      <img src={image2} alt=" image" className="max-h-40 rounded-full p-3"/>
      </div>
      <div>
      <h4 className='font-semibold text-2xl'>Trophime KARASISI</h4>
      <p className='text-sm'>Chief Technology Officer and Co-Founder </p>
      <div className='flex justify-between my-3'>
        <Link to='https://web.facebook.com/profile.php?id=100008436885107'><FaFacebook className='text-2xl' /></Link>
        <Link to='https://www.instagram.com/trophime250'><FaInstagram className='text-2xl' /></Link>
       <Link to='https://wa.me/250786866091'> <FaWhatsapp className='text-2xl' /></Link> 

      </div>
    </div> 
    </div>
  </div>
    </div>
  )
}
