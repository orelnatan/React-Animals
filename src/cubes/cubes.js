import React, { Component } from 'react';
import './cubes.css';
import Cube from '../cube/cube.js'

class Cubes extends Component {
  
  constructor(props){
    super(props)

  }


  removeCube = (id) => {
    this.props.onRemoveItem(id);
  }

  addCube = () => {
    this.props.onAddIteme();
  }

  starClicked = (id) => {
      this.props.onStarClicked(id);
  }

  recycleItem = (id) => {
    this.props.onRecycleItem(id);
  }


  render() {

    var list = this.props.items;
    var addCube = this.props.addCube;

    return (
      <div className = 'cubes-mainWrapper'> 
        <div className = 'cubes-bodyWrapper' >
           {addCube && <div className = 'cubes-addCube' onClick = {this.addCube} > </div>}
              {list.map((item) =>     
                  <Cube key = {item.id.toString()}  item = {item}  onRemoveCube = {this.removeCube} onStarClicked = {this.starClicked} onRecycleItem = {this.recycleItem}  />
              )}
        </div>
      </div>
    );
  }
}

export default Cubes;
