import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Context/AppContext'
import toast from 'react-hot-toast';

const SellerLogin = () => {

    const {isSeller, setIsSeller, navigate, axios, backend} = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHanlder = async (event) => {
      event.preventDefault();
      try {
        const { data } = await axios.post(backend + '/api/seller/login', { email, password });
    
        if (data.success) {
          setIsSeller(true);
          navigate("/seller");
        } else {
          toast.error(data.message); // Show error if credentials are invalid
        }
    
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Something went wrong!");
      }
    };

    useEffect(()=> {
        if(isSeller) {
            navigate('/seller')
        }
    } , [isSeller])

  return !isSeller &&  (
    <form onSubmit={onSubmitHanlder} className='min-h-screen flex items-center justify-center text-sm text-gray-600'>

  <div className='flex flex-col gap-5 items-start p-10 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
    <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>
    
    <div className='w-full'>
      <p>Email</p>
      <input 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email" 
        placeholder='Enter Your Email' 
        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' 
        required 
      />
    </div>
    
    <div className='w-full'>
      <p>Password</p>
      <input 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' 
        type="password" 
        placeholder='Enter Password' 
        required 
      />
    </div>

    <button className='bg-primary text-white w-full py-2 rounded cursor-pointer'>Login</button>
  </div> 

</form>
  )
}

export default SellerLogin
