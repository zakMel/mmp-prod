import React, { useState, useEffect } from 'react';
import Item from './item';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import InfiniteScroll from 'react-infinite-scroller';
import "../../style/shoppingList.css";
let key = 10000000;

export default function ShoppingList (props) {

    let [list, updateList] = useState([])

    useEffect(() => {
        (async ()=>{
            let list = await getAllIngredients(props.week)
            let mappedList = list.map(ingre => renderShoppingList(ingre))
            updateList(mappedList)

        })()

    }, [props.week]);

    let getAllIngredients = (week) => {
        let ingredients = {}; 
        
        for (let i = 0; i < week.length; i++){
                let currentDay = week[i];
                
                for (let meal in currentDay){
                    let currentMeal = currentDay[meal];
                    if(typeof currentMeal === 'object'){
                        for(let u = 0; u < currentMeal.savedIngredients.length; u++){
                            if(Object.keys(ingredients).includes(currentMeal.savedIngredients[u].ingre.description)) {
                                ingredients[currentMeal.savedIngredients[u].ingre.description]++

                            }else {

                                ingredients[currentMeal.savedIngredients[u].ingre.description] = 1 
                            }
    
                        }                    
                    }
                }
        }  
    let arr = Object.entries(ingredients)    
    arr.sort(); 
    return arr;
    }

    let newKey = () => {
        key++
    }

    let renderShoppingList = (ingre) => {
        newKey()

        return (
            <Item
                key={key}
                desc={ingre}
            />
        )
    }

    let loadFunc = () => {

    }

    return (
        <React.Fragment>

            <div className="shoppingListContainer">
                <h2 className="title_SL" >Shopping List</h2>  
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