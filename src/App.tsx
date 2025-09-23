import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import { NavbarComponent } from './components/Reusable/NavBar';
import Users from './Pages/Users';
import Projects from './Pages/Projects';
import Auth from './Pages/Auth';
// import DashBoardPage from './Pages/DashBoardPage';
import Login from './Pages/Login';
import CardView from './Pages/CardView';
import HomePage from './Pages/HomePage';
import DisplayComponents from './Pages/DisplayComponents';
import DisplayUsersForm from './Pages/DispalyUsersForm';
import StatCardUsage from './Pages/StatCardUsage';
import Asset from './Pages/Asset';
import Test from './Pages/Test';
import DashBoardDumy from './Pages/DashBoardDumy';
import ButtonUsageDemo from './Pages/ButtonUsage';
import Dashboard from './Pages/statscardchk';
import ThemeToggle from './components/Theme';
import SettingsLeftContainer from './components/common/settings/SettingsLeftContainer';

  
function App() {
   
  const hideNavbar = location.pathname === '/HomePage';
  return (
    <>
      {!hideNavbar && <NavbarComponent />}
      
      
                
                   
              
    

      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/users' element={<Users />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/test' element={<Test/>}/>
        <Route path='/asset' element={<Asset/>}/>
        {/* <Route path='/dashboard' element={<DashBoardPage />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/Footer' element={<footer />} />
        <Route path='/cardView' element={<CardView />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/displaycomponents' element={<DisplayComponents />} />
        <Route path='/displayusersform' element={<DisplayUsersForm />} />
        <Route path='/statCardUsage' element={<StatCardUsage />} />
        <Route path='/dashBoardDumy' element={<DashBoardDumy />} />
        <Route path='/buttonUsage' element={<ButtonUsageDemo />} />
         <Route path='/statsCardchk' element={<Dashboard/>}/>
         <Route path='/settingsLeft' element={<SettingsLeftContainer/>}/>

      </Routes>
    </>
  );
}

export default App;