import React from "react";

const GameSelector = ({ onGameSelected }) => {
  const gameList = [
    {
      name: "Countries",
      url: "https://raw.githubusercontent.com/leocondamine/geo-puzzle-challenge/main/src/maps/countries_very_simplified_258.json",
    },
    // Add more JSON files here
  ];

  const handleSelection = (event) => {
    onGameSelected(event.target.value);
  };

  return (
    <div className="fixed flex justify-center items-center gap-4 z-10 top-12 left-0 bg-black h-12 w-[30%] color-slate-500">
      <label htmlFor="gameSelector">Choose a game : </label>
      <select id="gameSelector" onChange={handleSelection}>
        <option className="text-black" value="">
          Select a game
        </option>
        {gameList.map((game, index) => (
          <option key={index} value={game.url} className="text-black">
            {game.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GameSelector;
