import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
import Creation from './components/itinerary/Creation';
import FlightInfo from './components/FlightAvailable/FlightInfo';

import MemberShip from './components/itinerary/MemberShip';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import DashBoard from './components/itinerary/DashBoard';
import FlightList from './components/list/FlightList';
import HotelList from './components/list/HotelList';
import DocumentStorage from './components/list/DocumentStorage';
import BudgetTracker from './components/list/BudgetTracker';
function App() {
  return (
    <>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home/>} />
      {/* <Route path='/itinerary' element={<Creation/>}/> */}
      <Route path='/itinerary' element={<DashBoard/>}/>
      <Route path='/flight-information' element={<FlightInfo/>}/>
      <Route path='/documentstorage' element={<DocumentStorage/>}/>
      <Route path='/membership' element={<MemberShip/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element={<Signup/>}/>
      <Route path='/list' element={<FlightList/>}/>
      <Route path='/hotelList' element={<HotelList/>}/>
      <Route path='/budgetTracker' element={<BudgetTracker/>}/>
    </Routes>
    {/* <Footer/> */}
    </>
  );
}

export default App;
