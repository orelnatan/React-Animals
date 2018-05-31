import React, { Component } from 'react';
import './uiSwitch.css';


class UiSwitch extends Component{ 

  constructor(props){ 
    super(props)
   
  }


  toggleSwich = (event) => {

    let value = this.refs.toggleBox.checked;
    let mode = !value ? this.props.states.left : this.props.states.right;
    this.props.onModeChanged(mode);
  }


  render() {

      return (
        <label className="switch">
            <input type="checkbox" ref = 'toggleBox' onClick = {(e) => this.toggleSwich(e)} />
            <span className="slider round"></span>
        </label>
      );
  }
}

export default UiSwitch;