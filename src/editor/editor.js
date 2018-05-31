import React, { Component } from 'react';
import './editor.css';

var classNames = require('classnames');

class Editor extends Component {

    constructor(props){
        super(props)

        this.state = {closeEditor: false,}
        
        this.inputs = [{label: 'family', id: 123, value: 'fish'},
                       {label: 'color', id: 654, value: 'blue'},
                       {label: 'type', id: 879, value: 'dolphin'},
                       {label: 'url', id: 900, value: 'https://en.wikipedia.org/wiki/Dolphin'},
                       {label: 'image', id: 145, value: 'https://www.dolphindiscovery.com/imagesNuevo/imgsLocs/anguilla/anguilla-9.jpg?v=7.8.8'},
                       {label: 'maxAge', id: 993, value: 9}
                     ];

        
    }

 
    closeEditor = (event) => {
        
        this.setState({closeEditor: true});

        setTimeout(() => {
            this.props.onCloseEditor();
        }, 1000)
    }


    saveValue = (event, index) => {
        var value = event.target.value;
        this.inputs[index].value = value;
    }


    createNewItem = () => {

        let fields = this.inputs.map(item => item.label);
        let item = {};

        for(var i in fields){
            item[fields[i]] = this.inputs[i].value;
        }
        item['isVegitarian'] = this.refs.vigiToggle.checked;
        item['id'] = Math.floor((Math.random() * 800) + 100);
        item['isFavorite'] = false;

        this.closeEditor();
        this.props.onCreateNewAnimal(item);
    }


    stopMouseEvent(event){
        event.stopPropagation();
    }

    render() {

        var inputs = this.inputs;

        //https://github.com/JedWatson/classnames
        //npm install classnames --save
        var mainWrapperClasses = classNames({
            'editor-mainWrapper': true,
            'editorMainWrapperFadeOut': this.state.closeEditor
        });
  
        return (
            <div className = {mainWrapperClasses} onClick = {this.closeEditor} >
                <div className = 'editor-bodyWrapper' onClick = {(e) => this.stopMouseEvent(e)}  >
                    <div className = 'editor-icon editor-closeEditor' onClick = {(e) => this.closeEditor(e)} > </div>
                    {/*<div className = 'editor-prevView' >
                        <div className = 'editor-image' style = {{backgroundImage: 'url(' + inputs[4].value + ')'}} > </div>
                    </div>*/}
                    <div className = 'editor-inputs' >
                       {inputs.map((item, index) => 
                            <div className = 'editor-input' key = {item.id}>
                                <input className = 'editor-inputBox' onChange = {(e) => this.saveValue(e, index)}   
                                                                     placeholder = {item.label} />
                            </div>
                       )}         
                    </div>
                    <div className = 'editor-toggles' >   
                        <div className = 'editor-toggle' > 
                            <input type = "checkbox" className = 'editor-togglesStyle' ref = 'vigiToggle'  />
                            <div className = 'editor-toggleName' > Vegitarian </div>
                        </div>  
                    </div>
                    <div className = 'editor-controls' >
                        <div> <button onClick = {this.createNewItem} > create </button> </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editor;