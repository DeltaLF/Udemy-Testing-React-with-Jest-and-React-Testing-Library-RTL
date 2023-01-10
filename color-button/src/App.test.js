import { fireEvent, render, screen } from '@testing-library/react';
import { logRoles } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces } from './App';

test('buttons has correct initial color', () => {
  const {container} = render(<App />);
  logRoles(container);
  const button = screen.getByRole('button',{name: 'change to midnightblue'});
  expect(button).toHaveStyle({
    backgroundColor:'mediumvioletred'
  })
});

test('button turns midnightblue and updates textContent when clicked ',()=>{
  render(<App/>);
  const button = screen.getByRole('button', {name:'change to midnightblue' });
  fireEvent.click(button);
  expect(button).toHaveStyle({
    backgroundColor:'midnightblue'
  });
  expect(button).toHaveTextContent('change to mediumvioletred');
});

test('check box and button inital state',()=>{
  render(<App />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  const button = screen.getByRole('button', {name:'change to midnightblue'})
  expect(button).toBeEnabled();
  
});


test('check and uncheck checkbox',()=>{
  render(<App />);
  const checkbox = screen.getByRole('checkbox',{name:'disable button',id:'disable-button-checkbox'});
  const button = screen.getByRole('button', {name:'change to midnightblue'})
  // check checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toHaveAttribute('disabled');
  // uncheck checkbox
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).not.toHaveAttribute('disabled');
  
});

test('button should be gray when disabled',()=>{
  render(<App />);
  const button = screen.getByRole('button', {name:'change to midnightblue'});
  const checkbox = screen.getByRole('checkbox', {name:'disable button'});
  // inital state is red
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor:'gray'});
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor:'mediumvioletred'});
  // inital state is blue
  fireEvent.click(button);
  expect(button).toHaveStyle({backgroundColor:'midnightblue'});
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor:'gray'});
  
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor:'midnightblue'});

})

describe('spaces before camel-case captial letters',()=>{
  test('Works for no inner capital letters',()=>{
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  });
  test('Works for one inner capital ketter',()=>{
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters',()=>{
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')     
  })
})