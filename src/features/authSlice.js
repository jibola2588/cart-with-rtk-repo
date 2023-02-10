import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from 'axios'
import { url} from './api'
import jwtDecode from 'jwt-decode'

const getToken = localStorage.getItem('token')

const initialState = { 
  token: getToken ? JSON.parse(getToken) : null,
  name:'',
  email: '',
  _id:'',
  registerStatus :'',
  registerError : '',
  loginStatus:'',
 loginError:'',
 userLoaded:false,
}

export const registerUsers = createAsyncThunk('auth/registerUsers',
async(values,{rejectWithValue}) => { 
    try{ 
       const token = await axios.post(`${url}/register`,{ 
        name:values.name,
        email:values.email,
        password:values.password
       })
       console.log('token in auth slice' + token)

       localStorage.setItem('token',JSON.stringify(token.data))

       return token.data
    }catch(err){ 
    console.log(err.response.data)
    return rejectWithValue(err.response.data)
    }
})

export const loginUsers = createAsyncThunk('auth/loginUsers',
async(values,{rejectWithValue}) => { 
    try{ 
       const token = await axios.post(`${url}/login`,{ 
        email:values.email,
        password:values.password
       })
       console.log('token in auth slice' + token)

       localStorage.setItem('token',JSON.stringify(token.data))

       return token.data
    }catch(err){ 
    console.log(err.response.data)
    return rejectWithValue(err.response.data)
    }
})

const authSlice = createSlice({ 
    name:"auth",
    initialState,
    reducers:{
        loadUser : (state) => { 
            const token = state.token;

            if(token){ 
                const user = jwtDecode(token)
                state.name = user.name;
                state.email = user.email;
                state._id = user._id;
                state.userLoaded = true
            }
        },
        logoutUser : (state) => { 
        localStorage.removeItem('token')

         state.token = null;
         state.name = '';
         state.email = '';
         state._id = '';
         state.registerStatus = '';
         state.registerError = '';
         state.loginStatus = '';
         state.loginError = '';
         state.userLoaded = false
        }
    },
    extraReducers: builder => { 
        builder.addCase(registerUsers.pending, (state) => { 
              state.registerStatus = 'pending'
              state.registerError= ''
        });
        builder.addCase(registerUsers.fulfilled, (state,action) => { 
             const user = jwtDecode(action.payload)
             console.log('decode token is' + user)
             state.name = user.name;
             state.email = user.email;
             state._id = user._id;
             state.registerStatus = 'success'
             state.registerError= ''
        });
        builder.addCase(registerUsers.rejected, (state,action)=> { 
            state.registerStatus = 'rejected' 
            state.registerError = action.payload
        });
        builder.addCase(loginUsers.pending, state => { 
            state.loginStatus = 'pending'
            state.loginError= ''
        });
        builder.addCase(loginUsers.fulfilled, (state,action) => { 
            const user = jwtDecode(action.payload)
            console.log('decode token is' + user)
            state.name = user.name;
            state.email = user.email;
            state._id = user._id;
            state.loginStatus = 'success'
            state.loginError= ''
       });
       builder.addCase(loginUsers.rejected, (state,action)=> { 
        state.loginStatus = 'rejected' 
        state.loginError = action.payload
    });
    }
})

export default authSlice.reducer;
export const { loadUser,  logoutUser } = authSlice.actions
 