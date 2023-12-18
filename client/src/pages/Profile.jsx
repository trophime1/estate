import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import { updateUserFailure, updateUserSuccess, updateUserStart, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserFailure, signOutUserStart, signOutUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import {Link} from 'react-router-dom'


export default function Profile() {
  const {currentUser,loading, error } = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const [updateSuccess ,setUpdateSuccess] = useState(false)
  const [showListingsError,setShowListingsError]= useState(false)
  const [userListings, setUserListings] = useState([])




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
  const handleChange = (e) =>
  {
   setFormData({...formData, [e.target.id]: e.target.value}) 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async ()=>
  {
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE',

      });
      const data = await res.json()
      if (data.success === false ){
        dispatch(deleteUserFailure(data.message))
        return;
      }
      dispatch(deleteUserSuccess(data))
    }catch (error) {
     dispatch(deleteUserFailure(error.message))
    }
    
  };
  const handleSignOut = async ()=>{
try {
  dispatch(signOutUserStart())
  const res = await fetch('/api/auth/signout')
  const data = res.json()
  if (data.success === false) {
    dispatch(signOutUserFailure(data.message))
    return;
  }
  dispatch(signOutUserSuccess(data))
  
} catch (error) {
dispatch(signOutUserFailure(error.message))
  
}
  }
  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className='font-bold text-3xl text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
        onChange={(e)=>setFile(e.target.files[0])}
         type="file" ref={fileRef} hidden accept="image/*"/>
        <img onClick={()=> fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt='Profile'
         className="rounded-full w-24 h-24 mt-2 cursor-pointer object-cover self-center"/>
         <p className="text-sm self-center">
          {fileUploadError ? 
          (<span className="text-red-700 "> Error to upload image (image must be less than 2mbs)</span>) :
           filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-700" >{`Uploading ${filePerc}%`}</span>) :
            filePerc === 100 ? 
            (<span className="text-green-700">Image sucessful uploaded!</span>) : (' ') }
         </p>
        <input type="text" placeholder="username" 
        defaultValue ={currentUser.username}id='username' className="border p-3 rounded-lg"
        onChange={handleChange}/>
        <input type="email" placeholder="email" 
        defaultValue ={currentUser.email}id='email' className="border p-3 rounded-lg"
        onChange={handleChange}/>
        <input type="password" placeholder="password" 
        id='password' className="border p-3 rounded-lg"
        onChange={handleChange}/>
        <button className="text-white p-3 rounded-lg bg-slate-700 hover:opacity-95
         disabled:opacity-80 uppercase">{loading? 'loading...':'update'}</button>
         <Link className="uppercase text-white bg-green-700 rounded-lg text-center p-3 hover:opacity-95" to='/create-listing'>
          create listing
          </Link> 
      </form>
      <div className="flex justify-between mt-5"> 
        <span onClick={handleDeleteUser} className="text-red-500 cursor-pointer"> Delete Account</span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer"> Sign Out</span>
      </div>
      <p className="text-red-700 slef-center">{error? error: ' '}</p>
      <p className="text-green-700 slef-center">{updateSuccess? 'User is  updtaed sucessfully': ' '}</p>
      <button onClick={handleShowListings} className="text-green-700 uppercase  w-full">Show Listings</button>
       <p className="text-red-700 text-sm">{showListingsError? 'Error showing listings':''}</p>   
       { userListings && userListings.length > 0 &&
       userListings.map((listing)=><>
       <div
       key={listing._id} className="border rounded-lg p-3 flex justify-between items-center gap-4">
       <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
                </Link>
                <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>

       </div>
       </>) }  
    </div>
  )
}
