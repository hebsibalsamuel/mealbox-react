import React from 'react';
import {
    render,
    screen, act
} from '@testing-library/react';
import PriceSummary from './PriceSummary';


test('Summary should be empty', async () => {
    act(() => { render(<PriceSummary summary={[]} />); })
    const emptyText = await screen.getByText('Cart is empty!');
    expect(emptyText).toBeInTheDocument();
});

test('Summary should Have Total', async () => {
    let summary = [{
        basePrice: 1798,
        extraCharge: 0,
        id: "5f4d4a7e62fb0224951e7ec4",
        recipeName: "Chicken Sausage & Spinach Ravioli",
        selections: 0,
        shippingPrice: 1298,
        totalRecipePrice: 1798
    }]
    act(() => { render(<PriceSummary summary={summary} totalPrice="$30.96" />) })
    const Total = await screen.getByText('$30.96');
    expect(Total).toBeInTheDocument();
});


