import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import CalendarItem from './CalendarItem';
import "../../style/calendar.css";

class Calendar extends React.Component {
    
    state = {
        mappedWeek: []
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

    renderDays = (item) => {
        return (
            <CalendarItem 
                meal={item}
                day={item.day}
                breakfast={item.Breakfast}
                lunch={item.Lunch}
                dinner={item.Dinner}
                setCalendarDate={this.props.updateCalendarDate}
                prevPath={this.props.history.location.pathname}
            />
        )

    }

    render() {
        return (
            <React.Fragment>
        
                <div className="calendarContainer ">

                    <h2 className="weeks" > Calendar </h2>     
                    <div>{this.props.date}</div>
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