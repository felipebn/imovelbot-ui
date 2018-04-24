import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs'
import nanoid from 'nanoid';
import { appendPosts } from '../state/store';

const socketUrl = 'http://localhost:8080/socket'
const sockjs = new SockJS(socketUrl);
const clientId = nanoid()
const client = Stomp.over(sockjs);
client.debug = function(str) {};

export const setupListeners = (store) => {
    client.connect({}, function (frame) {
        console.log("Websocket connected...")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
        client.subscribe(`/topic/search/${clientId}`, function (result) {                                                                                                                                                                                                                                                                                                                                                                                                               
            var posts = JSON.parse(result.body);
            store.dispatch(appendPosts(posts))
        });
    });
}

export const socket = {
    startSearch(filters){
        const searchMessage = {
            clientId,
            "priceRange": {"min": 100, "max": 1000}                                                             
        }
        client.send('/ws/search/start', {}, JSON.stringify(searchMessage));
    },
    pauseSearch(){
        client.send('/ws/search/pause', {}, JSON.stringify({clientId}));
    },
    resumeSearch(){
        client.send('/ws/search/resume', {}, JSON.stringify({clientId}));
    },
    cancelSearch(){
        client.send('/ws/search/cancel', {}, JSON.stringify({clientId}));
    }
}