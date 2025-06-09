import { useEffect, useState } from "react";
import Questions from './Questions.js';

export default function MemProf({ names, passcodes }) {
    const [queaddress, setQueAddress] = useState("/"); // Root address
    const [questionSets, setQuestionSets] = useState([]); // Temporary holder for folder contents  
    const [showQuestions, setShowQuestions] = useState(false);
    // Fetch folders dynamically when queaddress changes
    useEffect(() => {
        fetch("/quefolders", {
            method: "POST", // Use POST method
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: queaddress }), // Send the queaddress in the request body
        })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    setQuestionSets(data.map((folder) => folder.name)); // Update state with folder names
                } else {
                    setQuestionSets([]); // Set to empty if no folders are found
                }
            })
            .catch((error) => {
                console.error("Error fetching folder data:", error);
                setQuestionSets([]); // Clear the state on error
            });
    }, [queaddress]);

    const handleAddQuestionSet = () => {
        const name = String(prompt("Enter the name of the new question set:"));
        if (!name) return;
        if (questionSets.includes(name)) {
            alert("This question set already exists.");
            return; // Exit the function without making the request
        }
        const address = `${queaddress}`;

        // Sending the new question set to the server
        fetch("/quefolder", {
            method: "POST",
            body: JSON.stringify({ name, address }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Adding the new set to the state
                    setQuestionSets([...questionSets, name]);
                } else {
                    console.error("Failed to create question set");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    const handleArrowClick = (setName) => {
        const newAddress = `${queaddress === "/" ? "" : queaddress}/${setName}`; // Update queaddress to fetch new folder contents
        setQueAddress(newAddress);
    };

    const handleBackClick = () => {
        const newAddress = queaddress.substring(0, queaddress.lastIndexOf("/")) || "/"; // Go up one folder
        setQueAddress(newAddress);
        setShowQuestions(false)
    };

    const handleDeleteQuestionSet = (setName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the question set "${setName}"?`);
        if (!confirmDelete) return;

        fetch("/delqueset", {
            method: "POST",
            body: JSON.stringify({ name: setName, address: queaddress }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Remove the deleted question set from state
                    setQuestionSets(questionSets.filter((set) => set !== setName));
                } else {
                    console.error("Failed to delete question set");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div
            className="bg-gray-800 min-h-screen flex rounded-md"
            style={{
                height: "100%",
                marginLeft: "20px",
                marginRight: "20px",
                borderRadius: "12px",
            }}
        >
            {/* Sidebar */}
            <div className="bg-gray-900 px-2 flex flex-col justify-start items-center rounded-2xl mx-3 my-3">
                <nav className="flex flex-col items-center space-y-4 w-full">
                    <a
                        className="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-900 hover:text-white smooth-hover"
                        href="#"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                    </a>
                    <a className="bg-gray-900 text-white p-4 inline-flex justify-center rounded-md" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                        
                    </a>
                </nav>
            </div>

            {/* Content Section */}
            <div className="flex-1 px-2 sm:px-0 flex flex-col rounded-l-md overflow-hidden">
                <div className="flex justify-between items-center pt-4 sm:pt-10 px-4">
                    <div>
                        <h3 className="text-3xl font-extralight text-white/50">Questions</h3>
                        <p className="text-white/50 text-sm mt-2">
                            Current Address: <span className="text-white">{queaddress}</span>
                        </p>
                    </div>
                    <div className="inline-flex items-center space-x-2">
                        {(queaddress === "/" || showQuestions) &&(
                            <button
                                className="bg-gray-800 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                                onClick={handleBackClick}
                            >
                                Back
                            </button>
                        )}
                        <button
                            className="bg-gray-800 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                            onClick={handleAddQuestionSet}
                        >
                            Add Question Set
                        </button>
                        
                            <button
                                className="bg-gray-800 text-white/50 p-2 rounded-md hover:text-white smooth-hover"
                                onClick={()=>setShowQuestions(true)}
                            >
                                Add Questions
                            </button>
                        
                    </div>
                </div>
                {showQuestions && <Questions />}
                <div
                    className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 overflow-y-auto custom-scrollbar scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scrollbar-track-rounded-full"
                    
                >
                    
                    {questionSets.length > 0 ? (
                        questionSets.map((setName) => (
                            <div
                                key={setName}
                                className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-slate-900 smooth-hover"
                                onClick={() => handleArrowClick(setName)}
                            >
                                <h4 className="text-white text-2xl font-bold capitalize text-center">{setName}</h4>
                                <p className="text-white/50">XX questions</p>
                                <button
                                    className="absolute bottom-2 right-2 p-2 text-gray-600 hover:text-gray-700"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the parent click
                                        handleDeleteQuestionSet(setName);
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-white/50 text-center">No question sets found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
