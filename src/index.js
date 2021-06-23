import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';

ReactDOM.render(
    <Router>
        <React.StrictMode>
            <App />, document.getElementById('root')
        </React.StrictMode>
    </Router>
    
)