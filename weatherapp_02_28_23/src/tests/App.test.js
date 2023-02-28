/**
* @jest-environment jsdom
*/

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
// import testing library functions
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import WeatherApp from '../App';
// import WeatherComponent from '../components/WeatherComponent';

// test that the UI matches the wireframes
test('renders Philadelphia link', () => {
  const { getByText } = render(<WeatherApp />);
  const linkElement = getByText(/Philadelphia/);
  expect(linkElement).toBeInTheDocument();
});

// snapshot testing

test('Weather app matches snapshot', () => {
  const component = renderer.create(<WeatherApp />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
/**
// test click event

test('The weather is shown after clicking on a link', async () => {
  // render the component
  render(<WeatherApp />);
  // fire a click on the a link with text Philadelphia'
  await userEvent.click(screen.getByText('Philadelphia'));
  // The weather box is shown and 'Temp' is visible
  const linkElement = screen.getByText(/Temp/);
  expect(linkElement).toBeInTheDocument();
});
*/