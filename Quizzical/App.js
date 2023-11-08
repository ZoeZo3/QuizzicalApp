import React from "react"
import Homepage from "./Homepage"
import Quizz from "./Quizz"
import {nanoid} from "nanoid" 
import {decode} from 'html-entities';

export default function App() {
    const [quizzStatus, setQuizzStatus] = React.useState("not_started")
    const [questions, setQuestions] = React.useState([])
    const [score, setScore] = React.useState(0)

    function startQuizz() {
        setQuizzStatus("started")
    }

    function selectQuestion(question_id, answer_id) {
        setQuestions(oldQuestions => oldQuestions.map(
            oldQuestion => {
                return oldQuestion.id === question_id ?
                ({
                    ...oldQuestion,
                    answers: oldQuestion.answers.map(answer => (
                        answer.id === answer_id ?
                            {...answer, isSelected: true} :
                            {...answer, isSelected: false}
                    )),
                }) :
                    oldQuestion
                }))
    }

    function submitQuizz() {
        // check answers and update the visual
        setQuestions(prevQuestions => (
            prevQuestions.map(prevQuestion => (
                {
                    ...prevQuestion,
                    answers: prevQuestion.answers.map(answer => {
                        if (answer.text === prevQuestion.correct_answer) {
                            return {...answer, status: "correct"}
                        } else {
                            return {...answer, status: answer.isSelected ? "incorrect" : "neutral"}
                        }
                    })
                }))
        ))
            
        // update score
        questions.map(question => {
            const selected_answer = question.answers.find(answer => answer.isSelected)
            if (selected_answer && selected_answer.text === question.correct_answer) {
                setScore(prevScore => prevScore + 1)
            }
        })

        // update display buttons
        setQuizzStatus("ended")
    }

    function restartQuizz() {
        setQuizzStatus("started")
        setScore(0)
    }

    React.useEffect(() => {
        if (quizzStatus === "started") {
            fetch("https://opentdb.com/api.php?amount=5")
            .then(result => result.json())
            .then(data => {
                setQuestions(data.results.map(result => {
                    const answers_array = result.incorrect_answers.map(answer => ({
                        id: nanoid(),
                        text: decode(answer),
                        isSelected: false,
                        status: "none"
                    }))
                    answers_array.splice(Math.round(Math.random() * 4), 0,
                        {
                            id: nanoid(),
                            text: decode(result.correct_answer),
                            isSelected: false,
                            status: "none"
                        })
                    
                    return {
                        question: decode(result.question),
                        correct_answer: decode(result.correct_answer),
                        answers: answers_array.map(answer => decode(answer)),
                        id: nanoid()
                    }
                }))
            })
        }
    }, [quizzStatus])

    return (
        <div>
            {quizzStatus === "not_started" ?
                <Homepage handleClick={startQuizz} /> :
                <Quizz
                    data={questions}
                    handleSelect={selectQuestion}
                    handleSubmit={submitQuizz}
                    handleRestart={restartQuizz}
                    quizzStatus={quizzStatus}
                    score={score}
                />}
        </div>
    )
}