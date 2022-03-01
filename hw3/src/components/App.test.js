/**
 * @jest-environment jsdom
 */

import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import App from './App'

test('start button', () => {
render(<App />);
const linkElement = screen.getByText('Start');
expect(linkElement).toBeInTheDocument();
});


test('snapshot test', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
