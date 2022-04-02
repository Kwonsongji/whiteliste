import React from 'react';
 import ReactDOM from 'react-dom';
/* import * as ReactDOMClient from 'react-dom/client' ; */


/* ReactDOMClient.hydrateRoot*/
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
//  ReactDOM.render est devenue obsolète
//  l'API New Root est disponible en import react-dom/client:

//ReactDOMClient.createRoot

 
 ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
