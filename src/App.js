
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Banner from './component/Banner/Banner';
import Home from './component/Home/Home';
import Navber from './component/Navber/Navber';
import DateFiltering from './component/Page/DateFiltering';


function App() {
  return (
    <div>
      <Navber />
      <Routes>
        <Route path='/' element={<Banner />}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/dateFiltering' element={<DateFiltering />}></Route>

      </Routes>


    </div>
  );
}
export default App;