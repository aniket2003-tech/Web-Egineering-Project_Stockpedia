import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import HomeDetail from './Components/HomeDetail/HomeDetail';
import UserLogin from './Components/UserLogin/UserLogin';
import AdminLoginRoute from './Components/AdminLogin/AdminLogin';
import Footer from './Components/Footer/Footer';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import StockPredictionRoute from './Components/StockPrediction/StockPrediction';
import PostRoute from './Components/Post/Post';
import SubscriberRoute from './Components/Subscriber/Subscriber';
import AddUserRoute from './Components/AddUser/AddUser';
import { PostDetail } from './Components/PostDetail/PostDetail';
import DashboardRoute from './Components/Dashboard/DashboardRoute';
import './App.css'
import { useState, useEffect } from 'react';
import { redirect} from 'react-router-dom';
import { Profile } from './Components/Profile/Profile';

function App() {
  const [cardData, setCardData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn'));
  const [key, setKey] = useState(0); // Key to force re-render
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(false)
  const [search, setSearch] = useState('')
  const [card, setCard] = useState([])

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn'));
      setKey(prevKey => prevKey + 1); // Update key to force re-render
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  useEffect(() => {
    const isAdminSet = localStorage.getItem('isAdmin');
    const isLoggedInSet = localStorage.getItem('isLoggedIn');
    const isSubscriberSet = localStorage.getItem('isSubscriber');

    // Check if isAdmin, isLoggedIn, and isSubscriber are not set
    if (isAdminSet === null || isLoggedInSet === null || isSubscriberSet === null) {
      // Set isAdmin, isLoggedIn, and isSubscriber to false in localStorage
      localStorage.setItem('isAdmin', 'false');
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.setItem('isSubscriber', 'false');
      localStorage.setItem('Username', '');
      localStorage.setItem('Email', '');
      localStorage.setItem('profileImageUrl', '');
    }
  }, []);
  // const navigate = useNavigate()
  const handleLogout = () => {
    // Perform logout actions
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('isSubscriber', 'false');
    localStorage.setItem('Username', '');
    localStorage.setItem('Email', '');
    localStorage.setItem('profileImageUrl', '');
    setIsLoggedIn('false');// Update isLoggedIn state to false
  };

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('isLoggedIn'))
  }, [localStorage.getItem('isLoggedIn')])
  useEffect(() => {
    
    const fetchData = async () => {
        try {
          const response = await axios.get('/getsubscriberdata');
          setCard(response.data);
          setIsLoggedIn(localStorage.getItem('isLoggedIn'));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
  }, []);


  useEffect(() => {
    // Fetch post data including image URLs when the component mounts
    axios
      .get('/getdata')
      .then((response) => {
        setCardData(response.data);
        setIsLoggedIn(localStorage.getItem('isLoggedIn'))
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleClose = () => {
    setMessage('');
    setStatus(false)
  };
  useEffect(() => {
    // Set a timeout to clear the message after 3 seconds
    const timeout = setTimeout(() => {
      setMessage('');
    }, 4000);

    // Clean up the timeout to prevent memory leaks
    return () => clearTimeout(timeout);
  }, [message]);


  return (
    <div className="App">
      <Router>
        <Header setSearch={setSearch} search={search} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
{message && (
  <div className="messageContainer">
    <div style={{ textAlign: 'center' }} className= {status ? 'alert2' : 'alert1'}>
      <span className="closebtn" onClick={handleClose}>&times;</span>
      <strong className="fontModification">{message}</strong>
    </div>
  </div>
)}


        <Routes>
          <Route
            exact
            path="/"
            element={<>
              <HomeDetail setSearch={setSearch} search={search} cardData={cardData} />
            </>
            }
          />
          <Route
            exact
            path="/posts/:postId"
            element={<PostDetail cardData={cardData} />}
          />
          <Route
            exact
            path="/subscribers/:postId"
            element={<PostDetail cardData={card} />}
          />
          <Route exact path="/post" element={<PostRoute setMessage={setMessage} setStatus={setStatus}  illu={1} setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/dashboard" element={<DashboardRoute setMessage={setMessage} setStatus={setStatus}  setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/adduser" element={<AddUserRoute setMessage={setMessage} setStatus={setStatus} illu={3} setIsLoggedIn={setIsLoggedIn} />} setIsLoggedIn={setIsLoggedIn} />
          <Route exact path="/subscribe" element={<SubscriberRoute setMessage={setMessage} setStatus={setStatus}  illu={2} setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/user_login" element={<UserLogin setStatus={setStatus} setMessage={setMessage} setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            exact
            path="/stock_prediction"
            element={<StockPredictionRoute card={card} setMessage={setMessage} setSearch={setSearch} search={search} setStatus={setStatus} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route exact path="/admin_login" element={<AdminLoginRoute setMessage={setMessage} />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
