import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className='font-bold text-3xl text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt='Profile' className="rounded-full w-24 h-24 mt-2 cursor-pointer object-cover self-center"/>
        <input type="text" placeholder="username" id='username' className="border p-3 rounded-lg"/>
        <input type="email" placeholder="email" id='email' className="border p-3 rounded-lg"/>
        <input type="password" placeholder="password" id='password' className="border p-3 rounded-lg"/>
        <button className="text-white p-3 rounded-lg bg-slate-700 hover:opacity-95
         disabled:opacity-80 uppercase">update</button>
      </form>
      <div className="flex justify-between mt-5"> 
        <span className="text-red-500 cursor-pointer"> Delete Account</span>
        <span className="text-red-500 cursor-pointer"> Sign Out</span>
      </div>
    </div>
  )
}
