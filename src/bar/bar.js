import React, { Component } from 'react';
import logo from '../assets/logo.svg';
import './bar.css';

import UiSwitch from '../uiSwitch/uiSwitch.js';
import Filter from '../filter/filter.js';
import Sorter from '../sorter/sorter.js';
 
class Bar extends Component{ 

  constructor(props){ 
    super(props)

    this.state = {mode: 'filter', }

  }


  switchMode = (mode) => {
      this.setState({mode: mode});
      this.props.onModeChanged();
  }

  filterChanged = (filters) => {
      this.props.onFilterChanged(filters);
  }

  sorterChanged = (sorters) => {
      this.props.onSorterChanged(sorters);
  }

  
  render() {
  
      var list = this.props.items;
      var mode = this.state.mode; 

      return(
        
        <div className = 'bar-mainWrapper' >
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title"> Welcome to React </h1>
            </header>

            {mode == 'filter' && <div className = 'bar-bodyWrapper' >
                <Filter items = {list} onFilterChanged = {this.filterChanged}  />
            </div>}

            {mode == 'sort' && <div className = 'bar-bodyWrapper' >
                <Sorter onSorterChanged = {this.sorterChanged}   />
            </div>}
    
            <div className = 'bar-switchPanel' >
                <div className = 'bar-state' > Filtering </div>
                 <UiSwitch onModeChanged = {this.switchMode} states = {{left: 'filter', right: 'sort'}} />
                <div className = 'bar-state' > Sorting </div>
            </div>
        </div>
      );
  }
}

export default Bar;


