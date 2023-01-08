import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router } from "@reach/router"

import ShortenerForm from './pages/ShortenerForm'
import ShortenerRedirect from './pages/ShortenerRedirect'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <ShortenerForm path="/" />
      <ShortenerRedirect path=":shortUrl" />
    </Router>
  </React.StrictMode>
);

