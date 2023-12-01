import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const [error,setError] = useState(null)
  const [isLoading,setLoading] = useState(false)
  const navigate = useNavigate()
  

  const handleChange = (e)=>{
    setFormData({
      ...formData, 
        [e.target.id]:e.target.value,
      }
      )
  }
  const handleSubmit = async(e)=>
{
  e.preventDefault();
  try {
  setLoading(true)
  const res = await fetch ('/api/auth/signup',
  {method: "POST",
   headers:{ "Content-Type": "application/json" },
    body: JSON.stringify(formData)});
    const data = await res.json();
    console.log(data)
    if(data.success == false){
      setLoading(false);
      setError(data.message);
      return;
    }
    setLoading(false)
    setError(null)
    navigate('/sign-in')
  }
  catch (error)
  {
    setLoading(false)
    setError(error.message)
  }
    
};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center front-semibold my-7'>Sign up</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input type="text" placeholder="UserName" className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
      <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email' onChange={handleChange} />
      <input type="password" placeholder="password" className='border p-3 rounded-lg' id='password' onChange={handleChange} />
      <button disabled={isLoading} type='submit' className='bg-blue-500 hover:bg-blue-600 transition duration-20 
      p-3 rounded-lg uppercase '>{isLoading? 'Loading...' : 'Sign up'}</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>have any account?</p>
      <Link to='/sign-in'>
        <span className='cursor-pointer text-blue-700 '> Sign In</span>
      </Link>
    </div>
    {/* {error && <Alert type="danger">{error}</Alert>} */}
    {error && <p className='text-red-500 mt-5'>email or username already taken</p> }

    </div>
  )
}
