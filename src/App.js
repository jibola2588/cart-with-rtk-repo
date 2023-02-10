import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Register from './components/auth/Register'
import NotFound   from './components/NotFound';
import {ToastContainer} from 'react-toastify'
import './App.css'
import Login from './components/auth/Login';
import CheckoutSuccess from './components/CheckoutSuccess';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
          <Navbar/>
         <Routes>
             <Route path='/' element = {<Home />} />
             <Route path='/cart' element = {<Cart/>} />
             <Route path='/CheckoutSuccess' element = {<CheckoutSuccess/>} />
             <Route path='*' element = {<NotFound />} />
             <Route path='/register' element = {<Register/>} />
             <Route path='/login' element = {<Login/>} />
         </Routes>
    </BrowserRouter>
  );
}

export default App;
