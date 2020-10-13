import React, { useState, useEffect } from "react";
import Game from "components/Admin/Game";
import { dbService } from "fbase";

const GameList = () => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    dbService.collection("game").onSnapshot((snapshot) => {
      const gameArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGames(gameArray);
      setSearchList(gameArray)
      setIsLoading(true);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if(search == ""){
      setSearchList(games)
    }else{
      setSearchList([])
      games.map((game)=>{
        if(game.title.includes(search)){
          setSearchList((prevList) => [...prevList, game])
        }
      })
    }
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSearch(value);
  };

  return (
    <div>
      <h1>게임리스트</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="게임 제목을 입력하세요"
          value={search}
          required
          onChange={onChange}
        />
        <input type="submit" value="검색" />
      </form>
      <div>
        <ul>
          {isLoading ? (
            searchList.map((game) => <Game id={game.id} key = {game.id} title={game.title} />)
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default GameList;
