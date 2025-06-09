import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const config = require("./config.json")
export default function Editor() {
    const buttonRef = useRef(null);
    const [landingradio, setlandingradio] = useState("register");
    const [result, setresult] = useState("");
    const [results, setresults] = useState("");
    const [videtails, setveditals] = useState("show");
    const [qudetails, setquditals] = useState("show");
    const [quset,setquset]= useState([{name:"physics"},{name:"chemsitry"}])
    const [studentdet, setstudentdet] = useState([]);
    const [hidrow, sethidrow] = useState("not");
    const [runstulist, setrunstulist] = useState(true);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({}); 
    const navigate = useNavigate();

    const datafetcher = () => {
        fetch('/editorSS')
            .then(response => response.json())
            .then((data) => {
                setlandingradio(data.landing);
                
            });
            setresult(config.python_url);
    };

  // const fetchQuestions = (tab) => {
  //     if (tab === "physics") {
  //         fetch('http://localhost:3001/questions-physics')
  //             .then(response => response.json()) // Convert response to JSON
  //             .then(data => {
  //                 setQuestions(data); // Store the questions in state
  //                 setAnswers({}); // Reset answers when fetching new questions
  //                 setScore(0); // Reset score when fetching new questions
  //                 setSubmittedAnswers([]); // Reset submitted answers
  //                 setCurrentPage(0); // Reset to the first page
  //             })
  //             .catch(error => {
  //                 console.error('Error fetching questions:', error);
  //             });
  //     }
  //    
  // };
useEffect(() => {
        datafetcher();
    }, []);

    const viewdetails = async () => {
        fetch(`${process.env.REACT_APP_FRONTEND_URI}/register-students`)
            .then(response => response.json())
            .then(data => {
                setstudentdet(data);
            });
    };

    const delstudent = (id) => {
       
        setstudentdet(prevStudents => prevStudents.filter(student => student._id !== id));

        fetch(`${process.env.REACT_APP_FRONTEND_URI}/delstudent`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        }).then(res => {
            if (res.status === 200) {
                viewdetails();  
            }
            sethidrow(id);
        });
    };

    const editstudent = (id) => {
        const studentToEdit = studentdet.find(student => student._id === id);
        if (studentToEdit) {
            if (editId === id) {
                setstudentdet(prevStudents => 
                    prevStudents.map(student => 
                        student._id === id ? { ...student, ...editData } : student
                    )
                );

                fetch(`${process.env.REACT_APP_FRONTEND_URI}/editstudent`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id, ...editData }) 
                }).then(response => {
                    if (response.status === 200) {
                        viewdetails(); 
                    }
                    setEditId(null); 
                    setEditData({}); 
                });
            } else {
                
                setEditId(id);
                setEditData({
                    name: studentToEdit.name,
                    school: studentToEdit.school,
                    grade: studentToEdit.grade,
                    passcode: studentToEdit.passcode
                }); 
            }
        }
    };

    const handleLanding = (landing) => {
        setlandingradio(landing); 
        fetch(`${process.env.REACT_APP_FRONTEND_URI}/editorSS`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ landing })
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value })); 
    };

    const studenttable = () => {
        return (
            <>
                <div className="container">
                    {videtails === "hide" ? (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col-auto">#</th>
                                    <th scope="col-auto">Name</th>
                                    <th scope="col-auto">School</th>
                                    <th scope="col-auto">Grade</th>
                                    <th scope="col-auto">Passcode</th>
                                    <th scope="col-auto">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {runstulist ? (
                                    studentdet.map((studentObj, index) => (
                                        hidrow !== studentObj._id ? (
                                            <tr key={studentObj._id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>
                                                    {editId === studentObj._id ? (
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={editData.name}
                                                            onChange={handleChange}
                                                            className="form-control border border-secondary"
                                                        />
                                                    ) : (
                                                        studentObj.name 
                                                    )}
                                                </td>
                                                <td>
                                                    {editId === studentObj._id ? (
                                                        <input
                                                            type="text"
                                                            name="school"
                                                            value={editData.school}
                                                            onChange={handleChange}
                                                            className="form-control border border-secondary"
                                                        />
                                                    ) : (
                                                        studentObj.school
                                                    )}
                                                </td>
                                                <td>
                                                    {editId === studentObj._id ? (
                                                        <input
                                                            type="number"
                                                            name="grade"
                                                            value={editData.grade}
                                                            onChange={handleChange}
                                                            className="form-control border border-secondary"
                                                        />
                                                    ) : (
                                                        studentObj.grade
                                                    )}
                                                </td>
                                                <td>
                                                    {editId === studentObj._id ? (
                                                        <input
                                                            type="text"
                                                            name="passcode"
                                                            value={editData.passcode}
                                                            onChange={handleChange}
                                                            className="form-control border border-secondary"
                                                        />
                                                    ) : (
                                                        studentObj.passcode
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="d-flex flex-wrap" style={{ gap: "2%", marginLeft: "34%" }}>
                                                        <button className="btn btn-danger d-flex justify-content-center align-items-center my-2" onClick={() => delstudent(studentObj._id)} style={{ width: '60px', height: '35px', borderRadius: '10%', alignContent: "center" }}>Delete</button>
                                                        <button className="btn btn-primary d-flex justify-content-center align-items-center my-2" onClick={() => editstudent(studentObj._id)} style={{ width: '60px', height: '35px', borderRadius: '10%', alignContent: "center" }}>
                                                            {editId === studentObj._id ? "Save" : "Edit"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : null
                                    ))
                                ) : null}
                            </tbody>
                        </table>
                    ) : null}
                </div>
            </>
        );
    };
    const question = () => {
      return (
          <div className="container">
              {qudetails === "hide" ? (
                  <div className="container mt-3">
                      <ul className="nav nav-tabs">
                          {quset.map((quset, index) => (
                              <li className="nav-item" key={index}>
                                  <a className="nav-link" data-toggle="tab" href={`#tab${index}`}>
                                      {quset.name}
                                  </a>
                              </li>
                          ))}
                       
                          <li className="btn btn-primary">
                              <button className="nav-link" onClick={() => 
                                  New Que-set
                              </button>
                          </li>
                      </ul>
  
                      <div className="tab-content">
                          {quset.map((quset, index) => (
                              <div id={`tab${index}`} className="container tab-pane" key={index}>
                                  <h3>{quset.name} Content</h3>
                                  <p>This is the content for {quset.name}.</p>
                              </div>
                          ))}
                          
                          <div id="newQuestionSet" className="container tab-pane">
                              <h3>Create a New Question Set</h3>
                              <p>This is where you can add a new question set.</p>
                          </div>
                      </div>
                  </div>
              ) : null}
          </div>
      );
  };
  
    return (
        <> <div className="register-container mt-4 animate-pulse-custom bg-white"><h1 className="text-3xl" style={{ fontFamily: "'M PLUS Code Latin', monospace" }}>Editor</h1>

            <div className="row d-flex justify-content-center">
                <div className="col d-flex justify-content-center p-2">
                    <h3 className="p-2">Landing Page: &nbsp;</h3>
                    <label htmlFor="Register" className="p-2">
                        <h3>Register</h3>
                    </label>
                    <input
                        type="radio"
                        onChange={() => handleLanding("register")}
                        value="Register"
                        name="landing"
                        className="form-check-input border-primary m-3"
                        checked={landingradio === "register"}
                    />
                    <label htmlFor="Login" className="p-2">
                        <h3>Login</h3>
                    </label>
                    <input
                        type="radio"
                        onChange={() => handleLanding("login")}
                        name="landing"
                        value="Login"
                        className="form-check-input border-primary m-3"
                        checked={landingradio === "login"}
                    />
                </div>
            </div>

            <div className="row d-flex justify-content-center">
                <div className="col d-flex justify-content-center p-2">
                    <h3 className="p-2">Student-Details: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <button ref={buttonRef} className="btn btn-primary d-flex justify-content-center align-items-center my-2" onClick={() => {
                        videtails === 'show' ? setveditals('hide') : setveditals('show');
                        viewdetails();
                    }} style={{ width: '60px', height: '35px', borderRadius: '10%', alignContent: "center" }}>{videtails}</button>
                </div>
                <div>{studenttable()}</div>
           <div className="row d-flex justify-content-center">
                <div className="col d-flex justify-content-center p-2">
                    <h3 className="p-2">Question-Set: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h3>
                    <button ref={buttonRef} className="btn btn-primary d-flex justify-content-center align-items-center my-2" onClick={() => {
                        qudetails === 'show' ? setquditals('hide') : setquditals('show');
                        
                    }} style={{ width: '60px', height: '35px', borderRadius: '10%', alignContent: "center" }}>{qudetails}</button>
                </div>
                <div>{question()}</div>
                </div>
                
            </div>
            <h1>{results}</h1></div>
            
        </>
    );
}
