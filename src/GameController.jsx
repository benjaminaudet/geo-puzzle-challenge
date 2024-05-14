import React, { useEffect, useState } from "react";
import _ from "lodash";
import MapDisplay from "./components/MapDisplay";
import FeatureToGuess from "./components/FeatureToGuess";
import Score from "./components/Score";
import Timer from "./components/Timer";
import { savePlayerData } from "./firebase";

const GameController = ({ gameURL }) => {
  const [selectedFeature, setSelectedFeature] = useState([]);
  const [featuresToGuess, setFeaturesToGuess] = useState([]);
  const [guess, setGuess] = useState([]);
  const [countTries, setCountTries] = useState(1);
  const [blinkFeature, setBlinkFeature] = useState("");
  const [changeFeatureColor, setChangeFeatureColor] = useState("");
  const [score, setScore] = useState({ rows: 0, totalTries: 0 });
  const [startTimer, setStartTimer] = useState(false);
  const [playerTime, setPlayerTime] = useState(0);

  const fetchData = async () => {
    if (!gameURL) return;
    try {
      const data = await fetchJson(gameURL);
      const names = data.features.map((feature) => feature.properties.NAME);
      console.log(names);
      const shuffledNames = _.shuffle(names);
      setFeaturesToGuess(shuffledNames);
      setGuess(shuffledNames[0]);
    } catch (error) {
      console.warn(error);
    }
  };

  const fetchJson = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.warn(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, [gameURL]);

  const handleMapData = (data) => {
    setSelectedFeature(data);
  };

  useEffect(() => {
    try {
      if (!selectedFeature?.length) {
        return;
      } else if (!featuresToGuess.includes(selectedFeature)) {
        return;
      } else {
        startTimerIfNotStarted();
        checkGuess();
      }
    } catch (e) {
      console.log(e);
    }
  }, [selectedFeature]);

  const startTimerIfNotStarted = () => {
    if (!startTimer) {
      setStartTimer(true);
    }
  };

  const checkGuess = () => {
    if (selectedFeature === guess) {
      console.log("Guessed right !!! ");
      const guessFound = guess;
      const nbrFound = countTries;
      changeStateFeatureColor(nbrFound, guessFound);
      setScore({ rows: score.rows + 1, totalTries: score.totalTries + 1 });
      setNewGuess();
    } else {
      console.log("wrong choice");
      setBlinkFeature({
        feature: selectedFeature,
        color: "red",
        isInfinite: false,
      });
      if (countTries === 3) {
        console.log("tu es nul gros nullos");
        setTimeout(() => {
          setBlinkFeature({ feature: guess, color: "red", isInfinite: true });
        }, 1500);
      }
      setScore({ rows: score.rows, totalTries: score.totalTries + 1 });
      setCountTries(countTries + 1);
    }
  };

  const setNewGuess = () => {
    const remainingFeaturesToGuess = featuresToGuess.slice(1);
    const newFeatureToGuess = remainingFeaturesToGuess[0];
    setFeaturesToGuess(remainingFeaturesToGuess);

    resetCountTries();

    // to debug
    // if (featuresToGuess.length > 255) {
    if (featuresToGuess.length > 0) {
      setGuess(newFeatureToGuess);
    } else {
      setGameIsFinished();
      stopTimerIfRunning();
    }
  };

  const resetCountTries = () => {
    console.log("reset the number of tries");
    setCountTries(1);
  };

  const stopTimerIfRunning = () => {
    if (startTimer) {
      setStartTimer(false);
    }
  };

  const changeStateFeatureColor = (nbrFound, guessFound) => {
    // console.log(`nombre found = ${nbrFound}`);
    console.log(nbrFound, guessFound);
    if (nbrFound === 1) {
      setChangeFeatureColor({ feature: guessFound, color: "white" });
    } else if (nbrFound === 2) {
      setChangeFeatureColor({ feature: guessFound, color: "#FFBD8D" });
    } else if (nbrFound === 3) {
      setChangeFeatureColor({ feature: guessFound, color: "#FF710A" });
    } else {
      setChangeFeatureColor({ feature: guessFound, color: "red" });
    }
  };

  const setGameIsFinished = () => {
    console.log("the game is finished");
    console.log(playerTime);
    const playerName = prompt("Please enter your name:");
    if (playerName) {
      savePlayerData(playerName, score, playerTime);
    }
  };

  return (
    <>
      <MapDisplay
        onFeatureClicked={handleMapData}
        changeFeatureColor={changeFeatureColor}
        blinkFeature={blinkFeature}
        gameURL={gameURL}
      />
      <FeatureToGuess guess={guess} />
      <Score score={score} />
      <Timer startTimer={startTimer} onTimeUpdate={setPlayerTime} />
    </>
  );
};

export default GameController;
