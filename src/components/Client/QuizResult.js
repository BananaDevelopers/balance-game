import React from "react";

const QuizResult = ({ obj, flag }) => {
  console.log(obj);

  return (
    <div>
      {flag === 0 ? (
        <div>
          {obj?.QuizL}{" "}
          {(parseInt(obj?.QuizLCount) /
            (parseInt(obj?.QuizLCount) + parseInt(obj?.QuizRCount))) *
            100}
          % {obj?.QuizLCount}명
        </div>
      ) : (
        <div>
          {obj?.QuizR}{" "}
          {(parseInt(obj?.QuizRCount) /
            (parseInt(obj?.QuizLCount) + parseInt(obj?.QuizRCount))) *
            100}
          % {obj?.QuizRCount}명
        </div>
      )}
    </div>
  );
};

export default QuizResult;
