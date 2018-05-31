import React, { Component } from 'react';
import LocalStorage from '../services/localStorage';
import './home.css';

import Cubes from '../cubes/cubes.js';
import Editor from '../editor/editor.js';
import Bar from '../bar/bar.js';

class Home extends Component {
  
  constructor(props){
    super(props)

    this.localStorage = new LocalStorage();
 
    this.state = {originList: this.shuffle(this.getAnimalsData()),
                  animals: [],
                  editorIsShown: false}

    this.state.animals = this.state.originList;
    this.removedIds = [];
    
    this.filterBy = {};
    this.sortBy = {};
  }
  
  getAnimalsData(){
      let animals = this.localStorage.getFromLocalData('data');
    return animals;
  }

  shuffle(array) {
    
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
      while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  findItemIndexById(id){

    var list = this.state.animals;

    return list.map(function(item) {   
                    return item.id; 
                  }).indexOf(id);
  }

  sortArrayByKey(array, key, sortDirection, isNaN) {
    return array.sort(function(a, b) {
        var x = isNaN ? a[key].toUpperCase() : a[key]; var y = isNaN ? b[key].toUpperCase() : b[key];
        var action = sortDirection == 'Desc' ? ((x < y) ? -1 : ((x > y) ? 1 : 0)) : ((x > y) ? -1 : ((x < y) ? 1 : 0));
        return action;
    });
  }

  removeAnimal = (id) => {
    
    this.localStorage.removeItem(id);

    this.removedIds.push(id);
    let index = this.findItemIndexById(id);

    let newArray = this.state.animals;
    newArray.splice(index, 1);
  
    this.setState({animals: newArray});
  }
  
  addNewAnimal = (animal) => {
 
    this.localStorage.addItem(animal);

    let newArray = this.state.originList;
    newArray.unshift(animal);

    this.setState({animals: newArray,
                   originList: newArray});

    if(Object.keys(this.filterBy).length > 0) 
        this.filterList(this.filterBy);

    if(Object.keys(this.sortBy).length > 0) 
        this.sortList(this.sortBy);
  }

  openEditor = () => {
    this.setState({editorIsShown: true});
  }

  closeEditor = () => {
    this.setState({editorIsShown: false});
  }

  filterList = (filterBy) => {
  
    this.filterBy = filterBy;
    let filteredArray = this.state.originList;

    filteredArray = filteredArray.filter(item => {
        if(filterBy.filterInFamilys.includes(item.family)){
            return item;
        }
    });

    filteredArray = filterBy.vegitarianOnly ? filteredArray.filter(item => item.isVegitarian) : filteredArray;
    filteredArray = filteredArray.filter((item) => {return item.type.toUpperCase().includes(filterBy.freeText.toUpperCase())});
    filteredArray = filteredArray.filter(item => item.maxAge > filterBy.maxAge);
    filteredArray = filterBy.favoriteOnly ? filteredArray.filter(item => item.isFavorite) : filteredArray;

    this.setState({animals: filteredArray});
  }

  sortList = (sortBy) => {
    
    this.sortBy = sortBy;
    let sortedArray = this.state.originList;

    sortedArray = sortBy.abc ? this.sortArrayByKey(sortedArray, 'type', sortBy.sortDirection, true) : sortedArray;
    sortedArray = sortBy.maxAge ? this.sortArrayByKey(sortedArray, 'maxAge', sortBy.sortDirection, false) : sortedArray;
    sortedArray = sortBy.family ? this.sortArrayByKey(sortedArray, 'family', sortBy.sortDirection, true) : sortedArray;

    this.setState({animals: sortedArray});
  }

  reset = () => {
    this.filterBy = {};
    let newArray = this.state.originList;

    this.setState({animals: newArray,
                   originList: newArray});
  }

  toggleFavorite = (id) => {

      this.localStorage.toggleFavorite(id);

      var index = this.findItemIndexById(id);
      var newArray = this.state.animals;
      var value = newArray[index].isFavorite;

      newArray[index].isFavorite = !value ? true : false     
      this.setState({animals: newArray});

      if(Object.keys(this.filterBy).length > 0) 
         this.filterList(this.filterBy);
  }


  navigateTo = (referenceName) => {
    
      var reference = this.refs[referenceName];
      this.props.onNavigateTo(reference);
  }


  render() {

    var animals = this.state.animals.filter((item) => {
        if(!this.removedIds.includes(item.id)){
              return item;
        }
    });
   
    return (

          <div className = 'home-mainWrapper'>
 
              <Bar items = {animals} onModeChanged = {this.reset} 
                                     onFilterChanged = {this.filterList} 
                                     onSorterChanged = {this.sortList}  />

              <div className = 'home-bodyWrapper' >
                  {this.state.editorIsShown && <Editor onCloseEditor = {this.closeEditor} 
                                                       onCreateNewAnimal = {this.addNewAnimal} />}

                  <Cubes items = {animals} addCube = {true} onRemoveItem = {this.removeAnimal} 
                                                            onAddIteme = {this.openEditor}
                                                            onStarClicked = {this.toggleFavorite}  />
              </div>

              <div className = 'home-recycleBinIcon' onClick = {() => this.navigateTo('binReference')} > 
                  <a ref = 'binReference' href = '/recycleBin' >  </a> 
              </div>

          </div>

    );
  }
}

export default Home;
