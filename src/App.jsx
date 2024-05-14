import React, { useState } from "react";
import MapDisplay from "./components/MapDisplay";
import GameController from "./GameController";
import GameSelector from "./components/GameSelector";

const App = () => {
  const [gameURL, setGameURL] = useState("");

  return (
    <>
      <GameSelector onGameSelected={setGameURL} />
      <GameController gameURL={gameURL} />
    </>
  );
};

export default App;
