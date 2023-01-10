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
