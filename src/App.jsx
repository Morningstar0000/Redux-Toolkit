import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import CartContainer from './component/CartContainer'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals, getCartItems } from './Features/CartSlice'
import Modal from './component/Modal'


function App() {
 const { cartItems, isLoading } = useSelector((store) => store.cart)
 const { isOpen } = useSelector((store) => store.modal)
 const dispatch = useDispatch();

 useEffect(() => {
  dispatch(calculateTotals())
 }, [cartItems]);

 useEffect(() => {
  dispatch(getCartItems());
}, []);

if (isLoading) {
  return <h2>Loading....</h2>
}

  return (
    <main>
      {isOpen && <Modal/> }
     <Navbar/>
     <CartContainer/>
    </main>
  )
}

export default App
