import { useState } from 'react'
import { useNavigate} from 'react-router-dom'

export default function ForgetPassword() {
const navigate = useNavigate ()
const [email, setEmail] = useState() 

const onSubmitHandler = async(e)=>
{
  e.preventDefault();
try {
  const res =await fetch ('api/auth/forgotPassword',
  {
    method: 'POST',
    headers:{ "Content-Type": "application/json" },
    body: JSON.stringify()
  })
  const data = await res.json();
    console.log(data)
} catch (error) {
  console.log(error)
}

}

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl text-center front-semibold my-7'>Verify Email</h1>
  <form onSubmit={onSubmitHandler}  className='flex flex-col gap-4'>
    <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email'  required />
    <button className='bg-blue-700 p-3 rounded-lg uppercase text-white '>Verify Email</button>  
  </form>
  </div>
)
}
