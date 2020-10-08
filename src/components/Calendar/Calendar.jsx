import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CalendarItem from './CalendarItem';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import "../../style/calendar.css";

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

    renderDays = (item) => {
        return (
            <CalendarItem 
                meal={item}
                day={item.day}
                breakfast={item.Breakfast}
                lunch={item.Lunch}
                dinner={item.Dinner}
                updateDayMeal={this.props.updateDayMeal}
                prevPath={this.props.history.location.pathname}
            />
        )

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
                        onChange={this.props.setWeekDateRange}
                        value={this.props.weekDateRange}
                    />

                    <button 
                    className="calendarSaveButton"
                    onClick={()=> { this.props.saveWeekToDB() }}
                    >
                    Save Week
                    </button>

                    <div className="weekContainer">

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
                </div>
        
            </React.Fragment>        
        )
    }

}

export default Calendar;