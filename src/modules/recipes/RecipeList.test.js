import React from 'react';
import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import Recipes from './RecipesList';


test('loading text is shown while API request is in progress', async () => {
    render(<Recipes />);
    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));
    const recipe = await screen.getByText('Gouda Vibes Burgers');
    expect(recipe).toBeInTheDocument(); 
   
});

 
