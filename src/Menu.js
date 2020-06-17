import React from 'react';
import "./App.css";
import expen from "./images/expenses.png";
import calendar from "./images/calendar.png";
import income from "./images/income.png";
import settings from "./images/settings.png";

class Menu extends React.Component {
  constructor(){
    super();
    this.state = {
      
    }
  }

  render() {
    return (
      <nav className="menu">
      <ul>
        <li>financer.io</li>
        <li>
          <div className={this.props.hideTable.income ? "choosedOption" : null} onClick={() => this.props.hide("income")}>
            <img src={expen} alt="Wydatki"/> <span>Wydatki</span>  
          </div>
          <div className={this.props.hideTable.expenses ? "choosedOption" : null} onClick={() => this.props.hide("expenses")}>
            <img src={income} alt="Przychody"/> <span>Przychody</span>
          </div> 
          <div onClick={this.props.calendarSwitch} className={this.props.calendarStatus ? "choosedOption" : null}>
            <img src={calendar} alt="Kalendarz"/> <span>Kalendarz</span>
          </div>
          <div onClick={this.props.settingsStatus}>
            <img src={settings} alt="Ustawienia"/> <span>Ustawienia</span>
          </div> 
        </li>
      </ul>
    </nav>
    );
  }
}

export default Menu;