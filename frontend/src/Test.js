import { useState, useEffect } from "react";

export default function Test({ names, passcodes }) {
  const [activeTab, setActiveTab] = useState("physics");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const questionsPerPage = 1;
  const [questionset, setQuestionset] = useState([]);
  const correctAnswers = ['choice1', 'choice2', 'choice3', 'choice4'];

  useEffect(() => {
    fetch(`http://0.0.0.0:8000/mocktests`)
      .then(response => response.json())
      .then(data => setQuestionset(data))
      .catch(error => console.log('Error:', error));

    localStorage.setItem("theme", theme);
  }, [theme]);

  const range = (start, end, step = 1) => {
    const rangeArray = [];
    for (let i = start; i <= end; i += step) {
      rangeArray.push(i);
    }
    return rangeArray;
  };

  const handleClick = (event) => {
    const id = event.target.id;
    setActiveTab(id);
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers(prevAnswers => ({ ...prevAnswers, [questionIndex]: selectedAnswer }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    const answeredQuestions = [];

    questions.forEach((questionObj, index) => {
      const selectedAnswer = answers[index];
      answeredQuestions.push({
        question: questionObj.question,
        selectedAnswer: selectedAnswer || 'Not answered',
        correctAnswer: correctAnswers[index],
      });

      if (selectedAnswer === correctAnswers[index]) {
        calculatedScore += 4;
      } else if (selectedAnswer) {
        calculatedScore -= 1;
      }
    });

    setScore(calculatedScore);
    setSubmittedAnswers(answeredQuestions);
    setSubmitted(true);
  };

  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(startIndex, startIndex + questionsPerPage);
  const querange = range(1, questions.length);
  const subjects = ["physics", "chemistry", "maths", "philosophy"];

  const handleNext = () => {
    if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={theme === "light" ? "bg-white text-dark" : "bg-dark text-light"}>
      <h1>{questionset}</h1>
      <div className="container mt-2">
        <button
          className={`btn mb-4 absolute top-4 right-4 p-2 rounded-full ${theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌞" : "🌙"}
        </button>

        <div className="col d-flex">
          {!submitted ? (
            <>
              <div className="container mt-2 bg-grey p-4">
                <ul className="nav nav-tabs">
                  {subjects.map(subject => (
                    <li className="nav-item" key={subject}>
                      <a
                        className={`nav-link ${activeTab === subject ? "active" : ""}`}
                        id={subject}
                        onClick={handleClick}
                      >
                        {subject}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  <div className={`tab-pane fade ${activeTab ? "show active" : ""}`} id={activeTab}>
                    <h5 className="mt-3">Questions for {activeTab}</h5>
                    <div className="question-box">
                      {currentQuestions.length === 0 ? (
                        <p>No questions available</p>
                      ) : (
                        currentQuestions.map((questionObj, index) => (
                          <div key={startIndex + index}>
                            <p><strong>Question {startIndex + index + 1}:</strong> {questionObj.question}</p>
                            {questionObj.image && <img src={questionObj.image} alt="Question" />}
                            <ul>
                              {["choice1", "choice2", "choice3", "choice4"].map((choice, idx) => (
                                <li key={choice}>
                                  <input
                                    type="radio"
                                    id={`q${startIndex + index}-${choice}`}
                                    name={`question-${startIndex + index}`}
                                    value={choice}
                                    checked={answers[startIndex + index] === choice}
                                    onChange={() => handleAnswerChange(startIndex + index, choice)}
                                  />
                                  <label htmlFor={`q${startIndex + index}-${choice}`}>({String.fromCharCode(97 + idx)}) {questionObj[choice]}</label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="d-flex justify-content-between">
                      <button onClick={handlePrevious} disabled={currentPage === 0}>Previous</button>
                      <button onClick={handleNext} disabled={currentPage >= Math.ceil(questions.length / questionsPerPage) - 1}>Next</button>
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">Submit Answers</button>
                  </div>
                </div>
              </div>

              <div className="d-flex">
                {querange.map((num, index) => (
                  <button key={index} onClick={() => setCurrentPage(num - 1)}>{num}</button>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-4">
              <h5>Your Score: {score}</h5>
              <h6>Results:</h6>
              {submittedAnswers.map((item, index) => (
                <div key={index}>
                  <strong>Question {index + 1}: </strong> {item.question} <br />
                  <strong>Correct Answer:</strong> {item.correctAnswer} <br />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
