import React from 'react';
import { NavLink } from "react-router-dom";
import PieChart from "../PieChart"
import $ from 'jquery';

export default function CalendarItem (props) {

    return (
     

        <div className="dayContainer">

            <div>{props.day}</div>

            <div className="mealItemContainer">
                <PieChart   
                    // macros={props.breakfast === "Breakfast" ? {protein: 0, fat: 0, carbs: 0} : props.breakfast.mealMacros }
                    macros={props.breakfast.mealMacros}
                    height={50}
                    width={50}
                    layout={{
                        padding: {
                            bottom: 8,
                        }
                    }}
                />

                <NavLink 
                to={{
                    pathname: "/mealViewer",
                    prevPath: props.prevPath
                }}
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.breakfast === "Breakfast" ? "Breakfast" : props.breakfast.mealName} 
                </NavLink>

                <button 
                    // type="submit" 
                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

            <div className="mealItemContainer">

                <PieChart   
                    macros={props.breakfast === "Lunch" ? null : props.lunch.mealMacros }
                    // macros={null}
                    height={50}
                    width={50}
                    layout={{
                        padding: {
                            bottom: 8,
                        }
                    }}
                />

                <NavLink 
                to={{
                    pathname: "/mealViewer",
                    prevPath: props.prevPath
                }}
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.lunch === "Lunch" ? "Lunch" : props.lunch.mealName} 
                </NavLink>

                <button 
                    // type="submit" 
                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

            <div className="mealItemContainer">

                <PieChart   
                    macros={props.dinner === "Lunch" ? null : props.dinner.mealMacros }
                    // macros={{protein: 0, fat: 0, carbs: 0}}
                    height={50}
                    width={50}
                    layout={{
                        padding: {
                            bottom: 8,
                        }
                    }}
                />

                <NavLink 
                to={{
                    pathname: "/mealViewer",
                    prevPath: props.prevPath
                }}
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.dinner === "Dinner" ? "Dinner" : props.dinner.mealName} 
                </NavLink>

                <button 
                    // type="submit" 
                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

        </div>

    )

}
