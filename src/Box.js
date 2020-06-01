import React from 'react';
import close from './images/close.png';
import info from './images/info.png';

class Button extends React.Component {
  renderCategories(){
    let searchedCategory = this.props.possibleCategories.filter(category => category[0] === this.props.whatToAdd);
    let renderedNodes = [];
   
    for(let i = 1; i < searchedCategory[0].length; i++){
        renderedNodes.push(<option key={i}>{searchedCategory[0][i].name}</option>)
    }

    return renderedNodes;
  }

  render() {
    if(this.props.boxStatus){
        return null;
    }

    return (
      <div className="box">
          <div className="close"><img onClick={() => this.props.hide(false)} src={close} alt="Zamknij" /></div>
          <h2>Dodaj {this.props.whatToAdd}</h2>
          <div className="dataWrapper">
            <div className="data">
                <div className="dataTitle">Kategoria:</div>
                <div className="formElemBox">
                    <select data-name="category" onChange={this.props.addData}>
                        {this.renderCategories()}
                    </select>
                </div>
            </div>
            <div className="data">
                <div className="dataTitle">Nazwa:</div>
                <div className="formElemBox">
                    <input data-name="name" onChange={this.props.addData} placeholder="Nazwa" type="text" />
                </div>
            </div>
            <div className="data">
                <div className="dataTitle">Opis:</div>
                <div className="formElemBox">
                    <textarea data-name="desc" onChange={this.props.addData} maxLength="80" placeholder="Opis"></textarea>
                </div>
            </div>
            <div className="data">
                <div className="dataTitle">Kwota:</div>
                <div className="formElemBox">
                    <input data-name="amount" onChange={this.props.addData} type="number" />
                    <select data-name="currency" onChange={this.props.addData}>
                        <option>Waluta</option>
                        <option>PLN</option>
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                </div>
            </div>
          </div>
          {this.props.info ? <div className="info"><img src={info} alt="Informacja"/>Powinieneś uzupełnić wszystkie pola</div> : null}
          <div className="reverseBtn" onClick={() => this.props.addFinanceAct(this.props.whatToAdd)}>Dodaj</div>
      </div>
    );
  }
}

export default Button;