import {BrowserRouter,Routes,Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import Cart from './components/Cart';
import Home from './components/Home';
import Navbar from './components/Navbar';
import NotFound   from './components/NotFound';
import {ToastContainer} from 'react-toastify'
import './App.css'

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
          <Navbar/>
         <Routes>
             <Route path='/' element = {<Home />} />
             <Route path='/cart' element = {<Cart/>} />
             <Route path='/not-found' element = {<NotFound />} />
         </Routes>
    </BrowserRouter>
  );
}

export default App;
