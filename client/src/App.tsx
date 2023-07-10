import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import BottomNavBar from './components/BottomNavBar';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <BottomNavBar />
    </>
  );
}

export default App;
