

## INSTRUCTIONS

1. Clone this repository and install the dependencies using `yarn`
2. Create a new branch named dev `git checkout -b dev`
3. Use 'yarn start' to start the application in local
4. Deployed application link - https://relaxed-shockley-3de9a9.netlify.app/

### Recipe Selection

Adding and removing recipes from your box is the primary functionality of the Recipe Selection Page.

*   The **selected** property determines the recipe's selection, **0 means not selected**, and any integer above 0 is the **number of times** the recipe is **selected**.
*   A customer can **add** a recipe to their box **as many times** as they want, as long as they **don't exceed** the maximum number of **allowed recipes** per box or the recipe's **selection limit.**
*   When the **selection limit** of a recipe is reached, the **add button** should be **disabled** for that recipe
*   When the **maximum** number of allowed recipes in a box is **reached**, the **add button** for all recipes should be **disabled**.
*   When the **minimum** number of selected recipes for that box is **reached**, the copy of all the **add buttons** for the non-selected recipes **changes** from "Add" to "Add Extra Meal".


### Price Calculation & Price Summary

During the selection of recipes, we have to communicate to customers the price of their selection. For this task, you'll implement the price calculation functionality and the price summary user interface.



*   The **price summary** should include the price for **every selected recipe on your box**, the number of **times it is selected**, the **shipping price**, and the **total price**.
*   Some of our recipes with top-quality ingredients have an extra charge; the total price for a recipe is the base recipe price plus the extra charge by the number of times the recipe is selected: `Total Recipe Price = (Base Recipe Price + Extra Charge) * Selected Times`.
*   The **total price** is the **sum** of all the **selected recipes' total price** plus the **shipping price.**


### Meal Box


```json
{
  // Meal box identifier
  "id": "5f4e821d531e677602591a9b",
  // Product name
  "productName": "Classic Box",
  // Headline
  "headline": "WEEK OF OCTOBER 12TH'",
  // Minimum recipes for this Meal box
  "min": 3,
  // Maximum recipes for this Meal box
  "max": 8,
  // Base price of every recipe
  "baseRecipePrice": 1798,
  // Shipping price of this Meal box
  "shippingPrice": 1298,
  // Array of recipes that the customer can select for this Meal box
  "recipes": [
    {
      // Recipe identifier
      "id": "5f4d4a7e62fb0224951e7ec4",
      // Name of the recipe
      "name": "Chicken Sausage & Spinach Ravioli",
      // Recipe slug
      "slug": "chicken-sausage-spinach-ravioli",
      // Recipe headline
      "headline": "with Tomato & Lemon",
      // Recipe image
      "image":
        "/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg",
      // Indicates the times this recipe was selected, this is used to perform the recipe selection
      "selected": 1,
      // Maximum number of times this recipe can be selected
      "selectionLimit": 1,
      // Extra charge for this recipe
      "extraCharge": 0,
      // Servings
      "yields": 2,
    },
  ]
}
```

## GLOSSARY

**Meal Box:** the weekly physical box that arrives at your door containing the recipes that you have previously selected. Boxes have boundaries around the minimum and maximum recipes that you can receive.

**Recipe:** a combination of ingredients that are cooked together create a Meal recipe; a box can have multiple recipes and multiple items of the same recipe. This way, our customers can cook more portions of the same recipe in case they're throwing a dinner party!

**Recipe Selection:** the action of adding or removing a recipe from your box based on the configuration from your box and recipe, such as box selection boundaries and recipe selection limit.
