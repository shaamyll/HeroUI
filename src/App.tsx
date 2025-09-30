import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import  NavbarComponent  from './components/Reusable/NavbarComponent';
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
import Asset from './Pages/Asset/Asset';
import Test from './Pages/Test';
import DashBoardDumy from './Pages/DashBoardDumy';
import ButtonUsageDemo from './Pages/ButtonUsage';
import Dashboard from './Pages/statscardchk';
import SettingsProject from './Pages/settingsPageusage1';
import Dummy from './Pages/DashBoardUsage2';
import AssetForm from './Pages/Asset/AssetForm';
import StatsDumy from './Pages/StatsDumy';
import StoreManagement from './Pages/QR/Store';
import CreateProjectForm from './Pages/Project/ProjectForm/CreateProject';
import QRSettings from './Pages/QR/QRSettings';  
import EditAsset from './Pages/Asset/EditAsset';
   
function App() {

    const location = useLocation();

  const hideNavbarPaths = [
    '/create-asset',     
    '/edit-asset/:id',   
  ];

  const hideNavbar = hideNavbarPaths.some(path => {
    if (path.includes(':')) {
      const basePath = path.split('/:')[0];
      return location.pathname.startsWith(basePath);
    }
    return location.pathname === path;
  });
   
  
  return (
    <>
      {!hideNavbar && <NavbarComponent />}
      
      <Routes> 
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/users' element={<Users />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/SettingsProject' element={<SettingsProject />} />
        <Route path='/test' element={<Test/>}/>
        <Route path='/asset' element={<Asset/>}/>
        <Route path='/create-asset' element={<AssetForm/>}/>
        <Route path='/edit-asset/:id' element={<EditAsset/>}/>
        {/* <Route path='/dashboard' element={<DashBoardPage />} /> */}
        <Route path='/login' element={<Login />} />
        <Route path='/Footer' element={<footer />} />
        <Route path='/cardView' element={<CardView />} />
        <Route path='/HomePage' element={<HomePage />} />
        <Route path='/displaycomponents' element={<DisplayComponents />} />
        <Route path='/displayusersform' element={<DisplayUsersForm />} />
        <Route path='/statCardUsage' element={<StatCardUsage />} />
        <Route path='/dashBoardDumy' element={<DashBoardDumy />} />
          <Route path='/dashBoardUsage2' element={<Dummy />} />
        <Route path='/buttonUsage' element={<ButtonUsageDemo />} />
         <Route path='/statsCardchk' element={<Dashboard/>}/>
         {/* <Route path='/settingsLeft' element={<SettingsLeftContainer/>}/> */}
         <Route path='/statsDumy' element={<StatsDumy/>}/>
         <Route path='/CreateProjectForm' element={<CreateProjectForm/>}/>
         <Route path='/StoreManagement' element={<StoreManagement/>}/>
         <Route path='/QRSettings' element={<QRSettings/>}/>

      </Routes>
    </>
    
  );
}

export default App;