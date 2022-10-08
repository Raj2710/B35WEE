import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  return <>
  <div>
      <BrowserRouter>
          <Routes>
              <Route path='/login' element={<Login/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='*' element={<Navigate to={'/login'}/>}/>
          </Routes>
      </BrowserRouter>
  </div>
  </>
}

export default App;
