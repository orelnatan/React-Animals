import React, { Component } from 'react';
import './sorter.css';

import UiSwitch from '../uiSwitch/uiSwitch.js';

class Sorter extends Component{ 

    constructor(props){ 
        super(props)
       
       this.state = { sorters: [{label: 'Abc', id: 638, field: 'abc', isChecked: false},
                                {label: 'Max age', id: 987, field: 'maxAge', isChecked: false},
                                {label: 'Family', id: 126, field: 'family', isChecked: false}, ], 
                    }

       this.sortBy = { abc: false,
                       maxAge: false,
                       family: false,
                       sortDirection: 'Desc', }
    }


    switchMode = (mode) => {
        this.sortBy.sortDirection = mode;
        this.sorterChanged(this.sortBy);
    }

    findItemIndexById(id){

        var list = this.state.sorters;

        return list.map(function(item) {   
                           return item.id; 
                        }).indexOf(id);
    }

    toggleChanged = (event, id, field) => {
        
        let refId = 'toggle' + id;
        let value = this.refs[refId].checked;
        let index = this.findItemIndexById(id);
        let sorters = this.state.sorters;
       
        sorters.map(item => {
            item.isChecked = false;
            this.sortBy[item.field] = false;
        });

        sorters[index].isChecked = value;
        this.setState({sorters: sorters});
        
        this.sortBy[field] = value;
        this.sorterChanged(this.sortBy);
    }

    sorterChanged(sorters){
        this.props.onSorterChanged(sorters);
    }

    render() {

        var sorters = this.state.sorters;

        return(
            <div className = 'sorter-mainWrapper' >
                <div className = 'sorter-bodyWrapper' >
                    
                    <div className = 'sorter-sorters' >
                        {sorters.map((item) =>     
                            <div className = 'sorter-sorter' key = {item.id} >
                                <div className = 'sorter-label' > {item.label} </div>
                                <div className = 'sorter-checkbox' > 
                                    <input type = 'checkbox' ref = {'toggle' + item.id}
                                                             checked = {item.isChecked} 
                                                             onChange = {(e) => this.toggleChanged(e, item.id, item.field)} />  
                                </div>
                            </div>
                        )}
                    </div>

                    <div className = 'sorter-sortDirection' >
                        <div className = 'bar-state' > Desc </div>
                            <UiSwitch onModeChanged = {this.switchMode} states = {{left: 'Desc', right: 'Asc'}} />
                        <div className = 'bar-state' > Asc </div>
                    </div>

                </div>
            </div>   
        )

    }

}

export default Sorter;