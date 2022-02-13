import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
        <>
          <BrowserRouter>
            <div className='container'>
              <Header></Header>
              <Routes>
                <Route exact path="/" element={<Home></Home>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/register" element={<Register></Register>}></Route>
              </Routes>
            </div>
          </BrowserRouter>
          <ToastContainer></ToastContainer>
        </>
  );
}

export default App;
