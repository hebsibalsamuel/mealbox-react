import React, { useEffect,useCallback } from 'react';

import { Row, Col } from '../../components/Grid';
import Flex from '../../components/Flex';
import Box from '../../components/Box';
import RecipeCard from './RecipeCard';
import PriceInfo from './PriceInfo';
import Text from '../../components/Text';
import { parseRawPrice } from './price';
import useFetchMealBox from '../../hooks/useFetchMealBox';

// ============Price Summmary constructor function================
const PriceSummary = function (id, recipeName, selections, extraCharge, shippingPrice, baseRecipePrice) {
  this.id = id;
  this.recipeName = recipeName;
  this.selections = selections;
  this.extraCharge = extraCharge;
  this.shippingPrice = shippingPrice;
  this.basePrice = baseRecipePrice;
  this.totalRecipePrice = 0;
}

const Recipes = () => {
  // This state stores the array of recipes with the changes performed by the customer.
  const [recipes, setRecipes] = React.useState([]);
  const { data, loading } = useFetchMealBox();
  const [selectedRecipes, setSelectedRecipes] = React.useState(0);
  const [selectedRecipeDetails, setSelectedRecipeDetails] = React.useState([]);
  const [price, setPrice] = React.useState(0);


  // add/remove recipe, feel free to remove or rename these these variables and values.
  const handleAddRecipe = useCallback((recipeId) => {
    let recipeSelected = false
    let addedRecipe = {}
    // ================Recipes array manipulation on adding new a new recipe========================
    let addRecipe = recipes.map((recipe) => {
      if (recipeId === recipe.id) {
        let selection = recipe.selected + 1
        addedRecipe = recipe
        if (selection > 1) {
          recipeSelected = true
        }
        return { ...recipe, selected: recipe.selected + 1 };
      }
      return recipe
    })
    // ================Adding details for price calculation==========================
    if (recipeSelected) {
      let priceSummaries = selectedRecipeDetails.map(recipeState => {
        if (recipeId === recipeState.id) {
          return { ...recipeState, selections: recipeState?.selections + 1 }
        }
        return recipeState
      })
      setSelectedRecipeDetails(priceSummaries)
    }
    else {      
      let { id, name, selected, extraCharge } = addedRecipe
      let priceSummary = new PriceSummary(id, name, selected + 1, extraCharge, data?.shippingPrice, data?.baseRecipePrice)
      setSelectedRecipeDetails([...selectedRecipeDetails, priceSummary])
    }
    setRecipes(addRecipe)
    setSelectedRecipes(selectedRecipes + 1)
  },[data,recipes,selectedRecipeDetails,selectedRecipes]);
  // const handleRemoveRecipe = () => null;
  const handleRemoveRecipe = useCallback((recipeId) => {
    // ===============recipe array & price changes on removing a recipe====================================
    let removeRecipes = recipes.map((recipe) => {
      if (recipeId === recipe.id) {
        return { ...recipe, selected: recipe.selected - 1 };
      }
      return recipe
    })
    let removeSummary = selectedRecipeDetails.reduce((newSummary, summary) => {
      if (summary.id === recipeId) {
        summary.selections -= 1
      }
      if (summary.selections > 0) {
        newSummary.push(summary)
      }
      return newSummary
    }, [])
    setRecipes(removeRecipes)
    setSelectedRecipeDetails(removeSummary)
    setSelectedRecipes(selectedRecipes - 1)
  },[recipes,selectedRecipeDetails,selectedRecipes]);



  // min/max recipe boundaries, feel free to remove or rename these variables and values.
  const minRecipesSelected = (selectedRecipes >= data?.min) ? true : false;
  const maxRecipesSelected = (selectedRecipes >= data?.max) ? true : false;

  // price summary and total price, feel free to remove or rename these variables and values.
  const summary = selectedRecipeDetails;
  const totalPrice = parseRawPrice(price);

  useEffect(() => {
    // ============fetching recipes data/find if any recipe is selected & create details for them====================================
    const { recipes: fetchedRecipes } = data;
    let selectedRecipesList = []
    let selectedRecipesCount = 0
    if (fetchedRecipes) {
      selectedRecipesList = data.recipes.reduce((existingSelections, recipe) => {
        let { id, name, selected, extraCharge } = recipe
        if (selected > 0) {
          selectedRecipesCount += 1         
          let priceSummary = new PriceSummary(id, name, selected, extraCharge, data?.shippingPrice, data?.baseRecipePrice)
          existingSelections.push(priceSummary)
        }
        return existingSelections;

      }, [])
      setRecipes(fetchedRecipes);
      setSelectedRecipes(selectedRecipesCount)
      if (selectedRecipesList.length >= 1) {
        setSelectedRecipeDetails(selectedRecipesList)
      }
    
    }
  }, [data]);

  useEffect(() => {
    // ==============cart value updation=============================
    let cartTotal = 0    
    if (selectedRecipeDetails.length >= 1) {
      let recipePrice = 0
      selectedRecipeDetails.forEach((selectedRecipe) => {
        // (Base Recipe Price + Extra Charge) * Selected Times
        let { basePrice, extraCharge, selections } = selectedRecipe
        let currRecipe = (basePrice + extraCharge) * selections
        selectedRecipe.totalRecipePrice = currRecipe
        recipePrice += currRecipe
        return selectedRecipe
      })
      cartTotal = recipePrice + data?.shippingPrice
    }
    setPrice(cartTotal)
  }, [data, selectedRecipeDetails])

  if (loading) {
    return (<Text fontFamily="primary" fontSize='30px' fontWeight='600' textAlign='center' paddingTop='20vh'>
      Loading...
    </Text>)
  }

  return (
    <>
      <Row>
        <Col sm={6}>
          <h3>{data.headline}</h3>
        </Col>
        <Col sm={6}>
          <Flex alignItems="center" justifyContent="flex-end">
            <Box textAlign="right" mr="xs">
              <h3>{totalPrice}</h3>
            </Box>
            <PriceInfo summary={summary} totalPrice={totalPrice} />
          </Flex>
        </Col>
      </Row>

      <Row>
        {recipes.map((recipe) => (
          <Col sm={12} md={6} xl={4} key={recipe.id}>
            <Box mb="md">
              <RecipeCard
                {...recipe}
                handleAddRecipe={() => handleAddRecipe(recipe.id)}
                handleRemoveRecipe={() => handleRemoveRecipe(recipe.id)}
                minRecipesSelected={minRecipesSelected}
                maxRecipesSelected={maxRecipesSelected}
              />
            </Box>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Recipes;
