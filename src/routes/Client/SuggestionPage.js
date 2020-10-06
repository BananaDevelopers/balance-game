import React, { useState, useEffect } from "react";
import { dbService } from "fbase";
import Suggest from "components/Client/Suggest";

function SuggestionPage() {
  const [Suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    dbService.collection("Suggestions").onSnapshot((snapshot) => {
      const suggestionArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSuggestions(suggestionArray);
    });

    return () => {};
  }, []);

  return (
    <div>
      <div>
        {Suggestions.map((Suggestion) => (
          <Suggest key={Suggestion.id} SuggestionObj={Suggestion} />
        ))}
      </div>
    </div>
  );
}

export default SuggestionPage;
