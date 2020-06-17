import React from 'react';
import calculate from './images/calculate.png';
import category from './images/category.png';
import add from './images/add.png';
import close from './images/close.png';

class Settings extends React.Component {
  render() {
    if(this.props.settingsStatus){
        return null;
    }

    return (
      <div className="settingsBox">
        <div className="close"><img onClick={this.props.changeStatus} src={close} alt="Zamknij"/></div>
        <h2>Ustawienia</h2>
        <h3>Dodaj nową kategorię przychodu lub wydatku</h3>
        <div className="addNewElement">
            <div className="leftSide">
                <div className="imgBox">
                    <img src={add} alt="Dodaj"/>
                    <span>Dodaj nowy </span>
                </div>
                <div className="imgBox">
                    <img src={category} alt="Kategoria"/>
                    <span>Nazwa kategorii</span>
                </div>
            </div>
            <div className="rightSide">
                <div className="formElementBox">
                    <select onChange={this.props.chooseFncForm}>
                        <option value="0">Przychód</option>
                        <option value="1">Wydatek</option>
                    </select>
                </div>
                <div className="formElementBox">
                    <input placeholder="Nazwa nowej kategorii" type="text" data-name="name" onChange={this.props.newCategory}/>
                </div>
            </div>
        </div>
        <div className="reverseBtn" onClick={this.props.save}>Zapisz</div>
      </div>
    );
  }
}

export default Settings;