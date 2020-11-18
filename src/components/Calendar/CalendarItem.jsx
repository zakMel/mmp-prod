import React from 'react';
import { NavLink } from "react-router-dom";
import PieChart from "../PieChart"
import $ from 'jquery';

export default function CalendarItem (props) {

    return (
     

        <div className="dayContainer">

            <div className="calendarMealDay">{props.day}</div>

            <div className="mealItemContainer" id="Breakfast">
                <PieChart   
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
                to={typeof props.breakfast === "string" 
                ? {
                    pathname: "/mealViewer",
                    prevPath: props.prevPath,
                    passedProps: props.breakfast,
                }
                : "/calendar"
                }
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.breakfast === "Breakfast" ? "Breakfast" : props.breakfast.mealName}
                </NavLink>

                <button 
                className="dayClearButton"
                onClick={(e) => {
                    props.handleClearMeal(e)
                }}
                >
                Clear
                </button>
            
            </div>

            <div className="mealItemContainer" id="Lunch">

                <PieChart   
                    macros={ props.lunch.mealMacros }
                    height={50}
                    width={50}
                    layout={{
                        padding: {
                            bottom: 8,
                        }
                    }}
                />

                <NavLink 
                to={typeof props.lunch === "string" 
                ? {
                    pathname: "/mealViewer",
                    prevPath: props.prevPath,
                    passedProps: props.lunch,
                }
                : "/calendar"
                }
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.lunch === "Lunch" ? "Lunch" : props.lunch.mealName }
                    
                </NavLink>

                <button 
                    onClick={ (e) => props.handleClearMeal(e) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

            <div className="mealItemContainer" id="Dinner">

                <PieChart   
                    macros={props.dinner.mealMacros }
                    height={50}
                    width={50}
                    layout={{
                        padding: {
                            bottom: 8,
                        }
                    }}
                />

                <NavLink 
                to={typeof props.dinner === "string" 
                ? {
                    pathname: "/mealViewer",
                    prevPath: props.prevPath,
                    passedProps: props.dinner,
                }
                : "/calendar"
                }
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.dinner === "Dinner" ? "Dinner" : props.dinner.mealName }                 
                </NavLink>

                <button 
                onClick={ (e) => props.handleClearMeal(e) }
                className="dayClearButton"
                >
                Clear
                </button>
            
            </div>

        </div>

    )

}
