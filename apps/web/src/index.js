import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

const rootElement = document.getElementById('root');
console.log("index file loaded");
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            {console.log("index component rendered")}
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}