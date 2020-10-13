import Suggestion from "components/Admin/Suggestion";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const SuggestionList = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSuggestionList();
  }, []);

  const getSuggestionList = () => {
    dbService.collection("Suggestions").onSnapshot((snapshot) => {
      const suggestionArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuggestions(suggestionArray);
      setIsLoading(true);
    });
  };

  return (
    <>
      <h1>제안 목록</h1>
      {suggestions.map((sgt) => (
        <Suggestion
          id={sgt.id}
          quizName={sgt.quizName}
          quizL={sgt.quizL}
          quizR={sgt.quizR}
        />
      ))}
    </>
  );
};
export default SuggestionList;
