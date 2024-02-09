import React, { useEffect, useState } from "react";
import questions from "../database/questions";
import '../styles/Questions.css'
import Result from "./Result";

const Questions = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(600);
    const [testRunning, setTestRunning] = useState(true);
    const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.questions.length).fill(null));
    const [showResult, setShowResult] = useState(false);

    const question = questions.questions[currentQuestionIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTimeLeft => {
                if (prevTimeLeft === 0) {
                    clearInterval(timer);
                    setTestRunning(false);
                    setShowResult(true);
                    return 0;
                }
                return prevTimeLeft - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function onSelect(event) {

        const selectedOption = event.target.value;
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentQuestionIndex] = selectedOption;
        setSelectedAnswers(updatedSelectedAnswers);
    }

    function handleNext() {
        if (currentQuestionIndex < questions.questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    }

    function handlePrev() {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    }

    const handleFinishClick = () => {
        setShowResult(true);

    }



    if (showResult) {
        return (
            <Result
                loginId="$"
                selectedAnswers={selectedAnswers}
            />
        );
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', }}>
                <div className='questions'>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h1 style={{ color: 'brown', marginLeft: 20 }}>Driving License Test</h1>
                        <div className='timer-box'>
                            {testRunning && <div className='time-left'>Time left: <span className='red-clock'>{formatTime(timeLeft)}</span></div>}
                            {!testRunning && <div className='time-up'>Time's up!</div>}
                        </div>
                    </div>
                    <h2 className='text-dark' style={{ margin: 40 }}>{question?.question}</h2>
                    <ul key={question?.id}>
                        {question?.options.map((q, i) => (
                            <li key={i}>
                                <input
                                    type="radio"
                                    value={q}
                                    name="options"
                                    id={`q${i}-option`}
                                    onChange={onSelect}
                                    checked={selectedAnswers[currentQuestionIndex] === q}
                                />
                                <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                                <div className="check "></div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ marginLeft: 50, marginTop: 10 }}>
                        <button style={{ paddingBlock: 10, paddingInline: 20 }} className='btn prev' onClick={handlePrev} disabled={currentQuestionIndex === 0}>Prev</button>
                    </div>
                    <div style={{ marginRight: 50, marginTop: 10 }}>
                        {currentQuestionIndex === questions.questions.length - 1 ?
                            <button style={{ paddingBlock: 10, paddingInline: 20 }} className='btn finish' onClick={handleFinishClick}>Finish</button> :
                            <button style={{ paddingBlock: 10, paddingInline: 20 }} className='btn next' onClick={handleNext}>Next</button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Questions;
