import { configureStore } from '@reduxjs/toolkit';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer, { rootSaga } from '@/store';

import App from './App';

const sagaMiddleware = createSagaMiddleware();
const isDevelopment = process.env.NODE_ENV !== 'production';
const store = configureStore({
  reducer: rootReducer,
  middleware: isDevelopment
    ? [sagaMiddleware, logger as any]
    : [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

const root = document.getElementById('root') as Element;

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
    <div id="myportal" />
  </Provider>
);
