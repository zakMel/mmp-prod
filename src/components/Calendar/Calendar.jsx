import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CalendarItem from './CalendarItem';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import $ from "jquery"
import "../../style/calendar.css";
let key = 10000000;

class Calendar extends React.Component {
    
    state = {
        mappedWeek: [],
    }

    componentDidMount() {
        this.renderDOM()
    }

    loadFunc = () => {

    }
    
    renderDOM = () => {
        let mapped = this.props.week.map(item => this.renderDays(item));

        this.setState(() => {

            return {
                mappedWeek: mapped
            }

        })

    }

    componentDidUpdate(prevProps) {
        if(this.props.week !== prevProps.week){
            this.renderDOM()
        }
    }

    newKey = () => {
        key++
    }

    renderDays = (item) => {
        this.newKey()

        return (
            <CalendarItem 
                key={key}
                meal={item}
                day={item.day}
                breakfast={item.Breakfast}
                lunch={item.Lunch}
                dinner={item.Dinner}
                updateDayMeal={this.props.updateDayMeal}
                prevPath={this.props.history.location.pathname}
                handleClearMeal={this.handleClearMeal}
            />
        )

    }

    handleClearMeal = (e) => {
        let container = e.target.parentElement;
        let meal = $(container).attr("id")
        let parent = $(container).parent().children();
        let weekDay = $(parent).filter(".calendarMealDay").text()

        let newWeek = []
        for ( let u = 0; u < this.props.week.length;  u++ ) {
            let arr = this.props.week;
            let item = arr[u]; 
            if(item.day === weekDay){
                item[meal] = meal
            }
            newWeek.push(item);
        }
       
        this.props.updateCalendarWeek(newWeek)

    }

    render() {
        return (
            <React.Fragment>
        
                
                <div className="calendarContainer ">

                    <h2 className="weeks" > Calendar </h2>  
        
                    <DateRangePicker 
                        calendarIcon={null}
                        clearIcon={null}
                        className="dateRanger"
                        calendarClassName="dateRangeCal"
                        onChange={this.props.setWeekDateRange}
                        value={this.props.weekDateDB.length > 0 ? this.props.weekDateRange : null}
                    />

                    <button 
                    className="calendarSaveButton"
                    onClick={()=> { 
                        if(this.props.weekDateDB.length > 0){
                            this.props.handleSaving();
                            this.props.saveWeekToDB();
                        }
                    }}
                    >
                    {!this.props.loading ? "Save Week" : "Saving ..."}
                    </button>

                    {this.props.weekDateDB.length > 0 
                    ?
                    <div 
                    className="weekContainer"
                    >
                        <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadFunc}
                        hasMore={false}
                        // threshold={280}
                        // loader={<div className="loader" key={0}>Loading ...</div>}
                        // useWindow={true}
                        >

                        {this.state.mappedWeek}

                        </InfiniteScroll>

                    </div>
                    : ""
                    }
                  
                    
                                        
                </div>
        
            </React.Fragment>        
        )
    }

}

export default Calendar;