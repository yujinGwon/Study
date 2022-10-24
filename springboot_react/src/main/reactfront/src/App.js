import './App.css';
import { useState } from 'react';

function App() {
  //let name = 'newJin';
  const [num, setNum] = useState(0);

  const [numList, setNumList] = useState([]);

  function numRecording () {
    setNumList([...numList, num]);
    setNum(0);
  }

  return (
    <div className="App">
      <div>현재 숫자 : {num}</div>
      <button onClick={() => {setNum(num+1)}}>숫자 증가</button>
      <button onClick={() => {setNum(num-1)}}>숫자 감소</button>
      <button onClick={numRecording}>숫자 기록</button>
      <h1>저장된 숫자</h1>
      <ul>
        {numList.map((num) => (
          <li>{num}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
