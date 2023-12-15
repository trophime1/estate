import React from 'react'

export default function CreatingListing() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
      <h1 className='font-bold text-3xl text-center my-7 '>CreatingListing</h1>
      <form className='flex flex-col sm:flex-row gap-6'>
        <div className='flex flex-col gap-4 flex-1'>
        <input className="rounded-lg p-3 border" id='name' type="text" placeholder='Name' 
            maxLength='62' minLength='10' required />
        <textarea className="rounded-lg p-3 border" id='description' type="text" placeholder='description' 
             required />
        <input className="rounded-lg p-3 border"  id='address'type="text" placeholder='address' 
             required />

             <div className='flex gap-6 flex-wrap'>
              <div className='flex gap-2'>
                <input type="checkbox" id='sale' className='w-5' />
                <span>Sell</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='rent' className='w-5' />
                <span>Rent</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='parking spot' className='w-5' />
                <span>Parking spot</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='furnished' className='w-5' />
                <span>Furnished</span>
              </div>
              <div className='flex gap-2'>
                <input type="checkbox" id='offer' className='w-5' />
                <span>Offer</span>
              </div>
              
             </div>
             <div className='flex gap-4 flex-wrap'>
              <div className='flex gap-2 items-center'>
                <input type="number" id='bedrooms' min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                <p>Bedrooms</p>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="number" id='bathroom' min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                <p>Bathrooms</p>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="number" id='regularPrice' min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                <p>Regular Price</p>
                <span className="text-xs">(rwf / month)</span>
              </div>
              <div className='flex gap-2 items-center'>
                <input type="number" id='discountPrice' min='1' max='10' required
                className='p-3 border border-gray-300 rounded-lg' />
                <p>Discount price</p>
                <span className="text-xs">(rwf / month)</span>

              </div>
              
             </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">Images:
          <span className='font-normal text-gray-600 ml-3'> The first image will be the cover (max 6)</span></p>
       
        <div className=" flex gap-4 ">
          <input type="file" id='images' accept='image/*' multiple className="p-3 border
           border-gray-400 rounded w-full" />
          <button className='text-green-700 uppercase border p-1 bg-gray-200
           rounded-lg hover:shadow-sm disabled:opacity-80'>upload</button>
        </div>
        <button className='p-3 uppercase bg-slate-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80' >Create listing</button>
        </div>
      </form>
      </main>
  )
}
