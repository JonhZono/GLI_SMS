import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './App.css';
import * as serviceWorker from './serviceWorker';
import Routes from './routes';

ReactDOM.render(<Routes />, document.getElementById('root'));
serviceWorker.unregister();
