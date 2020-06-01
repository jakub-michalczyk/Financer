import React from 'react';

class Balanse extends React.Component {
  determineMonth(){
      let monthsNames = ["styczniu", "lutym", "marcu", "kwietniu", "maju", "czerwcu", "lipcu", "sierpniu", "wrześniu", "październiku", "listopadzie", "grudniu"];

      return monthsNames[this.props.monthID]
  }

  render() {
    return (
      <div className="balanceBox">
          Twoje saldo w {this.determineMonth()} wynosi: <span className={this.props.val < 0 ? "debit" : "noDebit"}>{this.props.val} PLN</span>
      </div>
    );
  }
}

export default Balanse;