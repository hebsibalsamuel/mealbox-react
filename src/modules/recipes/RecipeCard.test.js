import React from 'react';
import {
    render,
    screen,
    fireEvent,
    act
} from '@testing-library/react';
import RecipeCard from './RecipeCard';

test('Recipe card should have button', () => {
    const recipe = {
        id: '5f4d4e9b013bb224b742e2b1',
        name: 'Pork',
        slug: 'pork-flautas-supreme',
        headline: 'with Pico de Gallo & Lime Crema',
        image:
            'https://img.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/image/pork-flautas-supreme-1c661fd0.jpg',
        selected: 0,
        selectionLimit: null,
        extraCharge: 0,
        yields: 2,
    };
    render(<RecipeCard {...recipe} />);
    const button = screen.getByRole('button', {
        name: /add-5f4d4e9b013bb224b742e2b1/i
    })
    expect(button).toBeInTheDocument();
});

test('Recipe card button should be disabled', () => {
    const recipe = {
        id: '5f4d4e9b013bb224b742e2b1',
        name: 'Pork',
        slug: 'pork-flautas-supreme',
        headline: 'with Pico de Gallo & Lime Crema',
        image:
            'https://img.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/image/pork-flautas-supreme-1c661fd0.jpg',
        selected: 2,
        selectionLimit: 2,
        extraCharge: 0,
        yields: 2,
    };
    render(<RecipeCard {...recipe} />);
    const button = screen.getByRole('button', {
        name: /add-5f4d4e9b013bb224b742e2b1/i
    })
    expect((button).closest('button')).toBeDisabled();
});

test('Testing Add recipe Button', async() => {
    const handleAddRecipe = jest.fn();
    let recipe = {
        id: '5f4d4e9b013bb224b742e2b1',
        name: 'Pork',
        slug: 'pork-flautas-supreme',
        headline: 'with Pico de Gallo & Lime Crema',
        image:
            'https://img.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/image/pork-flautas-supreme-1c661fd0.jpg',
        selected: 0,
        selectionLimit: null,
        extraCharge: 0,
        yields: 2,
    };
    await act( async () => {
        render(<RecipeCard {...recipe} handleAddRecipe={() => handleAddRecipe() }/>) 
    }); 
    const button = screen.getByRole('button', {
        name: /add-5f4d4e9b013bb224b742e2b1/i
    }) 
    await act( async () => {
        fireEvent.click(button); 
    });   
       
    expect(handleAddRecipe).toHaveBeenCalledTimes(1);
});



