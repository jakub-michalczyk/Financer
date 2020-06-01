import React from 'react';
import close from './images/close.png';
import edit from './images/edit.png';

class FinanceBox extends React.Component {
  constructor(){
    super();
    this.renderFinances = this.renderFinances.bind(this);
  }

  checkFinancesLength(fin){
    let check = true;

    fin.forEach( fnc => {
        if(fnc.month === this.props.month){
          check = false;
        }
    });

    return check
  }

  renderFinances(finances, name){
    if(this.checkFinancesLength(finances)){
    return  <td>Na chwile obecną nie masz żadnych {name}</td>
    }
    else{
      let elements = [];
     
      for (let i = 0; i < finances.length; i++) {
        if (finances[i].month === this.props.month) {
          elements.push(
            <td key={i}>
              <div className="dataWrap">
                <div className="categoryImage"><img alt="Ikona kategorii" src={this.getCategoryImage(finances[i])} /></div>
                <div className="financeData"><span>Nazwa:</span> {finances[i].name}</div><div className="financeData"><span>Kwota:</span> {finances[i].amount} {finances[i].currency}</div>
                <div className="financeMenu" data-id={finances[i].id}><img onClick={this.props.remove} src={close} alt="Zamknij" /><img onClick={this.props.editFin} src={edit} alt="Edytuj" /></div>
              </div>
              <div className="descWrap"><span>Opis:</span>{finances[i].desc}</div>
            </td>
          );
        }
      }

      return elements
    }
  }

  getCategoryImage(cat){
    for(let i = 0; i < this.props.fncCategories.length; i++){
      for(let j = 0; j < this.props.fncCategories[i].length; j++){
          if(this.props.fncCategories[i][j].name === cat.category){
            return require(`${this.props.fncCategories[i][j].icon}`)
          }
      }
    }
  }

  renderTableContent(finance, text, title, needHide, tableID){
    let tableHeader = null;
    let tableBody = null;

    if(!needHide){
      tableHeader = <thead>
      <tr>
        <th>{title}</th>
      </tr>
    </thead>;

    tableBody =
    <tbody>
      <tr>
        {this.renderFinances(finance, text)}
      </tr>
    </tbody>;
    }

    return (
      <table className={needHide ? "hide" : null} id={tableID}>
          {tableHeader}
          {tableBody}
      </table>
    );
  }

  render() {
    return (
      <div className="financeBox">
        {this.renderTableContent(this.props.income, "przychodów", "Przychody", this.props.hideTable.income, "income")}
        {this.renderTableContent(this.props.expens, "wydatków", "Wydatki", this.props.hideTable.expenses, "expenses")}
    </div>
    );
  }
}

export default FinanceBox;