import React, { Component } from 'react';
import LocalStorage from '../services/localStorage';
import './recycleBin.css';

import Cubes from '../cubes/cubes.js';
 
class RecycleBin extends Component{ 

    constructor(props){ 
        super(props)
   
        this.state = {items: LocalStorage.getFromLocalData('trash'), };
    }

  

    render() {

        let list = this.state.items;

        return(
            <div className = 'recycleBin-mainWrapper' >

               <div className = 'recycleBin-bodyWrapper' > 
                    <Cubes items = {list}  />
               </div>

            </div>
        )

    }

}

export default RecycleBin;