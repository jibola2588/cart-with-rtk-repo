import React from 'react';
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components'
import { logoutUser } from '../features/authSlice'
import {toast} from 'react-toastify'

const Navbar = () => {
const cart = useSelector(state => state.cart)
const auth = useSelector(state => state.auth)
const dispatch = useDispatch()

const handleLogout = () => { 
    dispatch(logoutUser())
    toast.warning('logged out!!', {position:'bottom-left'})
  
}

  return (
    <div className='nav-bar'>
      <Link to='/'>
       <h2>onlineShop</h2>
      </Link>
      <Link to='/cart'>
       <div className='nav-bag'>
       <svg 
       xmlns="http://www.w3.org/2000/svg" width="35" 
       height="35" 
       fill="currentColor" 
       class="bi bi-handbag-fill" 
       viewBox="0 0 16 16"
       >
       <path d="M8 1a2 2 0 0 0-2 2v2H5V3a3 3 0 1 1 6 0v2h-1V3a2 2 0 0 0-2-2zM5 5H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11v1.5a.5.5 0 0 1-1 0V5H6v1.5a.5.5 0 0 1-1 0V5z"/>
</svg>
         <span className='bag-quantity
         '>
          {cart.cartTotalQuantity}
         </span>
       </div>
       </Link>

       { 
          auth._id ? (
            <Logout 
            onClick = { handleLogout }
            > Logout </Logout>
          ) :( 
            <AuthLinks>
                <Link to='/register'> Register</Link>
                <Link to='/login'>  Login    </Link>
            </AuthLinks>
          )
       }
    </div>
  );
}

export default Navbar;


const AuthLinks = styled.div`
  color:white,
  cursor:pointer;
  
 a { 
  nth:last-child{ 
    margin-left:2rem;
  }
 }
`
const Logout = styled.div`
  color:white;
  cursor:pointer
`