import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// Importando reducers
import reducers from '../reducers/';
import rootSaga from '../sagas/';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;