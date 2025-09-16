import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store/store';
import './index.css';
import { NotificationProvider } from './components/commons/NotificationContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <NotificationProvider>
            <Router>
                <App />
            </Router>
        </NotificationProvider>
    </Provider>
);
