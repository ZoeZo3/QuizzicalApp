import React from "react"
import QuestionBlock from "./QuestionBlock"

export default function Quizz(props) {
    const questions = props.data.map(question => (
        <QuestionBlock key={question.id} data={question} handleSelect={props.handleSelect} />
    ))

    return (
        <div className="quizz">
            <div className="questions">
                {questions}
            </div>
            {props.quizzStatus === "started" ?
                <button
                    className="submit"
                    onClick={props.handleSubmit}
                >Check answers</button> :
                <div className="score-section">
                    <p>You scored {props.score}/5 correct answer{props.score > 1 ? "s" : ""}</p>
                    <button
                        className="submit"
                        onClick={props.handleRestart}
                    >Play again</button>
                </div>
            }
        </div>
       
    )
}