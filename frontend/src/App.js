import './App.css';
import Register from './Register.js';
import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import Test from './Test.js';
import Questions from './Questions.js';
import Login from './Login.js'; 
import { useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Editor from './Editor.js';
import Cookies from "js-cookie";
import StuProf from './StuProf.js';
import Nav from './Nav.js';
import Home from './Navs/Home.js'
import Editlog from './Editlog.js';
import MemProf from './MemProf.js';
import Regorlogs from './Regorlogs.js';
import MemReg from './MemReg.js'
import MemLogin from './MemLogin.js'
import Eventsnews from './Navs/Events_news.js';
import About_network from './Navs/About_network.js';
import Video from './Video.js';
function Header({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation()
  const titleClick = () => {
    navigate("/");
    window.location.reload();
  };
 
  const navToEditor = () => {
    navigate('/editor');
  };

  const logout = () => {
    Cookies.remove('login');
    setIsLoggedIn(false);
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="p-4">
      <div className="flex justify-between items-center w-full">
     
        <h1 
          className="text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500 font-bold cursor-pointer"
          onClick={titleClick}
          style={{
            marginLeft: (location.pathname !== "/MemProf" || location.pathname !== "/test" || location.pathname !== "/lesson"  ) ? '20px' : 'auto',
            marginRight: (location.pathname === "/MemProf" || location.pathname === "/test" || location.pathname !== "/lesson") ? '400px' : 'auto',
            display: "block",
            textAlign: (location.pathname !== "/MemProf" && location.pathname == "/test" && location.pathname !== "/lesson") ? 'center' : 'left'
          }}
        >
          spark
        </h1>
  

        {location.pathname !== "/MemProf" && location.pathname !== "/test" &&  location.pathname !== "/lesson" && (
          <>
          
            <div className="flex-1 flex justify-center">
              <Nav />
          
              <div className="relative">
                <button 
                  onClick={toggleDropdown} 
                  className="text-white text-xl px-3 py-2 mt-3 focus:outline-none"
                >
                  <span className="text-sm">▼</span> 
                </button>
  
                {dropdownVisible && (
                  <div className="absolute left-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg">
                    <a 
                      href="#" 
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => navigate('/parent-student-portal')}
                    >
                      Parent and Student Portal
                    </a>
                    <a 
                      href="#" 
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={() => navigate('/contact')}
                    >
                      Contact
                    </a>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <div className="flex items-center space-x-4 mr-5">
          {location.pathname !== "/test" &&  location.pathname !== "/lesson" && (<a 
            href="#" 
            className="text-white text-xl px-3 py-2"
            onClick={navToEditor}
            style={{ textDecorationColor: 'cyan', textUnderlineOffset: '5px' }}
          >
            <div className="underline decoration-green-500">Editor</div>
          </a>)}
          
    
          {isLoggedIn && (
            <button
              onClick={logout}
              className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 rounded px-4 py-2 text-white"
            >
              Logout
            </button>
          )}{isLoggedIn===false && location.pathname !== "/regis" && location.pathname !== "/sturegister" && location.pathname !== "/memregister" && location.pathname!=="/test" && location.pathname !== "/lesson" && (<button
          onClick={()=>{navigate("/regis")}}
          className="relative border border-2 text-cyan-400 border-pink-600 rounded px-4 py-2 inline cursor-pointer text-1xl font-bold before:bg-pink-600 hover:rounded-b-none before:absolute before:-bottom-0 before:-left-0  before:block before:h-[4px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-300 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100"
        >
          Sign in
        </button>)}
        </div>
      </div>
    </header>
  );
  
}


function App() {
  const [statuss, setstatus] = useState("");
  const [names, setName] = useState(""); 
  const [passcodes, setPasscode] = useState(""); 
  const [landings,setlanding]=useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [editlog,seteditlog] = useState(false);
  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_FRONTEND_URI}/editorSS`)
        .then(response => response.json())
        .then((data) => {
            console.log('Landing:', data.landing);  
            setlanding(data.landing)
        });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-700">
      <div className=' min-h-screen bg-gradient-to-br from-transparent via-transparent to-blue-500'>
       <div className='min-h-screen bg-gradient-to-tr from-fuchsia-950 from-1% via-transparent via-transparent to-transparent'>
        <Router>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          {/* <Route path="/" element={<Register setstatus={setstatus} setName={setName} setPasscode={setPasscode} />} /> */}
          {landings ==="login" && <Route path="/" element={<Login setstatus={setstatus} setName={setName} setPasscode={setPasscode} setIsLoggedIn={setIsLoggedIn}/>} /> }
          {landings ==="register" && <Route path="/" element={<Register setstatus={setstatus} setName={setName} setPasscode={setPasscode} />} /> }
          <Route path='/memregister' element={<MemReg/>}/>
          { (
            <Route path="/test" element={<Test names={names} passcodes={passcodes} />} />
          )}
          {statuss !== 200 && (
            <Route path="/test" element={<h1>Oops...First Register/Login!</h1>} />
          )}
          <Route path="/questionwrite" element={<Questions />} />
          {editlog === true && (
            <Route path="/editor" element={<Editor/>} />
          )}
          {editlog === false && (
            <Route path="/editor" element={<Editlog seteditlog={seteditlog}/>} />
          )}
          
          {isLoggedIn===true&&(<Route path="/profile" element={<StuProf names={names} passcodes={passcodes} />}/>)}
          {/* Adding paths for retrieving events */}
         <Route path= "/Home" element={<Home/>}/>
         <Route path="/events-news" element={<Eventsnews/>}/>
         <Route path="/about" element={<About_network/>}/>
         <Route path= "/MemProf" element={<MemProf/>}/>
         <Route path= "/regis" element={<Regorlogs/>}/>
         <Route path= "/sturegister" element={<Register/>}/>
         <Route path= "/memlogin" element={<MemLogin setstatus={setstatus} setName={setName} setPasscode={setPasscode} setIsLoggedIn={setIsLoggedIn}/>}/>
         <Route path="/login" element={<Login setstatus={setstatus} setName={setName} setPasscode={setPasscode} setIsLoggedIn={setIsLoggedIn}/>} />
         <Route path='/lesson' element={<Video/>}/>
        </Routes>
      </Router>
    
     <h1></h1> 
       </div>
        
      </div>
      
    </div>
    
  );
}

export default App;
