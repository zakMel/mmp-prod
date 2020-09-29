import React from 'react';
import { NavLink } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import "../style/calendar.css";

class Calendar extends React.Component {
    
    state = {
        
    
    }

    componentDidMount() {
        console.log(this.props.history)
    }

    loadFunc = () => {

    }

     

    render() {
        return (
            <React.Fragment>
        
                <div className="calendarContainer ">

                    <h2 className="weeks" > Calendar </h2>     
                    <div>date</div>
                    <div className="weekContainer">

                        <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadFunc}
                        hasMore={false}
                        // threshold={280}
                        // loader={<div className="loader" key={0}>Loading ...</div>}
                        // useWindow={true}
                        >
                            <div className="dayContainer">
                                <div>Monday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                onClick={(e)=>{this.props.updateCalendarElement(e)}}
                                className="mealItem text-center"

                                
                                >
                                    {this.props.week.monday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.monday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.monday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                            <div className="dayContainer">
                                <div>Tuesday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.tuesday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.tuesday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.tuesday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                            <div className="dayContainer">
                                <div>Wednesday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.wednesday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.wednesday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.wednesday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                            <div className="dayContainer">
                                <div>Thursday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.thursday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.thursday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.thursday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                            <div className="dayContainer">
                                <div>Friday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.friday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.friday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.friday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                            <div className="dayContainer">
                                <div>Saturday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.saturday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.saturday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.saturday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                            <div className="dayContainer">
                                <div>Sunday</div>
                                <div className="mealItemContainer">
                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.sunday.breakfast} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.sunday.lunch} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                                <div className="mealItemContainer" >

                                <NavLink 
                                to={{
                                    pathname: "/mealViewer",
                                    prevPath: this.props.history.location.pathname
                                }}
                                className="mealItem text-center"
                                
                                >
                                    {this.props.week.sunday.dinner} 
                                </NavLink>

                                <button 
                                    // type="submit" 
                                    // onClick={ (e) => props.handleDeleteFromDOM(e, props.macros) }
                                    className="dayDeleteButton btn btn-danger"
                                    >Delete
                                </button>
                                
                                </div>

                            </div>
                        </InfiniteScroll>

                    </div>
                </div>
        
            </React.Fragment>        
        )
    }

}

export default Calendar;