import React from 'react';
import { NavLink } from "react-router-dom";
import $ from 'jquery';

export default function CalendarItem (props) {

    return (
     

        <div className="dayContainer">

    <div>{props.day}</div>

            <div className="mealItemContainer">

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
                    className="dayDeleteButton btn btn-danger"
                    >Delete
                </button>
            
            </div>

            <div className="mealItemContainer">

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
                    className="dayDeleteButton btn btn-danger"
                    >Delete
                </button>
            
            </div>

            <div className="mealItemContainer">

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
                    className="dayDeleteButton btn btn-danger"
                    >Delete
                </button>
            
            </div>

        </div>

    )

}
