import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Results = () => {
  let params = useParams();
  const [id, setId] = useState();
  const [results, setResults] = useState([
    {
      id: "11111",
      title: "건더기",
      description: "당신은 이런성격이에요오오오오오오오오오오오오오",
      imgUrl: "",
      date: "2020-10-05",
    },
    {
      id: "22222",
      title: "쿠우",
      description: "당신은 이런성격이에요오오오오오오오오오오오오오",
      imgUrl: "",
      date: "2020-10-06",
    },
    {
      id: "33333",
      title: "자라",
      description: "당신은 이런성격이에요오오오오오오오오오오오오오",
      imgUrl: "",
      date: "2020-10-05",
    },
  ]);

  useEffect(() => {
    setId(params.id);
    return () => {};
  }, []);

  return (
    <div>
      <h1>결과보기 (#{id})</h1>
      <button>결과 수정</button>
      <div>
        <ul>
          {results.map((result) => (
            <li>
              <p>{result.id}</p>
              <p>{result.title}</p>
              <p>{result.imgUrl}</p>
              <p>{result.description}</p>
              <p>{result.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
