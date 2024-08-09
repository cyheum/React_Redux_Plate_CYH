import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage } from '@/pages';

import { GlobalStyle } from './styles';

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default Router;
