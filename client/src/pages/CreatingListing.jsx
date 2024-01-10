import { useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import {app} from '../firebase.js'
import { useNavigate } from 'react-router-dom';
import {useSelector} from 'react-redux';


export default function CreatingListing() {
  const [files,setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: '',
    description: '',
    address: '',
    phone: '',
    type: 'rent',
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [imageUploadError, setImageUploadError] = useState( null);
  const [uploading ,setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {currentUser} = useSelector((state)=>state.user)

  const navigate = useNavigate();



  const handleImageSubmit = (e)=>{

  if(files.length > 0 && files.length + formData.imageUrls.length <7){
    setUploading(true)
    setImageUploadError(false)
    const promises = [];
    for(let i = 0; i < files.length; i++){
      promises.push(storeImage(files[i]))
    }
    Promise.all(promises).then((urls)=>{
      setFormData({...formData,imageUrls: formData.imageUrls.concat(urls)})
      setImageUploadError(false)
      setUploading(false)
    }).catch((err)=>{
      setImageUploadError('Image upload fail (2mb max per image)')
      setUploading(false)


    })
  }else{
    setImageUploadError('you can only upload 6 images per listing')
    setUploading(false)

  }

  }
  const storeImage = async (file)=>{
 return new Promise((resolve, reject) =>{
  const storage = getStorage(app)
  const fileName = new Date().getTime + file.name;
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable( storageRef,file)
  uploadTask.on(
    'state_changed',
    (snapshot)=>{
      const progress = 
      (snapshot.bytesTransferred / snapshot.totalBytes) *100;
      console.log(`upload is ${progress}% done`)

    },
    (error)=>{
      reject(error);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        resolve(downloadURL)
      })
    }
  )

 })
  };

  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData,
       imageUrls:formData.imageUrls.filter((_, i) => i!== index)
    })

  };
  const handleChange = (e) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }

    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='font-bold text-3xl text-center my-7 '>CreatingListing</h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-6'>
        <div className='flex flex-col gap-4 flex-1'>
        <input className="rounded-lg p-3 border" id='name' type="text" placeholder='Name' 
            maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
        <textarea className="rounded-lg p-3 border" id='description' type="text" placeholder='description' 
              onChange={handleChange} value={formData.description} />
        <input className="rounded-lg p-3 border"  id='address'type="text" placeholder='address' 
             required onChange={handleChange} value={formData.address}/>
        <input className="rounded-lg p-3 border"  id='phone' type="text" placeholder='phone_number (250788800000)'
             required onChange={handleChange} value={formData.phone}/>

             <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input type="checkbox" id='sale' className='w-5' 
                onChange={handleChange} checked={formData.type === 'sale'} />
                <span>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='rent' className='w-5' 
                onChange={handleChange} checked={formData.type === 'rent'} />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='parking' className='w-5'
                 onChange={handleChange} checked={formData.parking} />
                <span>Parking spot</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='furnished' className='w-5' 
                onChange={handleChange} checked={formData.furnished} />
                <span>Furnished</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='offer' className='w-5' 
                onChange={handleChange} checked={formData.offer} />
                <span>Offer</span>
              </div>
              
             </div>
             <div className='flex gap-4 flex-wrap'>
              <div className='flex gap-2 items-center'>
                <input type="number" id='bedrooms' min='1' max='10' 
                onChange={handleChange} value={formData.bedrooms} required
                className='p-3 border border-gray-300 rounded-lg' />
                <p>Bedrooms</p>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="number" id='bathrooms' min='1' max='10' 
                onChange={handleChange} value={formData.bathrooms} required
                className='p-3 border border-gray-300 rounded-lg' />
                <p>Bathrooms</p>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="number" id='regularPrice' min='50' max='1000000' required
                onChange={handleChange} value={formData.regularPrice} className='p-3 border border-gray-300 rounded-lg' />
                <p>Regular Price</p>
                <span className="text-xs">(rwf / month)</span>
              </div>
              {formData.offer &&(

              <div className='flex gap-2 items-center'>
                <input type="number" id='discountPrice' min='0' max='1000000' required
                onChange={handleChange} value={formData.discountPrice} className='p-3 border border-gray-300 rounded-lg' />
                <p>Discount price</p>
                <span className="text-xs">(rwf / month)</span>
              </div>
              )}
             </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images:
          <span className='font-normal text-gray-600 ml-3'> The first image will be the cover (max 6)</span></p>
       
        <div className=" flex gap-4 ">
          <input onChange={(e)=> setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple className="p-3 border
           border-gray-400 rounded w-full" />
          <button disabled={uploading} type='button' onClick={handleImageSubmit} className='text-green-700 uppercase border p-1 bg-gray-200
           rounded-lg hover:shadow-sm disabled:opacity-80'>{ uploading? 'Uploading...': 'upload'}</button>
        </div>
        <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
        {
          formData.imageUrls.length > 0 && formData.imageUrls.map( (url, index) =>(
          
          <>
          <div key={url} className="flex justify-between p-3 border items-center">
            <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
            <button  type='button' onClick={()=>handleRemoveImage(index)} className='text-red-700 uppercase rounded-lg border p-3 hover:opacity-75'>Delete</button>
          </div> 
          <div className="">
            </div> 
          </> ))
        }
        <button  disabled={uploading || loading}
        className='p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80' >
          {loading? 'creating...':'create listing'}</button>
          {error && <p className='text-red-700 p-3 text-sm'> {error} </p>}
        </div>
      </form>
      </main>
  )
}
