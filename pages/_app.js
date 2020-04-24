import App from 'next/app';
import React from 'react';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux';

import { initializeStore } from '../redux/store';


class UWHApp extends App {


  render() {
    const { Component, pageProps, store } = this.props;

    return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
    );
  }
}

export default withRedux(initializeStore)(UWHApp)

