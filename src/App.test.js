import React from 'react';
import App from './App';
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';

test('loading text is shown while API request is in progress', async () => {
    render(<App />);
    const loading = screen.getByText('Loading...');

    expect(loading).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
});

test("Recipe is rendered", async () => {
    render(<App />);
    const recipe = await screen.findByText('Chicken Sausage & Spinach Ravioli');
    expect(recipe).toBeInTheDocument();
  }); 
