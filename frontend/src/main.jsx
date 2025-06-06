import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { Provider } from 'react-redux';
import store from "./store";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <ToastContainer 
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false} 
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"  
    />
    <App />
    </Provider>
  </React.StrictMode>
);