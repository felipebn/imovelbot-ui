import {  
    applyMiddleware,
    combineReducers,
    createStore,
} from 'redux'
import ListingApi from './services/ListingApi.js';

const initialState = {
    loading: false,
    currentPost: null,
    posts: []
}

function newState(previous, changes){
    return Object.assign({}, state, changes)
}

const FETCH_REALESTATE_LISTING = 'FETCH_REALESTATE_LISTING';
export const doFetchRealEstateListing = (fetch = true) => {
    type: FETCH_REALESTATE_LISTING,
    fetch
}

const FETCH_REALESTATE_POST = 'FETCH_REALESTATE_POST';
export const doFetchRealEstatePost = postId => {
    type: FETCH_REALESTATE_POST,
    postId
}

const reducers = {
    FETCH_REALESTATE_LISTING: (previousState, action) => {
        if(action.fetch){
            return newState(previousState, {loading: true, posts: []})
        }else{
            return newState(previousState, {loading: false, posts: action.posts})
        }
    },
    FETCH_REALESTATE_POST: (previousState, action) => {

    },
};

