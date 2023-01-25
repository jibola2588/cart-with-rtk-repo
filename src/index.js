import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'

import ProductReducer, { productFetch } from './features/ProductSlice';
import { productsApi } from './features/ProductApi';
import cartReducer, { getTotals } from './features/CartSlice'


const store = configureStore({ 
  reducer:{ 
  product:ProductReducer,
  [productsApi.reducerPath] : productsApi.reducer,
  cart:cartReducer,
  },
  middleware:getDefaultMiddleware => getDefaultMiddleware().concat(productsApi.middleware)
})

store.dispatch(productFetch())
store.dispatch(getTotals())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
       <App />
    </Provider>
  </React.StrictMode>
);

