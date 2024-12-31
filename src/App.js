import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Header from './components/Common/Header/Header';
import Footer from './components/Common/Footer/Footer';
import MemberShip from './components/itinerary/MemberShip';
import Login from './components/LoginSignup/Login';
import Signup from './components/LoginSignup/Signup';
import ItinearyMain from './components/itinerary/ItinearyMain';
import FlightList from './components/list/FlightList';
import HotelList from './components/list/HotelList';
import DocumentStorage from './components/list/DocumentStorage';
import BudgetTracker from './components/list/BudgetTracker';
import ContactUs from './components/ContactPage/ContactUs';
import About from './components/AboutPage/About';
import ItinearyDashboard from './components/itinerary/ItinearyDashboard';
import ShareCollaboratePage from './components/itinerary/ShareCollaboratePage';
import PaymentPage from './components/itinerary/PaymentPage';
import FlightTime from './components/itinerary/FlightTime';
import AirPortTaxi from './components/list/AirPortTaxi';
import PlaceVisit from './components/list/PlaceVisit';
import CoPassenger from './components/list/CoPassenger';
import ItinearyView from './components/list/ItinearyView';
function App() {
  return (
    <>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/time' element={<FlightTime/>}/>
      <Route path='/airporttaxi' element={<AirPortTaxi/>}/>
      <Route path='/itinerary' element={<ItinearyMain/>}/>
      <Route path='/share' element={<ShareCollaboratePage/>}/>
      <Route path='/documentstorage' element={<DocumentStorage/>}/>
      <Route path='/membership' element={<MemberShip/>}/>
      <Route path='/payment' element={<PaymentPage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/Register' element={<Signup/>}/>
      <Route path='/list' element={<FlightList/>}/>
      <Route path='/hotelList' element={<HotelList/>}/>
      <Route path='/placevisit' element={<PlaceVisit/>}/>
      <Route path='/copassenger' element={<CoPassenger/>}/>
      <Route path='/itinearyview' element={<ItinearyView/>}/>
      <Route path='/budgetTracker' element={<BudgetTracker/>}/>
      <Route path='/itinearydashboard' element={<ItinearyDashboard/>}/>
    </Routes>
    {/* <Footer/> */}
    </>
  );
}

export default App;
