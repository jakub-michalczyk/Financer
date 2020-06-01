import React from 'react';
import close from './images/close.png';

class Edit extends React.Component {
  render() {
    if(this.props.on){
        return null;
    }

    return (
      <div className="editBox">
          <div className="close">
              <img onClick={this.props.closeBox} src={close} alt="Zamknij" />
          </div>
         <h2>Edycja</h2>
         <div className="editElement">Nazwa: <input type="text" data-name="name" onChange={this.props.update} value={this.props.edit.name}/></div>
         <div className="editElement">Opis: <textarea data-name="desc" onChange={this.props.update} value={this.props.edit.desc}></textarea></div>
         <div className="editElement">
             Kwota: <input type="number" data-name="amount" onChange={this.props.update} value={this.props.edit.amount}/> 
             <select value="PLN" data-name="currency" onChange={this.props.update}>
                <option>PLN</option>
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
             </select>
         </div>
         <div className="reverseBtn" onClick={this.props.save}>Zapisz zmiany</div>
      </div>
    );
  }
}

export default Edit;