
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import Home from './pages/Home/Home';
import Message from './pages/Message/Message';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<Home/>}/>
        <Route path='/message' element={<Message/>}/>
        <Route path='/auth/*' element={<Authentication/>}/>
      </Routes>
    </div>
  );
}

export default App;
