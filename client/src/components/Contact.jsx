import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function Contact({listing}) {
    const [landlord, setlandord] = useState(null)
    const [message, setMessage] = useState('')
    console.log('====================================');
    console.log(landlord);
    console.log('====================================');
    const onChange = (e) =>{
        setMessage(e.target.value)
    }
    useEffect(()=>
    {
        const fetchLandlord = async()=>{
            try{
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json()
                setlandord(data);
            }
            catch(error){
                console.log(error)
            }

        }
        fetchLandlord();

    },[listing.userRef])
    
  return (
    <>
    {landlord && (
        <div className="flex flex-col gap-2">
         <p className="g-3">Contact <span className="font-semibold">{landlord.username} </span> for 
          <span className="font-semibold">
             {listing.name}</span></p>
        <textarea name="message" id="message" rows="2" value={message}
        placeholder="Enter your message here ....." className="w-full rounded-lg p-3 border" onChange={onChange}>

        </textarea>
        <Link to={`mailto:${landlord.email}?Regarding 
        ${listing.name}&body=${message}`} 
        className="bg-slate-700 uppercase text-white p-3 rounded-lg text-center hover:opacity-95">
         Send message
        </Link>
       
        </div>
    )}
    </>
  )
}
