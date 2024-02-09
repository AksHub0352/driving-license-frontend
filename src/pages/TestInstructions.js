import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/TestInstructions.css'

export default function TestInstructions() {

    const handleStart = () => {
        window.location.href = '/questions';
    }


    return (
        <div className='container'>
            <h1 className='title text-dark'>Driving License Test </h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points is awarded for all correct answers.</li>
                <li>Each question has four options. You can choose only one option.</li>
                <li>You can review and change answers before the quiz finishes.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <div className='start'>
                <Link className='btn' onClick={handleStart} >Start </Link>
            </div>

        </div>
    )
}