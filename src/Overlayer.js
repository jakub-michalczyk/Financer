import React from 'react';

class Button extends React.Component {
  render() {
    if(this.props.boxStatus && this.props.settingsStatus && this.props.edit){
        return null;
    }

    return (
      <div className="overlayer"></div>
    );
  }
}

export default Button;