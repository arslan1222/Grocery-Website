import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../Context/AppContext';
import toast from 'react-hot-toast';

const InputField = ({ type, placeholder, name, handleChange, address }) => {
    return (
      <input
        className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
      />
    );
  };

const AddAddress = () => {

  const {backend, axios, user, navigate} = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        email: '',
        phone: '',
    })

    const handleChange = (event) => {
        const { name, value } = event.target;

        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value
        }))
    }


    const onSubmitHandler = async (event) => {

      console.log(user);

      const userId = user._id;
      

      try {
        event.preventDefault();
        const {data} = await axios.post(backend + '/api/address/add', {address, userId});

        if(data.success) {
          toast.success(data.message);
          navigate("/cart");
        } else {
          toast.error(data.message)
        }

      } catch (error) {
        toast.error(error.message);
      }
        
    }

    useEffect(()=>{
      if(!user) {
        navigate("/cart")
      }
    }, [])

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3x text-gray-500'>Add Shippig <span className='font-semibold text-primary'>Address</span></p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
            <form className='space-x-3 mt-6 text-sm gap-4' onSubmit={onSubmitHandler}>
                <div className='flex flex-col gap-4'>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='firstName' type='text' placeholder='first Name' />
                        <InputField handleChange={handleChange} address={address} name='lastName' type='text' placeholder='Last Name' />
                    </div>

                    <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Enter Your Email' />
                    <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Street' />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='City' />
                        <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='State' />

                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='zipcode' type='text' placeholder='Zip Code' />
                        <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Country' />
                    </div>
                    <InputField handleChange={handleChange} address={address} name='phone' type='number' placeholder='Phone' />

                    <button className='w-full mt-6 bg-primary text-white py-3 hover:primary-dull transition cursor-pointer uppercase'>Save Address</button>
                </div>
            </form>
        </div>
        <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="" />

      </div>
    </div>
  )
}

export default AddAddress
