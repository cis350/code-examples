/**
* @jest-environment jsdom
*/


import '@testing-library/jest-dom/extend-expect';
import  { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';

import Questions from './Questions';

const list =`[{
    "img": "https://upload.wikimedia.org/wikipedia/commons/e/ea/Dog_coat_variation.png",
    "option1": "Terrier",
    "option2": "Foxhound",
    "option3": "Bulldog",
    "option4": "Geman S",
    "correct": "Terrier"
},
{
    "img": "https://upload.wikimedia.org/wikipedia/commons/b/bb/Kittyply_edit1.jpg",
    "option1": "Burmese",
    "option2": "Manx",
    "option3": "Ragdoll",
    "option4": "Persian",
    "correct": "Manx"
}
]`;

test('submit button',() => {
 render(< Questions questionslist={list} player='testplayer'/>);
 const linkElement = screen.getByText('Submit');
expect(linkElement).toBeInTheDocument();
});

test('player name',() => {
    render(< Questions questionslist={list} player='testplayer'/>);
    const linkElement = screen.getByText(/testplayer/i);
   expect(linkElement).toBeInTheDocument();
   });
