import {  
    combineReducers,
} from 'redux'

const POST_COUNT_PAUSE_TRIGGER = 30
const RESULT_SIZE = 15
const API_URL = 'http://localhost:9090'

export function fetchRealEstateListing(){
    return (dispatch, getState) => {
        dispatch(doSetTitle())

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
        var updateFn = post => {
            console.log("Loaded post", post) 
            dispatch(doSetCurrentPost(post))
            if( updatePageTitle )
                dispatch(doSetTitle(post.title))
            dispatch(doSetLoadingProgress(100))
        }; 
        if(getState().posts.length > 0){
            var loadedPost = posts.filter(p => p.id === postId)[0]
            updateFn(loadedPost)
        }else{
            var url = `${API_URL}/realEstateProperty/${postId}`
            dispatch(doSetLoadingProgress(0))
            fetch(url)
                .then(response => response.json())
                .then(updateFn)
        }
    }
}

export function startSearch(filters = {}){
    return (dispatch, getState, {socket}) => {        
        dispatch(doSetLoadingProgress(0))
        dispatch(setSearchPauseState(false))
        socket.startSearch(RESULT_SIZE, filters)
    }
}

export function resumeSearch(){
    return (dispatch, getState, {socket}) => {        
        console.log("resuming search...")
        dispatch(doSetLoadingProgress(0))
        socket.resumeSearch()
        dispatch(setSearchPauseState(false))
    }
}

export function appendPosts(posts){
    return (dispatch, getState, {socket}) => {        
        var currentPostCount = getState().posts.length

        if((currentPostCount + posts.length) >= POST_COUNT_PAUSE_TRIGGER){
            socket.pauseSearch()
            dispatch(setSearchPauseState(true))
            console.log("Paused search")
        }
        
        dispatch(doSetLoadingProgress(50))
        dispatch(doAppendRealEstatePosts(posts))
        dispatch(doSetLoadingProgress(100))
    }
}

const SET_PAGE_TITLE = 'SET_TITLE'
export function doSetTitle(titleSuffix){
    if(titleSuffix == null){
        return {
            type: SET_PAGE_TITLE,
            title: `movingbot`
        };        
    } 
    return {
        type: SET_PAGE_TITLE,
        title: `movingbot | ${titleSuffix}`
    };
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

const SET_SEARCH_STATE = 'SET_SEARCH_STATE'
function setSearchPauseState(isPaused){
    return {
        type: SET_SEARCH_STATE,
        isPaused
    }
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
        console.log("RealEstateReducers.pagetitle", action)
        if(action.type === SET_PAGE_TITLE){
            return action.title
        }
        return state;
    },

    isSearchPaused: function(state=false, action){
        if(action.type === SET_SEARCH_STATE){
            return action.isPaused
        }
        return state;
    }
}

export const reducers = combineReducers(RealEstateReducers);