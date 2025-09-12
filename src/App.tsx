import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { NavbarComponent } from './components/Reusable/NavBar';
import Users from './Pages/Users';
import Projects from './Pages/Projects';
import Auth from './Pages/Auth';
import DashBoardPage from './Pages/DashBoardPage';
import Login from './Pages/Login';
function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/users' element={<Users />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/dashboard' element={<DashBoardPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;