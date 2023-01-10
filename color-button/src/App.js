import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

export function replaceCamelWithSpaces(color){
  const reg = /\B[A-Z]\B/g
  // or (reg, ' $1')
  return  color.replace(reg,function(letter){return (' ' + letter)})
}
console.log(replaceCamelWithSpaces('asfsfASfLFsffsAS'))
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
      <button style={{backgroundColor: isDisable ? 'gray' : buttonColor }} onClick={buttonClickHandler} disabled={isDisable}>
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
