import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Dashboard from './components/admin/Dashboard'
import FoodManagement from './components/admin/FoodManagement'
import OrderItem from './components/admin/OrderItem'
import Cart from './components/users/Cart'
import Food from './components/users/Food'
import Login from './components/users/Login'
import Signup from './components/users/SignUp'
import Success from './components/users/Success'

function App() {
  return<>
      <BrowserRouter>
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/food-management' element={<FoodManagement/>}/>
            <Route path='/dashboard/:id' element={<OrderItem/>}/>
            <Route path='/user-cart' element={<Cart/>}/>
            <Route path='/user-menu' element={<Food/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/order-success' element={<Success/>}/>
            <Route path='*' element={<Navigate to='/login'/>}/>
          </Routes>
      </BrowserRouter>
  </>
}

export default App;
