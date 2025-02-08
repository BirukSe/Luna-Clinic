import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import About from './pages/About';
import Doctor from './pages/physician/Doctor';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Appointment from './pages/Appointment';
import Doc from './pages/physician/Doc';
import Admin from './pages/Admin/Admin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About/>}/>
        <Route path="/showDoctor" element={<Doctor/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Signup/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
       
      </Route>
       <Route path="/doc" element={<Doc/>}/>
       <Route path='/admin' element={<Admin/>}/>
    </Routes>
  );
};

export default App;
