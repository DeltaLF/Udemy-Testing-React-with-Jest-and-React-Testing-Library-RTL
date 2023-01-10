import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');

  function buttonClickHandler(e){
    if(buttonColor === 'red'){
      setButtonColor('blue');
    }else{
      setButtonColor('red');
    }
  }
  const colorToBeChanged = buttonColor === 'red' ? 'blue' : 'red';
  
  return (
    <div className="App">
      <button style={{backgroundColor: buttonColor }} onClick={buttonClickHandler}>
        {`change to ${colorToBeChanged}`}
      </button>
    </div>
  );
}

export default App;
