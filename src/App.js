import React, { Component } from 'react';
import './App.css';

import Home from './home/home';
import RecycleBin from './recycleBin/recycleBin.js';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  
} from 'react-router-dom';




class App extends Component {
  
  static propTypes = {
    history: PropTypes.object.isRequired,
  }
 
  constructor(props){
    super(props)

  }
  


  navigateTo = (routeReference) => {
     //routeReference.click();
     let route = '/recycleBin';
      this.props.history.push(route);
  }


  render() {

   
    return (

        <Router>
            
            <div className = 'app-MainWraaper' > 

             {/*<div> some other html elements... </div>*/}

                <Switch>
                    
                    <Route exact path = '/'  component = { () => <Home onNavigateTo = {this.navigateTo} /> } />
                    <Route path = '/home' component = { () => <Home onNavigateTo = {this.navigateTo} /> } />
                    <Route path = '/recycleBin' component = { () => <RecycleBin onNavigateTo = {this.navigateTo} /> } />

                </Switch>

                 

              {/*<div> some other html elements... </div>*/}

            </div>

        </Router>
    );
  }
}

export default withRouter(App);


// import React, { Component } from 'react';
//import './filter.css';

// class Filter extends Component{ 

//     constructor(props){ 
//         super(props)
       
//     }



//     render() {

//         return(

//             <div>
            
//             </div>
            
//         )

//     }

// }

// export default Filter;
