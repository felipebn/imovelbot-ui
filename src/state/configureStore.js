import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './store';
import { socket } from '../websocket/socket';

export default function configureStore(initialState) {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(thunk.withExtraArgument({ socket }))
    );
}