import {  
    combineReducers,
} from 'redux'

const API_URL = 'http://localhost:9090'

export function fetchRealEstateListing(){
    return (dispatch, getState) => {
        var listIsAlreadyFetch = getState().posts.length > 0
        if(listIsAlreadyFetch) return;
            
        var url = `${API_URL}/realEstate?page=0`
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

export function fetchRealEstatePost(postId, updatePageTitle){
    return (dispatch, getState) => {
        var posts = getState().posts
        if(getState().posts.length > 0){
            var loadedPost = posts.filter(p => p.id === postId)[0]
            dispatch(doSetCurrentPost(loadedPost))
        }else{
            var url = `${API_URL}/realEstateProperty/${postId}`
            dispatch(doSetLoadingProgress(0))
            fetch(url)
                .then(response => response.json())
                .then(post => {
                    console.log("Loaded post", post) 
                    dispatch(doSetCurrentPost(post))
                    if( updatePageTitle )
                        dispatch(doSetTitle(post.title))
                    dispatch(doSetLoadingProgress(100))
                })
        }
    }
}

export function startSearch(){
    return (dispatch, getState, {socket}) => {        
        dispatch(doSetLoadingProgress(0))
        //TODO setup the filter
        socket.startSearch({})
    }
}

export function appendPosts(posts){
    return (dispatch) => {        
        dispatch(doSetLoadingProgress(50))
        dispatch(doAppendRealEstatePosts(posts))
        dispatch(doSetLoadingProgress(100))
    }
}

//Internal api---------------------------------------------------------------------

const SET_POSTS = 'SET_POSTS'
function doSetRealEstatePosts(posts){
    console.log("doSetRealEstatePosts", posts)
    return {
        type: SET_POSTS,
        posts
    };
}

const APPEND_POSTS = 'APPEND_POSTS'
function doAppendRealEstatePosts(posts){
    console.log("doAppendRealEstatePosts", posts)
    return {
        type: APPEND_POSTS,
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

const SET_PAGE_TITLE = 'SET_TITLE'
export function doSetTitle(titleSuffix){
    return {
        type: SET_PAGE_TITLE,
        title: `movingbot | ${titleSuffix}`
    };
}

//----REDUCERS-----------------------------------------------------------------------

const RealEstateReducers = {
    loadingProgress:function(state = 0, action){
        if(action.type === SET_LOADING_PROGRESS){
            return action.progress
        }
        return state
    },

    posts: function(state = [], action){
        console.log("RealEstateReducers.posts", action)
        if(action.type === SET_POSTS){
            return action.posts
        }
        if(action.type === APPEND_POSTS){
            return state.concat(action.posts)
        }
        return state
    },

    currentPost: function(state = null, action){
        if(action.type === SET_CURRENT_POST){
            return action.post
        }
        return state
    },

    pageTitle: function(state = "movingbot", action){
        if(action.type === SET_PAGE_TITLE){
            return action.title
        }
        return state;
    }
}

export const reducers = combineReducers(RealEstateReducers);