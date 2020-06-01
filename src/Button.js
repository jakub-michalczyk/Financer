import React from 'react';

class Button extends React.Component {
  constructor(){
    super();
    this.state = {
      text: "",
      img: ""
    }
  }

  componentDidMount(){
    this.determineBtn();
  }


  determineBtn(){
    this.props.btns.forEach(btn => {
      if(btn.id === this.props.id){
        this.setState({
          text: btn.text,
          img: btn.img
        })
      }
    });
  }

  render() {
    return (
      <div className="btn" onClick={() => this.props.box(this)}>
        <img src={this.state.img !== "" ? require(`${this.state.img}`) : null} alt="Ikona przycisku"/>
        Dodaj {this.state.text}
     </div>
    );
  }
}

export default Button;