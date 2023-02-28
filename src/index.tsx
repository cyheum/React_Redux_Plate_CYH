import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer, { rootSaga } from "@/store";
import App from "./App";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
});

sagaMiddleware.run(rootSaga);

const root = document.getElementById("root") as Element;

ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <App />
    <div id='myportal' />
  </Provider>
);
