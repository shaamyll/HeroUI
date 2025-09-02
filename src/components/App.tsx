import { Route, Routes } from 'react-router-dom';
import Home from './assets/Pages/Home';
import Users from './assets/Pages/Users';

function App() {
  return (
    <>
      <NavbarDemo />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={<Users />} />
        <Route path='/projects' element={<Users />} />
      </Routes>
    </>
  );
}

export default App;