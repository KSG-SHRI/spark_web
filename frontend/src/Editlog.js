import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Editlog({seteditlog }) {
  const [passcode, setpasscode] = useState("");
  const [error, seterror] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (passcode.trim() !== '') {
      fetch("/editlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ passcode })
      }).then((res) => {
          if (res.status === 200) {
            
            seteditlog(true);  
            navigate("/editor");
            seteditlog(true);
            seterror(res.status);
          } else {
            seterror(res.status);
          }
      });
    }
  };

  return (
    <div className="register-container mt-5 d-flex flex-column align-items-center justify-content-center"> 
      <h1 className="fs-4 fw-light text-center text-white">Editor</h1>

      <div className="mt-4 d-flex flex-column align-items-center">
        <label htmlFor="passcode" className="form-label text-white">Passcode</label>
        <input
          className="form-control border border-secondary text-center" 
          onChange={(e) => setpasscode(e.target.value)}
          value={passcode}
          name="passcode"
          type="password"
          style={{ maxWidth: "300px" }} 
        />
      </div>

      <div className="mt-3">
        <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
      </div>
      
      {error && <h1 className="text-danger fs-5 text-center mt-3">{error}</h1>}
    </div>
  );
}
