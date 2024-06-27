import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    setLoggedInUserName(loggedInUser.name); // Adjust this according to your user data structure
  }, []);

  const handleTakeQuizClick = () => {
    setShowForm(true);
  };

  const handleStartQuiz = () => {
    if (numberOfQuestions && category && difficulty) {
      navigate('/quiz', {
        state: {
          numberOfQuestions,
          category,
          difficulty,
        }
      });
    } else {
      alert('Please fill in all fields.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">



          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>




          <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div className="navbar-nav">


              <div className="nav-link">
                <img src="https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg" width={'40px'} height={'40px'} alt="User Profile" />
                {loggedInUserName}
              </div>

              {/* Logout button */}
              <Link className="nav-link" to="/">
                <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>


      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Welcome to the Quiz App!</h1>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Button variant="primary" size="lg" onClick={handleTakeQuizClick}>Take a Quiz</Button>
          </Col>
        </Row>
        {showForm && (
          <Row className="mt-4">
            <Col>
              <Form>
                <Form.Group controlId="formNumberOfQuestions">
                  <Form.Label>Number of Questions</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter number of questions"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                    className="form-control"
                  />
                </Form.Group>
                <Form.Group controlId="formCategorySelection">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select">
                    <option value="">Select Category</option>
                    <option value="9">General Knowledge</option>
                    <option value="18">Science / Computer</option>
                    <option value="28">Vehicle</option>
                    <option value="12">Music</option>
                    <option value="21">Sports</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formDifficultySelection">
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Control as="select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="form-select">
                    <option value="">Select Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="success" onClick={handleStartQuiz}>Start Quiz</Button>
              </Form>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
