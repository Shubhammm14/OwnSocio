import React from 'react';
import Login from './Login';
import Register from './Register';
import {Routes,Route} from 'react-router'
const Authentication = () => {
  return (
    <div className='min-h-screen flex justify-start' style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/01/10/04/09/bubbles-1968275_640.png)', backgroundSize: 'cover'}}>
      <div className='w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3   p-8 rounded-lg mx-10'>
        <div className='h-full'>
          <div className='flex flex-col justify-center items-center text-yellow-600 text-xl text-pink-900 m-10'>
            <h1 className='text-5xl text-yellow-600 m-5 font-semibold'>Own Socio</h1>
            <p className='text-center'>Connecting Lives, Sharing Stories,<br />Your Social World, Your Way</p>
          </div>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
            
          </Routes>
        
          {/* <Login/> */}
        </div>
      </div>
    </div>
  );
}

export default Authentication;
