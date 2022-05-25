import Store from 'codebase/store/store';
import React, { createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

interface IStore {
  store: Store
}
const store = new Store()

export const Context = createContext<IStore>(({
  store
}))


store.checkAuth()

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <React.StrictMode>
      <Context.Provider value={{ store }}>
        <App />
      </Context.Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

