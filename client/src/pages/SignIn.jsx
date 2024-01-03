import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signinStart, signinFail ,signinSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({})
 const {loading , error} = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
  dispatch(signinStart())
  const res = await fetch ('/api/auth/signin',
  {method: "POST",
   headers:{ "Content-Type": "application/json" },
    body: JSON.stringify(formData)});
    const data = await res.json();
    console.log(data)
    if(data.success == false){
      dispatch(signinFail(data.message))
      return;
    }
   dispatch(signinSuccess(data))
    navigate('/')
  }
  catch (error)
  {
    dispatch(signinFail(error.message))
  }
    
};
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center front-semibold my-7'>Sign In</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      {/* <input type="text" placeholder="UserName" className='border p-3 rounded-lg' id='username' onChange={handleChange}/> */}
      <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email' onChange={handleChange} required />
      <input type="password" placeholder="password" className='border p-3 rounded-lg' id='password' onChange={handleChange} required />

      <button disabled={loading} type='submit' className='bg-blue-500 hover:bg-blue-600 transition duration-20 
      p-3 rounded-lg uppercase '>{loading? 'Loading...' : 'Sign In'}
      </button>
      <button  onClick={()=>navigate('/forget')} className='text-end text-blue-700 underline '>Forget a password?</button>
      <OAuth/>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>Do not have any account?</p>
      <Link to='/sign-up'>
        <span className='cursor-pointer text-blue-700 '> Sign Up</span>
      </Link>
    </div>
    {/* {error && <Alert type="danger">{error}</Alert>} */}
    {error && <p className='text-red-500 mt-5'>{error}</p> }

    </div>
  )
}
