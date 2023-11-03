import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeType, setTimeType] = useState("SESSION");
  const [timeLeftSec, setTimeLeftSec] = useState(1500);
  const [play, setPlay] = useState(false);
  const title = timeType === "SESSION" ? "Session" : "Break";
  const timeout = setTimeout(() => {
    if (timeLeftSec && play) {
      setTimeLeftSec(timeLeftSec - 1)
    }
  }, 1000);


  const handleBreakIncrease = () => {
    if(breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  };
  const handleBreakDecrease = () => {
    if(breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  };
  const handleSessionIncrease = () => {
    if(sessionLength < 60) {
      setSessionLength(sessionLength + 1);
      setTimeLeftSec(timeLeftSec + 60);
    }
  };
  const handleSessionDecrease = () => {
    if(sessionLength > 1) {
      setSessionLength(sessionLength - 1);
      setTimeLeftSec(timeLeftSec - 60);
    }
  };
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeftSec / 60);
    const seconds = timeLeftSec - minutes * 60;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const handlePlayButton = () => {
    clearTimeout(timeout);
    setPlay(!play);
  };
  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setTimeType("SESSION");
    setTimeLeftSec(1500);
    setPlay(false);
    clearTimeout(timeout);
    const audio = document.getElementById("beep");
    audio.pause();
    audio.currentTime = 0;
  };
  const statusChange = () => {
    const audio = document.getElementById("beep");
    if (!timeLeftSec && timeType === "SESSION") {
      setTimeLeftSec(breakLength * 60);
      setTimeType("BREAK");
      audio.play();
    }
    if (!timeLeftSec && timeType === "BREAK") {
      setTimeLeftSec(sessionLength * 60);
      setTimeType("SESSION");
      audio.pause();
      audio.currentTime = 0;
    }

  };
  const clock = () => {
    if(play) {
      statusChange()
    } else {
      clearTimeout(timeout)
    };
  };
  useEffect(() => {
    clock()
  }, [play, timeLeftSec, timeout]);
  
  return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
    <div className="wrapper">
      <h1>25 + 5 Clock by Junaid</h1>
      <div className="break-session-length">

        <div>
          <h3 id="break-label">Break Length</h3>
          <div>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment">Increase</button>
            <strong id="break-length">{breakLength}</strong>
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">Decrease</button>
          </div>
        </div>

        <div>
          <h3 id="session-label">Session Length</h3>

          <div>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment">Increase</button>
            <strong id="session-length">{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">Decrease</button>
          </div>

        </div>
      </div>
      <div className="time-wrapper">
        <div className="timer">
          <h2 id="timer-label">{title}</h2>
          <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <button onClick={handlePlayButton} id="start_stop">Start/Stop</button>
        <button onClick={handleReset} id="reset">Reset</button>
      </div>
      <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>
    </div>
  );
}

export default App;
