import React from 'react';
import ReactDOM from 'react-dom/client';
import BrowserRouter, { Route, Routes } from 'react-router-dom';
import D_MAIN_000 from './pages/D_MAIN_000.jsx';
import D_SIGNIN_000 from './pages/D_SIGNIN_000.jsx';
import D_MY_000 from './pages/D_MY_000.jsx';
import D_WRITE_000 from './pages/D_WRITE_000.jsx';
import D_READ_000 from './pages/D_READ_000.jsx';
import Kakao_callback from './pages/Kakao_callback.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<D_MAIN_000 />}></Route>
      <Route path="/sign-in" element={<D_SIGNIN_000 />}></Route>
      <Route path="/my-page" element={<D_MY_000 />}></Route>
      <Route path="/write" element={<D_WRITE_000 />}></Route>
      <Route path="/read" element={<D_READ_000 />}></Route>
      <Route path="/auth-kakao-callback" element={<Kakao_callback />}></Route>
    </Routes>
  </BrowserRouter>
);
