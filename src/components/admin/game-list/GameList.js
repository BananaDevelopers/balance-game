import React, { useState, useEffect } from "react";

import { dbService } from "fbase";
import Game from "components/admin/game-list/Game";

const GameList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dbService
      .collection("game")
      .get()
      .then((snapshot) => {
        // init games
        const gameArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGames(gameArray);
        setSearchList(gameArray);
        setIsLoading(true);
      });
  }, []);

  const onSearchClick = () => {
    if (search == "") {
      alert("비어있음");
    } else {
      setSearchList([]);
      games.map((game) => {
        if (game.title.includes(search)) {
          setSearchList((prevList) => [...prevList, game]);
        }
      });
    }
  };

  const onShowAllGame = () => {
    setSearch("");
    setSearchList(games);
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
      <div>
        <input
          type="text"
          placeholder="게임 제목을 입력하세요"
          value={search}
          required
          onChange={onChange}
        />
        <button onClick={onSearchClick}>검색</button>
        <button onClick={onShowAllGame}>전체보기</button>
      </div>
      <div>
        <ul>
          {isLoading ? (
            searchList.map((game) => (
              <Game id={game.id} key={game.id} title={game.title} />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
};
export default GameList;
