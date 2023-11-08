import React from "react"

export default function(props) {
    return(
        <div className="homepage">
            <h1>Quizzical</h1>
            <h5>Test your knowledge!</h5>
            <button
                className="homepage--start"
                onClick={props.handleClick}
            >
                Start quizz
            </button>
        </div>
    )
}