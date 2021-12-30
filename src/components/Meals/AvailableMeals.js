import React, { useEffect, useState } from 'react'

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css'


const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [loading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeal = async () => {
      const response = await fetch('https://react-89efd-default-rtdb.firebaseio.com/meal.json');

      if(!response.ok){
        throw new Error('Something went wrong');
      }
      const loadedData = [];

      const data = await response.json();

      for(const key in data){
        loadedData.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }

      setMeals(loadedData);
      setIsLoading(false);
    }

      fetchMeal().catch(err => {
          setIsLoading(false);
          setHttpError(err)
      })
  },[])

  if(loading){
    return <section className={classes.mealLoading}>
      {httpError ? <p className={classes.mealError}>Error loading meals</p> : <p>Loading Meals.......</p>}
    </section>
  }

  if(httpError){
    return <section className={classes.mealError}>
      <p>Error loading meals</p>
    </section>
  }

    const mealList = meals.map(meal => 
    <MealItem 
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price}
    />
    )

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    )
}

export default AvailableMeals
