import { renderToString } from 'react-dom/server';
import React from 'react';
import App from './src/App.tsx';

try {
  console.log(renderToString(React.createElement(App)));
} catch (e) {
  console.error("RENDER ERROR:", e);
}
