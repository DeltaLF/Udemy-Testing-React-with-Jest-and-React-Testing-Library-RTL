import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [buttonColor, setButtonColor] = useState('red');
  const [isDisable, setIsDisable] = useState(false);

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
      <button style={{backgroundColor: buttonColor }} onClick={buttonClickHandler} disabled={isDisable}>
        {`change to ${colorToBeChanged}`}
      </button>
      <input
        id="disable-button-checkbox" 
        type="checkbox" 
        name='disable button' 
        onChange={(e)=>{ setIsDisable(e.target.checked)}}
        />
      <label htmlFor='disable-button-checkbox'>disable button</label>
    </div>
  );
}

export default App;
