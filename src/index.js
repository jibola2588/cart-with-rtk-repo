import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import ProductReducer, { productFetch } from './features/ProductSlice';
import { productsApi } from './features/ProductApi';
import cartReducer, { getTotals } from './features/CartSlice'
import authReducer from './features/authSlice'
import {loadUser} from './features/authSlice'


const store = configureStore({ 
  reducer:{ 
  product:ProductReducer,
  [productsApi.reducerPath] : productsApi.reducer,
  cart:cartReducer,
  auth:authReducer
  },
  middleware:getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productFetch())
store.dispatch(getTotals())
store.dispatch(loadUser())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
       <App />
    </Provider>
  </React.StrictMode>
);

