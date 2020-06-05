import React from 'react';
import CalendarElement from './CalendarElement';

class Calendar extends React.Component {
  renderCalendarContent(){
      if(!this.props.on){
        return
      }

      let monthsNames = ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"];
      let calendarElements = [];

      for(let i = 1; i < 13; i++){
        calendarElements.push(<CalendarElement change={this.props.changeMonth} key={i} curMonth={this.props.month} id={i} name={monthsNames[i - 1]}/>)
      }

       return <div>
         <h3>financer.io</h3>
         <ul>
             {calendarElements}
         </ul>
       </div>
  }

  render() {
    return (
      <div className={`calendarBox ${!this.props.on ? "calendarOff" : "calendarOn"}`}>
         {this.renderCalendarContent()}
      </div>
    );
  }
}

export default Calendar;