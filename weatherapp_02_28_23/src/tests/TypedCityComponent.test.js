/**
 * @jest-environment jsdom
 */

import React from 'react';
// import the UI testing matchers
import '@testing-library/jest-dom/extend-expect';
// import DOM query functions
import { render, screen } from '@testing-library/react';
// import user event
import userEvent from '@testing-library/user-event';
// import renderer for snapshot testing
import renderer from 'react-test-renderer';
// import the component
import TypedCityComponent from '../components/TypedCityComponent';

// test that the component matches the wireframe
// test the presence of the textbox and the button
describe('Component rendering tests', () => {
  test('test that the textbox is in the document', () => {
    // render the component
    const { getByRole } = render(<TypedCityComponent />);
    // find the element by its role
    const inputBox = getByRole('textbox');
    // assert that the element is in the document
    expect(inputBox).toBeInTheDocument();
  });

  test('test that the button is in the document', () => {
    // render the component
    const { getByRole } = render(<TypedCityComponent />);
    // find the element by its role
    const okButton = getByRole('button');
    // assert that the element is in the document
    expect(okButton).toBeInTheDocument();
  });

  test('test that OK is in the document', () => {
    // render the component
    const { getByText } = render(<TypedCityComponent />);
    // find the element by its role
    const okText = getByText(/OK/);
    // assert that the element is in the document
    expect(okText).toBeInTheDocument();
  });
});

test('snapshot test', () => {
  const component = renderer.create(<TypedCityComponent />);
  const domTreeJSON = component.toJSON();
  // matcher
  expect(domTreeJSON).toMatchSnapshot();
});

test('test user flow typed city -> hit OK', async () => {
  // render the component
  render(<TypedCityComponent />);
  // test that "Temp is not in the document"
  const tempElement = screen.queryByText(/Temp/);
  // tempElement should be null
  expect(tempElement).toBeNull();

  // fire the user event
  // find the textbox and type atlanta into it
  await userEvent.type(screen.getByRole('textbox'), 'atlanta');

  // click on the OK button
  await userEvent.click(screen.getByRole('button'));

  // check that Temp is now is the document
  expect(screen.getByText(/Temp:/)).toBeInTheDocument();
});
