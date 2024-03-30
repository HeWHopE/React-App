import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import { setupStore } from './store/store';

const store = setupStore();

// Include Font Awesome Kit script
const script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/41f14c9e5f.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
