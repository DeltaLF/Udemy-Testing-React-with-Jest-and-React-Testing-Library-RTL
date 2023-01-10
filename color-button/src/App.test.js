import { fireEvent, render, screen } from '@testing-library/react';
import { logRoles } from '@testing-library/react';
import App from './App';

test('buttons has correct initial color', () => {
  const {container} = render(<App />);
  logRoles(container);
  const button = screen.getByRole('button',{name: 'change to blue'});
  expect(button).toHaveStyle({
    backgroundColor:'red'
  })
});

test('button turns blue and updates textContent when clicked ',()=>{
  render(<App/>);
  const button = screen.getByRole('button', {name:'change to blue' });
  fireEvent.click(button);
  expect(button).toHaveStyle({
    backgroundColor:'blue'
  });
  expect(button).toHaveTextContent('change to red');
});

test('check box and button inital state',()=>{
  render(<App />);
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  const button = screen.getByRole('button', {name:'change to blue'})
  expect(button).toBeEnabled();
  
});


test('check and uncheck checkbox',()=>{
  render(<App />);
  const checkbox = screen.getByRole('checkbox',{id:'disable-button-checkbox'});
  const button = screen.getByRole('button', {name:'change to blue'})
  // check checkbox
  fireEvent.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(button).toHaveAttribute('disabled');
  // uncheck checkbox
  fireEvent.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(button).not.toHaveAttribute('disabled');
  
});
