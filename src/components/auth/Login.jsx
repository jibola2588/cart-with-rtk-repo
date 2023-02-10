import React from 'react';
import { loginUsers } from '../../features/authSlice';
import {useDispatch,useSelector} from 'react-redux'
import {StyledForm } from './styledForm.js'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [user,setUser] = React.useState({
        email:'',
        password:''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate()
     
    const auth = useSelector(state => state.auth)
    console.log(auth)

    React.useEffect(() => { 
        if(auth._id){ 
            navigate('/cart')
        }
    },[auth._id,navigate])


    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUsers(user))  
    }
  
    return ( 
        <StyledForm>
            <h2>Login</h2>
            <input type='email' 
            value = {user.email}
            onChange = {e => setUser({...user,email:e.target.value})}
            placeholder='Enter your email'/>
            <input type='password'
            value = {user.password}
            onChange = {e => setUser({...user,password:e.target.value})}
            placeholder='Enter your password'/>
            <button
            onClick = { handleSubmit}
            >
          { auth.loginStatus === 'pending' ? "submitting" : "Login" }
            </button>
    
            { auth.loginError ? (
                <p>{auth.loginError}</p>
            ) : null }
        </StyledForm>
       )
}

export default Login;


