import { useState } from "react"

export default function Recovery() {
  const [Password , setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center front-semibold my-7'>Reset a Password</h1>
  <form  className='flex flex-col gap-4'>
    <input type="email" placeholder="New Password" className='border p-3 rounded-lg' id='email'  required />
    <input type="email" placeholder="Confirm Password" className='border p-3 rounded-lg' id='email'  required />
    <button className='bg-blue-700 p-3 rounded-lg uppercase text-white '>Reset</button>
    
  </form>
  </div>
  )
}
