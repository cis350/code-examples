import { render, screen } from '@testing-library/react';
import { renderer } from 'react-test-renderer';
import App from './App';

test('renders philadelphia', () => {
  render(<App />);
  const linkElement = screen.getByText(/philadelphia/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Boston', () => {
  render(<App />);
  const linkElement = screen.getByText(/Boston/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Dakar', () => {
  render(<App />);
  const linkElement = screen.getByText(/Dakar/i);
  expect(linkElement).toBeInTheDocument();
});


test('snapshot testing', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});