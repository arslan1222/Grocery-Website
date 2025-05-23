import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {assets} from '../assets/assets.js'
import { useAppContext } from '../Context/AppContext.jsx';

const Navbar = () => {

    const { navigate, user, setUser, setShowUserLogin, searchQuery, setSearchQuery, getCartCounts, getCartAmounts } = useAppContext();
    const [open, setOpen] = useState(false);

    const lougout = async () => {
        setUser(null);
        navigate('/')
    }

    useEffect(()=>{
        if(searchQuery.length > 0) {
            navigate('/products');
        }
    }, [searchQuery])

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white z-50 relative transition-all">

            <NavLink to='/' onClick={()=> setOpen(false)}>
            <img className="h-9" src={assets.logo} alt="Main Logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/products'>All Products</NavLink>
                <NavLink to='/contact'>Contact</NavLink>
                

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input onChange={(event)=> setSearchQuery(event.target.value) } className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img className='w-4 h-4' src={assets.search_icon} alt="" />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img className='w-6 opacity-80' src={assets.cart_icon} alt="" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCounts()}</button>
                </div>

                {!user ? (<button onClick={()=> setShowUserLogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                    Login
                </button>): (
                    <div className='relative group'>
                        <img className='w-10 h-10 rounded-full' src={assets.profile_icon} alt="" />
                        <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 px-3 min-w-max rounded-md text-sm z-40'>
                            <li onClick={()=> navigate('/my-orders')} className='p-1.5 w-full pl-3 hover:bg-primary/10 cursor-pointer'>My Orders</li>
                            <li onClick={lougout} className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
                        </ul>
                    </div>
                )}
            </div>

            <div className='flex items-center gap-6 sm:hidden'>
            <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img className='w-6 opacity-80' src={assets.cart_icon} alt="" />
                    <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getCartCounts()}</button>
                </div>
                <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu">
                    <img src={assets.menu_icon} alt="" />                
                </button>
            </div>

            {/* Mobile Menu */}
            {
                open && (
                    <div onClick={()=> setOpen(false)} className={`${
                        open ? "fixed w-[70%]" : "h-0 w-0"
                      } flex flex-col items-start justify-start md:hidden right-0 top-0 px-6 py-16 gap-4 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
                <NavLink to='/' onClick={() => setOpen(false)} >Home</NavLink>
                <NavLink to='/products' onClick={() => setOpen(false)} >All products</NavLink>
                { user && 
                    <NavLink to='/my-orders' onClick={() => setOpen(false)} >My Orders</NavLink>
                }
                <NavLink to='/contact' onClick={() => setOpen(false)} >Contact</NavLink>

                {!user ? (
                    <button onClick={()=> {
                        setOpen(false);
                        setShowUserLogin(true)
                    }
                    } className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Login
                </button>
                ) : (
                    <button onClick={lougout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                    Logout
                </button>
                )}
                
            </div>
                )
            }

        </nav>
  )
}

export default Navbar
