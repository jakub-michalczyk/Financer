import React from 'react';

class Calendar extends React.Component {
  render() {
    return <li className={this.props.id === this.props.curMonth ? "currentMonth" : null} onClick={this.props.change} data-id={this.props.id}>{this.props.name}</li>;
  }
}

export default Calendar;