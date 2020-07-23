import React from 'react';
import './App.css';
// import Start from './container/Start';
import MainPage from './container/MainPage';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import projectReducer from "./components/rarelyUpdated/projectReducer";
import milestoneReducer from "./components/weeklyUpdated/Milestone/milestoneReducer";
import riskReducer from "./components/weeklyUpdated/Risk/riskReducer";
import mainReducer from "./container/mainReducer";
import validateReducer from "./components/weeklyUpdated/validateReducer";

function App() {
  const store = createStore(combineReducers({ mainReducer, projectReducer, milestoneReducer, riskReducer, validateReducer }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

export default App;
