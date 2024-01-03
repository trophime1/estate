import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signinSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
export default function OAuth() {
    const dispatch = useDispatch();
    const navigate =useNavigate()
    const handleGoogleClick= async ()=>{
       try{
       const provider = new GoogleAuthProvider()
       const auth = getAuth(app)

       const result = await signInWithPopup(auth,provider)
    //    console.log(result)
    const res = await fetch ('/api/auth/google',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:result.user.displayName,
                email: result.user.email, 
                photo: result.user.photoURL
                })
    
    })
    const data = await res.json()
    dispatch(signinSuccess(data));
      navigate('/');
    console.log(data)
       }catch (error){
        console.log('can not sign in bu google',error);
       }
    }
  return (
    <button onClick={handleGoogleClick} type="button" className="flex gap-5 rounded-lg uppercase p-3 text-black hover:opacity-95 border">
      <FcGoogle className='text-2xl' />
      <span>continue with google</span>
      </button>
  )
}
