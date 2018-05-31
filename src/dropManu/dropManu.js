import React, { Component } from 'react';
import './dropManu.css';


class DropManu extends Component{ 

    constructor(props){ 
        super(props)
       
        this.state = {isOpen: false,
                      items:  this.props.items}
    }

    toggleList = () => {
        var isOpen = this.state.isOpen ? false : true;
        this.setState({isOpen: isOpen});
    }

    findItemIndexById(id){

    var list = this.state.items;

    return list.map(function(item) {   
                    return item.id; 
                  }).indexOf(id);
    }

    handleChange = (event, item) => {

        let newArray = this.state.items;
        let index = this.findItemIndexById(item.id);
        newArray[index].isChecked = item.isChecked ? false : true;

        this.setState({items: newArray});
        this.props.onChange(item);
    }


    render() {

        var list = this.state.items;
        var title = this.props.title;
        var isOpen = this.state.isOpen;

        return(

            <div className = 'dropManu-mainWrapper' >
                <div className = 'dropManu-bodyWrapper' >
                    <div className = 'dropManu-title' > {title} </div>
                    <div className = 'dropManu-arrow' onClick = {this.toggleList} > v </div>
                </div>

                <div className = 'dropManu-list' style = {{display: isOpen ? 'flex' : 'none' }} >
                     {list.map((item) =>     
                        <div className = 'dropManu-option' key = {item.id} >
                            <div className = 'dropManu-label' > {item.label} </div>
                            <div> <input type = 'checkbox' checked = {item.isChecked} className = 'dropManu-checkbox' onChange = {(e) => this.handleChange(e, item)}  />  </div>
                        </div>
                     )}
                </div>

            </div> 
        )

    }

}

export default DropManu;