import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'
import Store from 'codebase/store/store';
import { createContext } from 'react';

interface IStore {
  store: Store
}
const store = new Store()

export const Context = createContext<IStore>(({
  store
}))


ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

