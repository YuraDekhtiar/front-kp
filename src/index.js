import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';


ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
);

