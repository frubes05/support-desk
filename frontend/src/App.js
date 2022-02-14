import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { PrivateRoute } from './components/PrivateRoute';
import { NewTicket } from './pages/NewTicket';
import { Tickets } from './pages/Tickets';
import { Ticket } from './pages/Ticket';

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
                <Route path='/new-ticket' element={<PrivateRoute></PrivateRoute>}>
                  <Route path='/new-ticket' element={<NewTicket></NewTicket>}></Route>
                </Route>
                <Route path='/tickets' element={<PrivateRoute></PrivateRoute>}>
                  <Route path='/tickets' element={<Tickets></Tickets>}></Route>
                </Route>
                <Route path='/ticket/:ticketId' element={<PrivateRoute></PrivateRoute>}>
                  <Route path='/ticket/:ticketId' element={<Ticket></Ticket>}></Route>
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
          <ToastContainer></ToastContainer>
        </>
  );
}

export default App;
