import React from 'react';
import Button from './Button.js';

class ButtonBox extends React.Component {
  constructor(){
    super();
    this.state = {
      btns: [
        {
          id: 0,
          text: " przychód",
          img: "./images/add.png"
        },
        {
          id: 1,
          text: " wydatek",
          img: "./images/subtract.png"
        }
      ]
    }
  }

  render() {
    return (
      <div className="buttonsBox">
        <Button box={this.props.boxStatus} btns={this.state.btns} id={0}/>
        <Button box={this.props.boxStatus} btns={this.state.btns} id={1}/>
      </div>
    );
  }
}

export default ButtonBox;