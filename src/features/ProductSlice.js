import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = { 
   items:[],
   status:null,
   error:null 
}

export const productFetch = createAsyncThunk('products/productFetch',
async (id=null,{rejectWithValue}) => {
    try{
    const response = await axios.get('http://localhost:5000/ddds')
    return response?.data
    }catch(err){
      return  rejectWithValue(err.message)
    }
})

const productSlice = createSlice({
    name:'products',
    initialState,
    reducers : { },
    extraReducers: {
         [productFetch.pending] : state => {
            state.status = 'pending'
         },
         [productFetch.fulfilled] : (state,action) => {
            state.status = 'success';
            state.items = action.payload;
         },
      
         [productFetch.rejected] : (state,action) => {
            state.status = 'rejected';
            state.error = action.payload
         }
         
     }
})

export default productSlice.reducer;
// export const {} = productSlice.actions