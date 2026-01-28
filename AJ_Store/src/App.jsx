import React from 'react'
import { Navbar } from './components/Navbar'
import {Routes , Route, useLocation} from 'react-router-dom'
import Home from './Pages/Home'
import {Toaster} from 'react-hot-toast'

import ProductCategory from './Pages/ProductCategory'
import ProductDetails from './Pages/ProductDetails'

import { Footer } from "./components/Footer";
import { useAppContext } from './context/Appcontext'
import { Login } from './components/Login'
import { AllProduct } from './Pages/AllProduct'
import { Cart } from './Pages/Cart'

import { MyOrders } from './components/MyOrders'

import AddAddress from './Pages/AddAddress'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './Pages/seller/SellerLayout'
import AddProduct from './Pages/seller/AddProduct'
import ProductList from './Pages/seller/ProductList'
import Order from './Pages/seller/Order'



export const App = () => {
   const isSellerPath = useLocation().pathname.includes("seller");
   const {showUserLogin  , isSeller} = useAppContext()
  return (
     
    <div className="text-default min-h-screen text-gray-700 bg-white">
      {isSellerPath ? null :<Navbar/> }
      {showUserLogin ? <Login/> : null  }
       <Toaster/>
    
    <div className={ `${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-30"} `}>
      <Routes>
        <Route path = '/' element ={<Home/>} ></Route>

        <Route path = '/products/:category' element={<ProductCategory/>}/>
        <Route path = '/products/:category/:id' element={<ProductDetails/>}/>

        <Route path = '/products' element ={<AllProduct/>} ></Route>
        <Route path = '/cart' element ={<Cart/>} ></Route>
        <Route path = '/my-orders' element ={<MyOrders/>} ></Route>

        <Route path = '/add-address' element ={<AddAddress/>} ></Route>
        <Route path = '/seller' element ={isSeller ? <SellerLayout/> : <SellerLogin/>}>
         <Route index element={isSeller ? <AddProduct/> : null}/>
         <Route path="product-list" element={ <ProductList/>}/>
         <Route path="order" element={ <Order/> }/>
        </Route> 
      </Routes>
    </div>
     {!isSellerPath && <Footer/>}
    </div>
  )
  
}

export default App  