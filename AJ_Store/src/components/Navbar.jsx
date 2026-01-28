  import React, { useEffect } from 'react'
  import {  NavLink } from 'react-router-dom'
  import { assets } from '../assets/assets'
  import { useAppContext } from '../context/Appcontext'
  import { Login } from './Login'
import toast from 'react-hot-toast'
  export const Navbar = () => {

      const [open, setOpen] = React.useState(false)
      const {user, setUser , setShowUserLogin , navigate , searchQuery, setsearchQuery ,getCartCout,axios} = useAppContext ();

      const logout = async ()=>{
        try {
          const { data } = await axios.get('/api/user/logout')
          if(data.success){
             toast.success(data.message)
            setUser(null);
            navigate('/')
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          toast.error(error.message)
          
        }
          
      }
      useEffect(()=>{
         if(searchQuery.length > 0){
          navigate("/products")
         }
      },[searchQuery])

    return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

              <NavLink to = '/'>
                  <img className="size-20" src={assets.logo} alt="logo" />
              </NavLink>

              {/* Desktop Menu */}
              <div className="hidden sm:flex items-center gap-8">
                  <NavLink to = '/'>Home</NavLink>
                  <NavLink to = '/products'>All Products</NavLink>
                  <NavLink to = '/contact'>Contact</NavLink>
                  

                  <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                      <input onChange={(e)=>setsearchQuery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.836 10.615 15 14.695" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                          <path clip-rule="evenodd" d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783" stroke="#7A7B7D" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                  </div>

                  <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                      <img src={assets.cart_icon} alt="Cart" className="w-6 opacity-80" />
                      <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">
                        {getCartCout()}
                      </button>
                    </div>

                {!user ? (
              <button
                onClick={() => setShowUserLogin(true)}
                className="cursor-pointer px-8 py-2 bg-green-600 hover:bg-green-700 transition text-white rounded-full"
              >
                Login
              </button>
            ) : (
              
              <div className="relative group">
                <img src={assets.profile_icon} className="w-10 h-10 rounded-full cursor-pointer" alt="profile" />
                <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow-md border border-gray-200 py-2 w-40 rounded-md text-sm z-40">
                  <li
                    onClick={() => navigate("my-orders")}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    My Orders
                  </li>
                  <li
                    onClick={logout}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>

            )}
            
              </div>
                   <div className="flex items-center gap-6 sm:hidden">
                    
                    {/* Cart Icon */}
                    <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                      <img src={assets.cart_icon} alt="Cart" className="w-6 opacity-80" />
                      <button className="absolute -top-2 -right-3 text-xs text-white bg-green-500 w-[18px] h-[18px] rounded-full">
                        {getCartCout()}
                      </button>
                    </div>

                    {/* Menu Button */}
                    <button 
                      onClick={() => setOpen(!open)} 
                      aria-label="Menu"
                    >
                      <img src={assets.menu_icon} />
                    </button>

                  </div>

              {/* Mobile Menu */}
              { open &&( 
                  <div className={`${open ? 'flex' : 'hidden'} absolute top-[70px] left-0 w-full  bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to = "/" onClick={() => setOpen(false)}>Home</NavLink>
                  <NavLink to = "/products" onClick={() => setOpen(false)}>All Products</NavLink>
                  { user &&
                  <NavLink to = "/contact"  onClick={() => setOpen(false)}>My Orders</NavLink>
                  }
                  <NavLink to = "/contact"  onClick={() => setOpen(false)}>Contact</NavLink>

                  {!user ?(
                      <button onClick={() =>{
                      setOpen(false);
                      setShowUserLogin(true);
                  }} className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-600 transition text-white rounded-full text-sm">
                      Login
                  </button>
                  ) : (
                      <button onClick={logout}  className="cursor-pointer px-6 py-2 mt-2 bg-green-600 hover:bg-green-600transition text-white rounded-full text-sm">
                      Logout
                  </button>)} 
              </div>)}
          </nav>
    )
  }
