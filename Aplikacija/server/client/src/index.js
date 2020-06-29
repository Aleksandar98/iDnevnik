import React from "react";
import ReactDOM from "react-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import reduxThunk from 'redux-thunk'
import * as serviceWorker from './serviceWorker'
import App from "./components/App"
import './index.css'



//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

  
// ReactDOM.render(
//     <Provider store={store}>
//         <App/>
//     </Provider>,
//     document.querySelector('#root'));

ReactDOM.render(<App/>,document.querySelector('#root'));
    


    

