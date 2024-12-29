import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Header from './pages/Header';
import List from './pages/List';
import Calender from './pages/Calender';

function App() {

  return (
    <>
    <Header/>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/list' element={<List/>}/>
        <Route path='/calendar' element={<Calender/>}/>
      </Routes>
    </>
  )
}

export default App
