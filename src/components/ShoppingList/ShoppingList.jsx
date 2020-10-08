import React, { useState, useEffect } from 'react';
import Item from './item';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import InfiniteScroll from 'react-infinite-scroller';
import "../../style/shoppingList.css";

export default function ShoppingList (props) {

    let [list, updateList] = useState([])
    // let [renderedList, setList] = useState([])

    useEffect(() => {

        renderDOM()

    }, [props.week]);

    let getAllIngredients = (week) => {
    let ingredients = [];
    
    for (let i = 0; i < week.length; i++){
            let currentDay = week[i];
            
            for (let meal in currentDay){
                let currentMeal = currentDay[meal];
                if(typeof currentMeal === 'object'){
                    for(let u = 0; u < currentMeal.savedIngredients.length; u++){
                        // console.log(currentMeal.savedIngredients[u].ingre.description)
                        ingredients.push(currentMeal.savedIngredients[u].ingre.description)

                    }                    
                }
            }
    }  
        
    ingredients.sort();
    // console.log(ingredients);
    // updateList(ingredients)
    return ingredients;
    }

    let renderShoppingList = (ingre) => {
        return (
            <Item
                desc={ingre}
            />
        )
    }

    let renderDOM = async () => {
        let list = await getAllIngredients(props.week)
        let mappedList = list.map(ingre => renderShoppingList(ingre))
        updateList(mappedList)
    }

    let loadFunc = () => {

    }

    return (
        <React.Fragment>

            <div className="shoppingListContainer">
                <h2 className="title_SL" >shoppingList</h2>  
                <DateRangePicker 
                    calendarIcon={null}
                    clearIcon={null}
                    className="dateRanger_SL"
                    onChange={props.setWeekDateRange}
                    value={props.weekDateDB.length > 0 ? props.weekDateRange : null}
                />  
                <div id="section-to-print" className="listContainer_SL">
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadFunc}
                        hasMore={false}
                        >
                        {list}
                    </InfiniteScroll>
                </div>

                <button 
                    className="printButton"
                    onClick={()=> { window.print() }}
                    >
                    Print
                </button>

            </div>
        </React.Fragment>

    )

};