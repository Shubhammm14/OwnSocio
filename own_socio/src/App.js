
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';
import Message from './pages/Message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from './Redux/Auth/authAction';
import { useEffect } from 'react';

function App() {
  const {auth}=useSelector(store=>store)
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("token")
  console.log(auth);
  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[jwt])
  return (
    <div>
      <Routes>
        <Route path='/*' element={auth.user?<Home/>:<Authentication/>}/>
        <Route path='/message' element={<Message/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
