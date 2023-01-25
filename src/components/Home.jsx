import React from 'react';
import { useGetAllProductsQuery } from '../features/ProductApi';
import { useDispatch } from 'react-redux';
import {addToCart} from '../features/CartSlice'
import {useNavigate} from 'react-router-dom'

const Home = () => {
 const {data,error,isLoading } = useGetAllProductsQuery()
 console.log(data,error,isLoading);

 const navigate = useNavigate()

 const dispatch = useDispatch()

 const handleAddToCart = (product) => { 
   console.log(product)
   dispatch(addToCart(product))
   navigate('/cart')
 }
 return (
    <div>
        {
          isLoading ? <p>is loading ...</p> :  
          error ? <p> there is an eror </p> : (
            <>
              <h2>New Arrivals </h2>
              <div className="products">
                  {
                       data?.map((product) => (
                           <div key={product.id} className="product">
                              <h3>{product.name}</h3>
                              <img src={product.image} alt={product.name} />
                               <div className="details">
                               <span>{product.desc}</span>
                               <span className="price">${product.price}</span>
                            </div>
                           <button onClick={() => handleAddToCart(product)}>
                             Add To Cart
                           </button>
                       </div>
                     ))
                  }
              </div>
            </>
          )
        }
    </div>
  );
}

export default Home;
