import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questions() {
    const [question, setQuestion] = useState("");
    const [image, setImage] = useState(null);
    const [choice1, setChoice1] = useState("");
    const [choice2, setChoice2] = useState("");
    const [choice3, setChoice3] = useState("");
    const [choice4, setChoice4] = useState("");
    const [answer, setAnswer] = useState("");
    
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (
            question.trim() !== "" &&
            choice1.trim() !== "" &&
            choice2.trim() !== "" &&
            choice3.trim() !== "" &&
            choice4.trim() !== "" &&
            answer.trim() !== ""
        ) {
            const formData = new FormData();
            formData.append("question", question);
            formData.append("image", image);
            formData.append("choice1", choice1);
            formData.append("choice2", choice2);
            formData.append("choice3", choice3);
            formData.append("choice4", choice4);
            formData.append("answer", answer);

            fetch("/questionwrite", {
                method: "POST",
                body: formData,
            })
                .then((res) => {
                    setMessage("Uploaded Successfully");
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    };

    const imagePreviewUrl = image ? URL.createObjectURL(image) : null;

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container p-4 rounded text-white bg-transparent" style={{ maxWidth: '800px' }}>
                <h1 className="text-center fs-4 fw-light mb-4">Upload Questions</h1>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="question" className="form-label">
                            Question
                        </label>
                        <input
                            className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-secondary"
                            onChange={(e) => setQuestion(e.target.value)}
                            value={question}
                            name="question"
                            type="text"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="fileInput" className="form-label text-white">
                            Image
                        </label>
                        <div>
                            <input
                                id="fileInput"
                                className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-gray-800 mb-2"
                                onChange={(e) => setImage(e.target.files[0])}
                                name="image"
                                type="file"
                                style={{
                                    opacity: 0, 
                                    position: 'absolute', 
                                    zIndex: 2, 
                                    width: '7%', 
                                    height: '7%',
                                    cursor: 'pointer'
                                }} 
                            />
                            <label
                                htmlFor="fileInput"
                                className="btn btn-secondary text-white border border-secondary bg-gray-900 shadow-none text-center w-100 py-2"
                                style={{ position: 'relative', zIndex: 1 }}
                            >
                                Choose File
                            </label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="choice1" className="form-label">
                            Choice 1
                        </label>
                        <input
                            className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-gray-800"
                            onChange={(e) => setChoice1(e.target.value)}
                            value={choice1}
                            name="choice1"
                            type="text"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="choice2" className="form-label">
                            Choice 2
                        </label>
                        <input
                            className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-gray-800"
                            onChange={(e) => setChoice2(e.target.value)}
                            value={choice2}
                            name="choice2"
                            type="text"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="choice3" className="form-label">
                            Choice 3
                        </label>
                        <input
                            className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-gray-800"
                            onChange={(e) => setChoice3(e.target.value)}
                            value={choice3}
                            name="choice3"
                            type="text"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="choice4" className="form-label">
                            Choice 4
                        </label>
                        <input
                            className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-gray-800"
                            onChange={(e) => setChoice4(e.target.value)}
                            value={choice4}
                            name="choice4"
                            type="text"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="answer" className="form-label">
                            Correct Answer
                        </label>
                        <input
                            className="form-control border border-secondary bg-gray-900 text-white shadow-none focus:bg-gray-900 focus:border-gray-800"
                            onChange={(e) => setAnswer(e.target.value)}
                            value={answer}
                            name="answer"
                            type="text"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    <h5 className="text-white">Preview</h5>
                    <div className="mb-3 text-white">
                        <strong>Question:</strong> {question}
                    </div>
                    {imagePreviewUrl && (
                        <div className="mb-3">
                            <strong>Image Preview:</strong><br />
                            <img src={imagePreviewUrl} alt="Image Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                        </div>
                    )}
                    <div className="mb-3 text-white">
                        <strong>Choice 1:</strong> {choice1}
                    </div>
                    <div className="mb-3 text-white">
                        <strong>Choice 2:</strong> {choice2}
                    </div>
                    <div className="mb-3 text-white">
                        <strong>Choice 3:</strong> {choice3}
                    </div>
                    <div className="mb-3 text-white">
                        <strong>Choice 4:</strong> {choice4}
                    </div>
                    <div className="mb-3 text-white">
                        <strong>Correct Answer:</strong> {answer}
                    </div>
                </div>

                <div className="mt-4 text-center">
                    <button
                        type="button"
                        className="btn btn-primary px-5 py-2 bg-gray-900 text-white border border-border-secondary shadow-none"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                
                {message && (
                    <div className="mt-4 text-success fs-4 text-center">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
