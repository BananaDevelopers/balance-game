import React from 'react'

const Quiz  = ({id, title, QuizL, QuizLCount, QuizR,  QuizRCount}) => {
    return(
        <li>
            <p>#{id}</p>
            <p>{title}</p>
            <p>
            {QuizL}({QuizLCount})
            </p>
            <p>
            {QuizR}({QuizRCount})
            </p>
        </li>
    )
}

export default Quiz
