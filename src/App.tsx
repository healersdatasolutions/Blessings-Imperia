import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the Footer component
import Home from './pages/Home';
import RoomList from './pages/RoomList';
import RoomDetails from './pages/RoomDetails';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';

import 'react-perfect-scrollbar/dist/css/styles.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/:id" element={<RoomDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
        <Footer /> {/* Added Footer Component */}
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
