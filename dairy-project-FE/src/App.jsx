import React from 'react';
import { Route, Routes } from 'react-router-dom';
import D_MAIN_000 from './pages/D_MAIN_000/D_MAIN_000';
import D_SIGNIN_000 from './pages/D_SIGNIN_000/D_SIGNIN_000';
import D_MY_000 from './pages/D_MY_000/D_MY_000';
import D_WRITE_000 from './pages/D_WRITE_000/D_WRITE_000';
import D_READ_000 from './pages/D_READ_000/D_READ_000';
import KakaoCallback from './pages/KakaoCallback/KakaoCallback';
import Error from './pages/Error/Error';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<D_MAIN_000 />}></Route>
        <Route path="/sign-in" element={<D_SIGNIN_000 />}></Route>
        <Route path="/my-page" element={<D_MY_000 />}></Route>
        <Route path="/write" element={<D_WRITE_000 />}></Route>
        <Route path="/read" element={<D_READ_000 />}></Route>
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />}></Route>
        <Route path="/error/report" element={<Error />}></Route>
      </Routes>
    </>
  );
}

export default App;
