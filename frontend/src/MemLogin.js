import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login({ setstatus, setName, setPasscode, setIsLoggedIn }) {
  const [name, setname] = useState("");
  const [passcode, setpasscode] = useState("");
  const [error, seterror] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loginCookie = Cookies.get('login');
    if (loginCookie) {
      setName(name);
      setPasscode(passcode);
      setIsLoggedIn(true);
      setstatus(200);
      navigate("/profile");
    } else {
      setIsLoggedIn(false);
    }
  }, [navigate, setIsLoggedIn, setstatus]);

  const handleLogin = async () => {
    if (name.trim() !== '' && passcode.trim() !== '') {
      fetch("/memlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, passcode })
      }).then((res) => {
        if (res.status === 200) {
          setstatus(200);
          setName(name);
          setPasscode(passcode);
          setIsLoggedIn(true);
          navigate("/profile");
          Cookies.set("login", 'LoggedIn', { expires: 7, path: "/" });
        } else {
          seterror("Wrong name or password!");
        }
      }).catch(error => {
        seterror("An error occurred during login.");
      });
    } else {
      seterror("Please fill in both fields.");
    }
  };

  return (
    <div className="register-container bg-white mt-3 animate-pulse-custom">
      <h1 className="fs-4 fw-light text-center">Login</h1>

      <div className="container mt-3 d-flex justify-content-center">
        <div className="row align-items-center">
          <div className="col-12 col-sm-6">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              className="form-control border border-secondary"
              onChange={(e) => setname(e.target.value)}
              value={name}
              name="name"
              type="text"
            />
          </div>
          <div className="col-12 col-sm-6">
            <label htmlFor="passcode" className="form-label">Passcode</label>
            <input
              className="form-control border border-secondary"
              onChange={(e) => setpasscode(e.target.value)}
              value={passcode}
              name="passcode"
              type="password"
            />
          </div>
        </div>
      </div>

      <div className="col-auto p-3 text-center">
        <button type="button" className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 px-3 py-2 rounded text-slate-50" onClick={handleLogin}>Login</button>
      </div>

      {error && <h1 className="text-danger fs-3 text-center">{error}</h1>}

   
      <div className="text-center mt-4 mb-3">
        <p className="text-muted">
          New to Spark?{" "}
          <Link to="/memregister" className="text-pink-500 hover:text-pink-700 underline">
            Create a new account
          </Link>
        </p>
      </div>
    </div>
  );
}
