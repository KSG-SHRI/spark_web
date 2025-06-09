import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './index.css'; 

export default function Register({ setstatus, setName, setPasscode }) {
    const [name, setname] = useState("");
    
    const [phone, setphone] = useState("");
    const [passcode, setpasscode] = useState("");
    const [results, setresults] = useState("");
    const [error, seterror] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (name.trim() && phone.trim() && passcode.trim()) {
            fetch("/register-member", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name,phone, passcode })
            })
            .then((res) => {
                if (res.status === 200) {
                    setresults("Registered Successfully");
                    navigate("/");
                    setstatus(res.status);
                    setName(name);
                    setPasscode(passcode);
                    setTimeout(() => setresults(""), 1000);
                } else {
                    seterror("Registration failed.");
                }
            })
            .catch(() => {
                seterror("Can't Register");
            });
        } else {
            seterror("All fields are required");
        }
    };

    return (
        <div className="register-container mt-3">
            <h1 className="fs-4 fw-light text-center "><div className="text-gray-200 underline decoration-cyan-400">Register</div></h1> {/* Centered heading */}
            <div className="container mt-3 d-flex justify-content-center">
                <div className="row align-items-center">
                    <div className="col-12 col-sm-6"> 
                        <label htmlFor="name" className="form-label"><div className="text-white">Name</div></label>
                        <input className="form-control border border-secondary" onChange={(e) => setname(e.target.value)} value={name} name="name" type="text" />
                    </div>
                    
                    <div className="col-12 col-sm-6"> 
                        <label htmlFor="phone" className="form-label"><div className="text-white">phone</div></label>
                        <input className="form-control border border-secondary" onChange={(e) => setphone(e.target.value)} value={phone} name="phone" type="number" min="8" max="12" />
                    </div>
                    <div className="col-12 col-sm-6"> 
                        <label htmlFor="passcode" className="form-label"><div className="text-white">Passcode</div></label>
                        <input className="form-control border border-secondary" onChange={(e) => setpasscode(e.target.value)} value={passcode} name="passcode" type="password" />
                    </div>
                </div>
            </div>
            <div className="col-auto p-3 text-center">
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
            {results && <h1 className="text-success text-center">{results}</h1>} 
            {error && <h1 className="text-danger text-center">{error}</h1>} 
        </div>
    );
}
