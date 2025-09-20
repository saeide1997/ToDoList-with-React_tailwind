import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from "react";
import './index.css'
import App from './App.jsx'
import Layout from "./assets/components/Layout.jsx";
import { store } from './state/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
        <Layout>
            <App />
        </Layout>
        </Provider>
    </React.StrictMode>,
)
