import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";
import quizData from "../../assets/data";

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion] = useState(quizData[index]);
  let [lock, setLock] = useState(false);
  let [score, setScore] = useState(0);
  let [count, setCount] = useState(60);
  let [result, setResult] = useState(false);
  let [fullName, setFullname] = useState("");
  const user = localStorage.getItem("user");

  useEffect(() => {

    if (count > 0 && user ) {
      setTimeout(() => {
        setCount(count - 1);
      }, 700);
    } else {
      clearInterval(count);
    }
  }, [count]);

  // let [user,store] = useState

  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("incorrect");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(quizData[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    setCount(60);
    localStorage.removeItem("user");
  };

  const next = () => {
    if (lock === true) {
      if (index === quizData.length - 1) {
        setResult(true);
        return 0;
      }
      setIndex(++index);
      setQuestion(quizData[index]);
      setLock(false);
      option_array.map((option) => {
        option.current.classList.remove("incorrect");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", fullName);
    window.location.reload()
  };


  return (
    <div className="container">
      {user && <h1> {count}</h1>}
      
      <h1>Quiz App</h1>

      {!user ? (
        
        <form onSubmit={handleSubmit}>
             <div className="enter">
          <input
            type="text"
            placeholder="Enter your name"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
          />
       
          <button>Enter</button>
        </div>
        </form>
      ) : (
        <></>
      )}

     

      {user && (
        <>
          <hr />
          {!count ? (
            <></>
          ) : (
            <>
              <h2>
                {index + 1}. {question.question}
              </h2>

              <>
                <ul>
                  <li
                    ref={Option1}
                    onClick={(e) => {
                      checkAns(e, 1);
                    }}
                  >
                    {question.option1}
                  </li>
                  <li
                    ref={Option2}
                    onClick={(e) => {
                      checkAns(e, 2);
                    }}
                  >
                    {question.option2}
                  </li>
                  <li
                    ref={Option3}
                    onClick={(e) => {
                      checkAns(e, 3);
                    }}
                  >
                    {question.option3}
                  </li>
                  <li
                    ref={Option4}
                    onClick={(e) => {
                      checkAns(e, 4);
                    }}
                  >
                    {question.option4}
                  </li>
                </ul>
                {/* {!count >= 0 ? ( <button onClick={next}>Next</button>): (<h2>Time up</h2>)} */}
                <button onClick={next}>Next</button>
              </>

              <div className="index">
                {index + 1} of {quizData.length} questions
              </div>
            </>
          )}

          {!count ?  (
            <>
              <h2>
              {user}  You Scored {score} out of {quizData.length}
              </h2>
              <button onClick={reset}> Reset </button>
            </>
          ) : (
            <></>
          )}
          {/* { <h2>
            You Scored {score} out of {quizData.length}
          </h2> }
          <button onClick={reset}> Reset </button> */}
        </>
      )}
    </div>
  );
};

export default Quiz;
