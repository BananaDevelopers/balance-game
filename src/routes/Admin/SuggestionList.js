import { dbService } from 'fbase';
import React, { useEffect, useState } from 'react'

const SuggestionList = () => {
    const [suggestions, setSuggestions] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    
    useEffect(() => {
        getSuggestionList()
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
    }

    return (
        <>
            <h1>제안 목록</h1>
            {
                suggestions.map((sgt) => {
                    return (
                        <li>{sgt.id}</li>
                    )
                })
            }
        </>
    )
}
export default SuggestionList