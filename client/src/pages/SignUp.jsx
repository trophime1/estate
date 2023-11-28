import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center front-semibold my-7'>Sign up</h1>
    <form className='flex flex-col gap-4'>
      <input type="text" placeholder="UserName" className='border p-3 rounded-lg' id='username' />
      <input type="email" placeholder="email" className='border p-3 rounded-lg' id='email' />
      <input type="text" placeholder="password" className='border p-3 rounded-lg' id='password' />
      <button type='submit' className='bg-blue-500 hover:bg-blue-600 transition duration-20 
      p-3 rounded-lg uppercase '>Sign up</button>
    </form>
    <div className='flex gap-2 mt-5'>
      <p>have any account?</p>
      <Link to='/sign-in'>
        <span className='cursor-pointer text-blue-700 '> Sign In</span>
      </Link>
    </div>
    </div>
  )
}
