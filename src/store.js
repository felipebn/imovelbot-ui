import {  
    combineReducers,
} from 'redux'

export function fetchRealEstateListing(){
    return (dispatch) => {
        var url = "http://localhost:8080/realEstate?page=0"
        dispatch(doSetLoadingProgress(0))
        fetch(url)
            .then(response => response.json())
            .then(result => {
                console.log("Loaded listing", result.realEstateProperties) 
                dispatch(doSetRealEstatePosts(result.realEstateProperties))
                dispatch(doSetLoadingProgress(100))
            })
    }
}

export function fetchRealEstatePost(postId){
    return (dispatch) => {
        var url = "http://localhost:8080/realEstateProperty/" + id
        dispatch(doSetLoadingProgress(0))
        fetch(url)
            .then(response => response.json())
            .then(post => {
                console.log("Loaded post", post) 
                dispatch(doSetCurrentPost(post))
                dispatch(doSetLoadingProgress(100))
            })
    }
}

const SET_POSTS = 'SET_POSTS'
function doSetRealEstatePosts(posts){
    return {
        type: SET_POSTS,
        posts
    };
}

const SET_CURRENT_POST = 'SET_CURRENT_POST'
function doSetCurrentPost(post){
    return {
        type: SET_CURRENT_POST,
        post
    };
}
const SET_LOADING_PROGRESS = 'SET_LOADING_PROGRESS'
function doSetLoadingProgress(progress){
    return {
        type: SET_LOADING_PROGRESS,
        progress
    };
}

//----REDUCERS-----------------------------------------------------------------------

const RealEstateReducers = {
    loadingProgress:function(state = 0, action){
        if(action == SET_LOADING_PROGRESS){
            return action.posts
        }
        return state
    },

    posts: function(state = [], action){
        if(action == SET_POSTS){
            return action.posts
        }
        return state
    },

    currentPost: function(state = null, action){
        if(action == SET_CURRENT_POST){
            return action.post
        }
        return state
    },
}

export const reducers = combineReducers(RealEstateReducers);