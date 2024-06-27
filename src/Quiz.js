import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Quiz() {
    const location = useLocation();
    const { numberOfQuestions, category, difficulty } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [index, setIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);
    const [loggedInUserName, setLoggedInUserName] = useState('');
    const [isPlaying, setIsPlaying] = useState(true);
    const [timerExpired, setTimerExpired] = useState(false); // New state
    const navigate = useNavigate();

    useEffect(() => {
        if (numberOfQuestions && category && difficulty) {
            axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`)
                .then(response => {
                    const formattedQuestions = response.data.results.map((questionItem, index) => {
                        const formattedQuestion = {
                            question: questionItem.question,
                            options: [...questionItem.incorrect_answers, questionItem.correct_answer],
                            ans: questionItem.correct_answer
                        };
                        formattedQuestion.options.sort(() => Math.random() - 0.5);
                        return formattedQuestion;
                    });
                    setQuestions(formattedQuestions);
                    setStartTime(Date.now());
                })
                .catch(error => console.error('Error fetching the questions:', error));
        }
    }, [numberOfQuestions, category, difficulty]);

    const handleAnswerOptionClick = (option) => {
        if (!timerExpired) {
            setSelectedAnswer(option);
            const correctAnswer = questions[index].ans;

            if (option === correctAnswer) {
                setScore(score + 1);
            }

            setShowNextButton(true);
            setIsPlaying(false);
        } else {
            console.log('Time is up! Please click Next to proceed.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        navigate('/');
    };

    const handleNextQuestion = () => {
        const nextIndex = index + 1;
        if (nextIndex < questions.length) {
            setIndex(nextIndex);
            setSelectedAnswer(null);
            setShowNextButton(false);
            setIsPlaying(true);
            setTimerExpired(false);
        } else {
            setEndTime(Date.now());
            setShowScore(true);
        }
    };

    useEffect(() => {
        if (endTime && timeTaken === null) {
            const calculatedTimeTaken = ((endTime - startTime) / 1000).toFixed();
            setTimeTaken(calculatedTimeTaken);
            const quizResult = {
                score: score,
                date: new Date().toLocaleDateString(),
                timeTaken: calculatedTimeTaken
            };
            const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
            quizResults.push(quizResult);
            localStorage.setItem('quizResults', JSON.stringify(quizResults));
        }
    }, [endTime, score, startTime, timeTaken]);

    const handleTimeExpire = () => {
        setTimerExpired(true);
        setShowNextButton(true);
        setIsPlaying(false);
        console.log('Time is up! Please click Next to proceed.');
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
        setLoggedInUserName(loggedInUser.name);
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <div className="navbar-nav">
                        <Link className="nav-link" to="/home">
                            Home
                        </Link>
                        <Link className="nav-link" to="/dashboard">
                            Dashboard
                        </Link>
                    </div>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <div className="nav-link">
                                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" width={'40px'} height={'40px'} alt="User Profile" />
                                {loggedInUserName}
                            </div>
                            <Link className="nav-link" to="/">
                                <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
            <div className='container'>
                <div className='container1'>
                    <div className='header1'>
                        {!showScore && (
                            <div className='timer-container1'>
                                <CountdownCircleTimer
                                    key={index}
                                    isPlaying={isPlaying}
                                    duration={5}
                                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                    colorsTime={[60, 40, 20, 0]}
                                    onComplete={handleTimeExpire}
                                    size={80}
                                >
                                    {({ remainingTime }) => remainingTime}
                                </CountdownCircleTimer>
                            </div>
                        )}
                        <h1>Quiz App</h1>
                    </div>
                    <div className='hr' />
                    {showScore ? (
                        <div className='score-section1'>
                            You scored {score} out of {questions.length} <br />
                            Time taken: {timeTaken} seconds
                        </div>
                    ) : questions.length > 0 ? (
                        <>
                            <h2>{index + 1}. {questions[index].question}</h2>
                            <ul>
                                {questions[index].options.map((option, optionIndex) => {
                                    const isSelected = selectedAnswer === option;
                                    const correctAnswer = questions[index].ans;
                                    const isCorrect = option === correctAnswer;
                                    const optionStyle = {
                                        background: isSelected
                                            ? isCorrect
                                                ? 'linear-gradient(to right, #a8e063, #56ab2f)'
                                                : 'linear-gradient(to right, #e57373, #d32f2f)'
                                            : selectedAnswer !== null && isCorrect
                                                ? 'linear-gradient(to right, #a8e063, #56ab2f)'
                                                : 'none'
                                    };

                                    return (
                                        <li
                                            key={optionIndex}
                                            onClick={() => handleAnswerOptionClick(option)}
                                            style={optionStyle}
                                        >
                                            {option}
                                        </li>
                                    );
                                })}
                            </ul>
                            {showNextButton && (
                                <button className="btn btn-outline-secondary" onClick={handleNextQuestion}>Next</button>
                            )}
                            <div className='index'>{index + 1} of {questions.length} questions</div>
                        </>
                    ) : (
                        <div>Loading questions...</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Quiz;
