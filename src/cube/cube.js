import React, { Component } from 'react';
import './cube.css';

var goldStar = require('../assets/favorite.png');
var blackStar = require('../assets/unFavorite.png');

class Cube extends Component {
  
  // constructor(props){
  //   super(props)

  // }
  

  mouseIn(event, id){
    this.refs.glass.classList.add('cube-glassHovered');
    this.refs.details.style.opacity = '1';
  }


  mouseOut(event, id){
    this.refs.glass.classList.remove('cube-glassHovered');
    this.refs.details.style.opacity = '0';
  }


  openUrl(event, url){
    window.open(url);
  }


  removeItem(event, id){
    event.stopPropagation();
    this.props.onRemoveCube(id);
  }


  starClicked(event, id){
     event.stopPropagation();
     this.props.onStarClicked(id);
  }


  getStar(isFavorite){
      return isFavorite ? blackStar : goldStar;
  }



  render() {

    let item = this.props.item;
    //https://icons8.com/icon/new-icons/all

    return (
      <div className = 'cube-mainWrapper' >
        <div className = 'cube-bodyWrapper' onClick = {(e) => this.openUrl(e, item.url)} style = {{borderColor: item.color}} >
            <div className = 'cube-image' style = {{backgroundImage: 'url(' + item.image + ')'}} > </div>
            <div className = 'cube-glass' ref = 'glass' > </div>
            <div className = 'cube-content' onMouseEnter = {(e) => this.mouseIn(e, item.id)} 
                                            onMouseLeave = {(e) => this.mouseOut(e, item.id)} > 

                {!item.isTrash && <div className = 'cube-icons' >                
                    <div className = 'cube-icon cube-trash'  onClick = {(e) => this.removeItem(e, item.id)}  >  </div>
                    <div className = 'cube-icon cube-star' onClick = {(e) => this.starClicked(e, item.id)} style = {{backgroundImage: 'url(' + this.getStar(item.isFavorite) + ')'}} >  </div>
                    {item.isVegitarian && <div className = 'cube-icon cube-vegitarian' > </div> }
                </div>}

                {item.isTrash && <div className = 'cube-icons' >
                    <div className = 'cube-icon cube-shrede' >  </div>
                    <div className = 'cube-icon cube-recycle' >  </div>
                    {item.isVegitarian && <div className = 'cube-icon cube-vegitarian' > </div> }
                </div>}

                <div className = 'cube-header' > {item.type} </div>
                
                <div className = 'cube-details' ref = 'details' >
                    <div className = 'cube-detail' > Family: {item.family} </div>
                    <div className = 'cube-detail' > Max age: {item.maxAge} </div>
                </div>

            </div>
        </div>
      </div>
    );
  }
}

export default Cube;
