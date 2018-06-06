import React, { Component } from 'react';
import LocalStorage from '../services/localStorage';
import './recycleBin.css';

import Cubes from '../cubes/cubes.js';
 
class RecycleBin extends Component{ 

    constructor(props){ 
        super(props)
   
        this.state = {items: LocalStorage.getFromLocalData('trash'), };
    }

    findItemIndexById(id){

        var list = this.state.items;

        return list.map(function(item) {   
                        return item.id; 
                    }).indexOf(id);
    }

    removeItem = (id, shrede) => {
        
        shrede ? LocalStorage.shredItemForEver(id) : null;        

        var newArray = this.state.items;
        var index = this.findItemIndexById(id);

        newArray.splice(index, 1);
        this.setState({items: newArray});
    }
  
    recycleItem = (id) => {
        
        LocalStorage.recycleItem(id);

        this.removeItem(id, false);
    }
   
    render() {

        let list = this.state.items;

        return(
            <div className = 'recycleBin-mainWrapper' >

               <div className = 'recycleBin-bodyWrapper' > 
                    <Cubes items = {list} onRemoveItem = {(id) => this.removeItem(id, true)} onRecycleItem = {this.recycleItem}  />
               </div>

               <div className = 'recycleBin-returnIcon' > </div>

            </div>
        )

    }

}

export default RecycleBin;