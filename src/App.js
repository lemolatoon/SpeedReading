import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

const useInterval = (callback, delay) => {
  useEffect(() => {
      const interval = setInterval(() => 
          callback()
      , delay || 0);
      return () => clearInterval(interval);
  }, [callback, delay]);
}

function App() {
  const [orig, setOrig] = useState("");
  const [text, setText] = useState("");
  const [playing, setPlaying] = useState(false);
  const showing = useRef(0);
  const callback = useCallback(() => {
    if (playing) {
      console.log("a");
      if (showing.current + 3 > orig.length)
      setText(orig.slice(showing.current, showing.current + 5));
      showing.current += 5;
    } else {
      showing.current = 0;
    }
  }, [playing, showing, setText, orig]);
  useInterval(callback, 300);
  const onChange = (text) => {
    setOrig(text)
    showing.current = 0;
  };
  return (
    <div className="App">
      <input type="text" onChange={e => onChange(e.target.value)} />
      <button onClick={() => setPlaying(true)}>start</button>
      <button onClick={() => setPlaying(false)}>stop</button>
      <h2 className='text'>
        {text}</h2>
    </div>
  );
}

export default App;
