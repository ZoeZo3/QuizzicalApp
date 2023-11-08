import React from "react"

export default function QuestionBlock(props) {
    const answers = props.data.answers.map(answer => {
        let style = {
            backgroundColor: "",
            border: "1px solid #4D5B9E"
        }
        if (answer.status === "correct") {
            style = {
                backgroundColor: "#94D7A2",
                borderStyle: "none"
            }
        } else if (answer.status === "incorrect") {
            style = {
                backgroundColor: "#F8BCBC",
                borderStyle: "none",
                color: "grey"
            }
        } else if (answer.status === "neutral") {
            style = {
                color: "grey",
                border: "1px solid lightgrey"
            }
        } else if (answer.isSelected) {
            style = {
                backgroundColor: "#D6DBF5",
                borderStyle: "none"
            }
        }
        
        return (<div
            key={answer.id}
            id={answer.id}
            className="answer"
            style={style}
            onClick={() => props.handleSelect(props.data.id, answer.id)}
        >{answer.text}</div>)
    
    })
    
    
    return(
        <div className="question-block">
            <h2 className="question-header">{props.data.question}</h2>
            <div className="question-answers">
                {answers}
            </div>
            <hr className="separator"></hr>
        </div>
    )
}