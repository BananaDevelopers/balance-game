import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { dbService } from "fbase";

const ResultList = () => {
  let params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [editingGame, setEditingGame] = useState(false);

  const [id, setId] = useState();
  const [results, setResults] = useState([]);

  const [isAddResults, setIsAddResults] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [results, setResults] = useState([
  //   {
  //     id: "11111",
  //     title: "건더기",
  //     description: "당신은 이런성격이에요오오오오오오오오오오오오오",
  //     imgUrl: "",
  //     date: "2020-10-05",
  //   },
  //   {
  //     id: "22222",
  //     title: "쿠우",
  //     description: "당신은 이런성격이에요오오오오오오오오오오오오오",
  //     imgUrl: "",
  //     date: "2020-10-06",
  //   },
  //   {
  //     id: "33333",
  //     title: "자라",
  //     description: "당신은 이런성격이에요오오오오오오오오오오오오오",
  //     imgUrl: "",
  //     date: "2020-10-05",
  //   },
  // ]);

  const findResultByRef = (resultRef) => {
    resultRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          const resultObj = {
            id: resultRef.id,
            ...doc.data(),
          };
          console.log(resultObj);
          setResults((prevResults) => [...prevResults, resultObj]);
          // console.log("Document data:", resultObj);
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  useEffect(() => {
    setId(params.id);
    let gameRef = dbService.collection("game").doc(params.id);
    gameRef.onSnapshot((doc) => {
      if (doc.exists) {
        let gameObj = doc.data();
        gameObj.results.map((resultRef) => {
          findResultByRef(resultRef);
        });
        setIsLoading(true);
      }
    });
  }, []);

  return (
    <div>
      <h1>결과보기 (#{id})</h1>
      <button>결과 수정</button>
      {isLoading ? (
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ResultList;
