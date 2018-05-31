import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(<BrowserRouter>
     <App />
   </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();



//<div className = 'app-recycleBinIcon' onClick = {this.navigateTo} > <a ref = 'link' href = '/recycleBin' >  </a> </div>