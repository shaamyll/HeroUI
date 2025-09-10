import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { NavbarComponent } from './components/Reusable/NavBar';
import Users from './Pages/Users';
import Projects from './Pages/Projects';
import Auth from './Pages/Auth';

function App() {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/users' element={<Users />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </>
  );
}

export default App;