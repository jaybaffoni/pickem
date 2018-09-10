import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import App from './App';
import history from './history';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
        <Router history={history}>
            <App history={history}{...this.props} />
        </Router>
        , document.getElementById('root'));
registerServiceWorker();
