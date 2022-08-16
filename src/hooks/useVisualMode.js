import { useState } from "react";

const useVisualMode = function(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

 function transition(toMode, replaceCurrent = false) {
    setMode(toMode);
    setHistory(prev => [...(replaceCurrent ? prev.slice(0,-1) : prev), toMode])
  }

  function back() {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
      setMode(history.slice(-2)[0]);
    } else {

    }

    
  }
  
  return { mode, transition, back };
}


export {useVisualMode};