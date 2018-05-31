import React, { Component } from 'react';
import './filter.css';

import DropManu from '../dropManu/dropManu.js';

class Filter extends Component{ 

    constructor(props){ 
        super(props)
       
       this.familys = this.createFamilysList(this.props.items);
       this.filterBy = { filterInFamilys: this.familys.map(item => item.label),
                         vegitarianOnly: false,
                         favoriteOnly: false,
                         maxAge: 0,
                         freeText: '' };
    }

    createFamilysList(items){
      
      var familys = [];

      for(let i in items){
          if(!familys.map(item => item.label).includes(items[i].family)){
              var item = {
                  label: items[i].family,
                  id: i,
                  isChecked: true 
              }
              familys.push(item);
          }
      }
      return familys;
    }

    familyChanged = (item) => {
      
        if(item.isChecked){
            this.filterBy.filterInFamilys.push(item.label);
        } else {
            var index = this.filterBy.filterInFamilys.indexOf(item.label);
            if(index != -1){
                this.filterBy.filterInFamilys.splice(index, 1);
            }
        }
        this.filterChanged(this.filterBy);
    }

    vigiToggeld = () => {
        var value = this.refs.vigiToggle.checked;
        this.filterBy.vegitarianOnly = value;

        this.filterChanged(this.filterBy);
    }

    favoriteToggeld = () => {
        var value = this.refs.favoriteToggle.checked;
        this.filterBy.favoriteOnly = value;

        this.filterChanged(this.filterBy);
    }

    ageChanged = () => {
        var value = this.refs.age.value;
        this.filterBy.maxAge = value;

        this.filterChanged(this.filterBy);
    }

    textChanged = () => {
        var value = this.refs.freeText.value;
        this.filterBy.freeText = value;

        this.filterChanged(this.filterBy);
    }

    filterChanged(filters){
        this.props.onFilterChanged(filters);
    }


    render() {

        var familys = this.familys;

        return(

            <div className = 'filter-mainWrapper' >
                <div className = 'filter-bodyWrapper' >

                    <div className = 'filter-filter' >
                        <DropManu items = {familys} title = 'Select familys' onChange = {this.familyChanged} />
                    </div>

                    <div className = 'filter-filter' >
                        <div className = 'filter-icon filter-vegitarian' > </div>
                        <div> <input type = 'checkbox' className = 'filter-vigiToggle' ref = 'vigiToggle' onChange = {this.vigiToggeld}  />  </div>
                    </div>

                    <div className = 'filter-filter' >
                        <div className = 'filter-icon filter-favorite' > </div>
                        <div> <input type = 'checkbox' className = 'filter-favoriteToggle' ref = 'favoriteToggle' onChange = {this.favoriteToggeld}  />  </div>
                    </div>

                    <div className = 'filter-filter' >
                        <div> <input type = 'number' className = 'filter-age' ref = 'age' placeholder = '0' onChange = {this.ageChanged}  />  </div>
                    </div>

                    <div className = 'filter-filter' >
                        <div> <input className = 'filter-freeText' ref = 'freeText' placeholder = 'Free text' onChange = {this.textChanged}  />  </div>
                    </div>

                </div>
            </div>
        )
    }

}

export default Filter;

// <select className = 'filter-familysList' onChange = {(e) => this.familyChanged(e)}  >
//                             <option value = '-1' > filter by family </option>
//                             {familys.map((item) =>     
//                                 <option key = {item.id} value = {item.id} > {item.label} </option>
//                             )}
//                         </select>