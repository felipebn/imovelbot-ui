import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './store';

export default function configureStore(initialState) {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );
}