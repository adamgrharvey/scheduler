import { useState } from "react";

const useVisualMode = function(initialMode) {
  // initialize states
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  // when we transition from one mode to another, i.e. when we need the appointment div to change what is being displayed.
 function transition(toMode, replaceCurrent = false) {
    setMode(toMode);
    // add this change to the history for later
    setHistory(prev => [...(replaceCurrent ? prev.slice(0,-1) : prev), toMode])
  }

  function back() {
    // can only go back if we HAVE a history.
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
      setMode(history.slice(-2)[0]);
    }
  }
  
  return { mode, transition, back };
}


export {useVisualMode};