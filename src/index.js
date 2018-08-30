import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware, connectRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import Immutable from 'immutable';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const persistedState = localStorage.getItem('reduxState')
	? Immutable.fromJS(JSON.parse(localStorage.getItem('reduxState')))
	: Immutable.Map();

const store = createStore(
	connectRouter(history)(rootReducer),
	persistedState,
	composeEnhancer(
		applyMiddleware(
			routerMiddleware(history),
		),
	),
);

store.subscribe(()=>{
	localStorage.setItem('reduxState', JSON.stringify(store.getState().toJSON()))
});

ReactDOM.render(
		<Provider store={store}>
			<App history={history} />
		</Provider>,
	document.getElementById('root')
);


registerServiceWorker();
