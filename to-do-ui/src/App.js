import React from 'react'
import Login from './Component/Login'
import { BrowserRouter,Navigate,Route, Routes} from 'react-router-dom';
import Home from './Component/Home';
import './App.scss'
import Register from './Component/Register';

const App = () => {
  const serverurl = 'http://127.0.0.1:5000/';
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login serverurl={serverurl} />}></Route>
          <Route path='/Register' element={<Register serverurl={serverurl}/>}></Route>
          <Route path='/Home' Component = {()=> (sessionStorage.getItem('login')==='true')?<Home serverurl={serverurl}/>:<Navigate to="/"/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App