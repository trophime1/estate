import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";


export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  useEffect(()=>
  {
    if(file)
    {
    handleFileUpload(file)
    }
  },[file])
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
    (snapshot)=>
    {
      const progress = (snapshot.bytesTransferred/ snapshot.totalBytes)*100;
      setFilePerc(Math.round(progress))

    },
    (error)=> {
      setFileUploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setFormData({...formData,avatar: downloadURL});

      })
    },)

  }
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className='font-bold text-3xl text-center my-7'>Profile</h1>
      <form onChange={(e)=>setFile(e.target.files[0])} className="flex flex-col gap-4">
        <input type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile'
         className="rounded-full w-24 h-24 mt-2 cursor-pointer object-cover self-center"/>
         <p className="text-sm self-center">
          {fileUploadError ? 
          (<span className="text-red-700 "> Error to upload image (image must be less than 2mbs)</span>) :
           filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-700" >{`Uploading ${filePerc}%`}</span>) :
            filePerc === 100 ? 
            (<span className="text-green-700">Image sucessful uploaded!</span>) : (''
           ) }
         </p>
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
