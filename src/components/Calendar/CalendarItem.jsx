
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
                    // pathname: typeof props.breakfast === "object" ? "/mealEditor" : "/mealViewer",
                    pathname: "/mealViewer",
                    prevPath: props.prevPath,
                    passedProps: props.breakfast,
                }
                : "/calendar"
                }
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.breakfast === "Breakfast" ? "Breakfast" : ( props.breakfast.mealName.length < 25 ? props.breakfast.mealName : `${props.breakfast.mealName.slice(0, 25)}...`)}
                </NavLink>

                <button 
                    onClick={ (e) => props.handleClearMeal(e) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

            <div className="mealItemContainer" id="Lunch">

                <PieChart   
                    macros={props.breakfast === "Lunch" ? null : props.lunch.mealMacros }
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
                    // pathname: typeof props.lunch === "object" ? "/mealEditor" : "/mealViewer",
                    pathname: "/mealViewer",
                    prevPath: props.prevPath,
                    passedProps: props.lunch,
                }
                : "/calendar"
                }
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.lunch === "Lunch" ? "Lunch" : ( props.lunch.mealName.length < 25 ? props.lunch.mealName : `${props.lunch.mealName.slice(0, 25)}...`)}
                    
                </NavLink>

                <button 
                    // type="submit" 
                    onClick={ (e) => props.handleClearMeal(e) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

            <div className="mealItemContainer" id="Dinner">

                <PieChart   
                    macros={props.dinner === "Lunch" ? null : props.dinner.mealMacros }
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
                    // pathname: typeof props.dinner === "object" ? "/mealEditor" : "/mealViewer",
                    pathname: "/mealViewer",
                    prevPath: props.prevPath,
                    passedProps: props.dinner,
                }
                : "/calendar"
                }
                onClick={(e)=>{props.updateDayMeal(props.day, $(e.target).html())}}
                className="mealItem text-center"                        
                >
                    {props.dinner === "Dinner" ? "Dinner" : ( props.dinner.mealName.length < 25 ? props.dinner.mealName : `${props.dinner.mealName.slice(0, 25)}...`)}                 
                </NavLink>

                <button 
                    // type="submit" 
                    onClick={ (e) => props.handleClearMeal(e) }
                    className="dayClearButton"
                    >Clear
                </button>
            
            </div>

        </div>

    )

}
