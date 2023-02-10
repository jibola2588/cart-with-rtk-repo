import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {registerUsers} from '../../features/authSlice'
import {StyledForm } from './styledForm.js'
import { useNavigate } from 'react-router-dom'

const Register = () => { 
    const [user,setUser] = React.useState({
        name:'',
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
        dispatch(registerUsers(user))  
    }
   return ( 
    <StyledForm>
        <h2>Register</h2>
        <input type='text' 
        value = {user.name}
        onChange = {e => setUser({...user,name:e.target.value})}
        placeholder='Enter your name'/>
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
      { auth.registerStatus === 'pending' ? "submitting" : "Register" }
        </button>

        { auth.registerError ? (
            <p>{auth.registerError}</p>
        ) : null }
    </StyledForm>
   )
}

export default Register