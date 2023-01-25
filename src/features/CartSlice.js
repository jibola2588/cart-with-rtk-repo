import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-toastify'

const items = localStorage.getItem('items')

const initialState = { 
    cartItems: items ? JSON.parse( items ): [],
    cartTotalQuantity:0,
    cartTotalAmount:0 
}


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart: (state,action) => {
            console.log(`state in cartSlice is ${state}`);
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
            console.log(itemIndex)

            if(itemIndex >= 0){
                state.cartItems[itemIndex].cartQuantity += 1
                toast.info(`increased ${state.cartItems[itemIndex].name} cart quantity`,{ 
                    position:'bottom-left'
                })
            }else{
                const tempProduct = {...action.payload,cartQuantity:1}
                state.cartItems.push(tempProduct);
                toast.success(`${tempProduct.name} added to cart`,{ 
                    position:'bottom-left'
                })
            }           

          localStorage.setItem('items',JSON.stringify(state.cartItems))
        },
        removeFromCart : (state,action) => {
           state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
           
          localStorage.setItem('items',JSON.stringify(state.cartItems))

           toast.error(`${action.payload.name} removed from cart`,{ 
            position:'bottom-left'
        })
        },
        decreaseCartQuantity: (state,action) => { 
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
           console.log(`itemIndex in decrease ${itemIndex}`);
            if(state.cartItems[itemIndex].cartQuantity > 1){ 
                state.cartItems[itemIndex].cartQuantity -= 1
            }else if(state.cartItems[itemIndex].cartQuantity === 1){ 
                state.cartItems = state.cartItems.filter(item => item.id === action.payload.id)
            }
            toast.info(` decreased ${action.payload.name} cart quantity`,{ 
                position:'bottom-left'
            })

            localStorage.setItem('items',JSON.stringify(state.cartItems))
        },
        clearCart : (state) => { 
            console.log('state in clear cart' + state)
            state.cartItems = [];
            toast.error(`cleared cart items` ,{ 
                position:'bottom-left'
            })

            localStorage.setItem('items',JSON.stringify(state.cartItems))
        },
       getTotals : state => {
        // console.log(`state in getTotals is ${state.cartItems}`);
       let {total,quantity} =  state.cartItems.reduce(
            (cartTotal,cartItem) => {  
                const {price,cartQuantity} = cartItem;
                const total = price * cartQuantity;
              
                cartTotal.total += total;
                cartTotal.quantity += cartQuantity;

                return cartTotal;
            },
        {
           total : 0,
           quantity: 0
        })

       state.cartTotalAmount = total;
       state.cartTotalQuantity = quantity;
       }
    }
})

export default cartSlice.reducer;
export const { addToCart,removeFromCart,decreaseCartQuantity,clearCart,getTotals } = cartSlice.actions