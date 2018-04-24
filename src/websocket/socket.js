import SockJS from 'sockjs-client';
import nanoid from 'nanoid';
import { appendPosts } from '../state/store';

const socketUrl = 'http://localhost:18080/echo'
const sockjs = new SockJS(socketUrl);
const clientId = nanoid()
//Needs spring
//const client = Stomp.over(sockjs);
const client = {
    messageCallbacks: {},

    send(topic, payload){
        console.log("Sending: ", topic, payload)
        var mockMessage = {
            topic,
            payload
        }
        sockjs.send(JSON.stringify(mockMessage))
    },
    subscribe(topic, callback){
        sockjs.onmessage = function(e) {
            console.log('message received as setup on listeners', e.data);
            store.dispatch(appendPosts([]))
        };
    }
}

sockjs.onopen = function() {
    console.log('sending message');
    client.send("/onopen", "Testing message")
};



export const setupListeners = (store) => {
    //TODO replace with stomp code!
    sockjs.onmessage = function(e) {
        console.log('message received as setup on listeners', e.data);
        store.dispatch(appendPosts([]))
    };

    /*Needs the spring server
    client.connect({}, function (frame) {
        log("Connected to server...")
    });
    client.subscribe(`/topic/search/${clientId}`, function (result) {
        console.log("result::", result);
        log("result::" + result);
    });
    */

}

export const socket = {
    startSearch(filters){
        const searchMessage = {
            clientId
        }
        client.send('/ws/search', searchMessage);
    },
    pauseSearch(){
        client.send('/ws/search/pause', {clientId});
    },
    resumeSearch(){
        client.send('/ws/search/resume', {clientId});
    },
    cancelSearch(){
        client.send('/ws/search/cancel', {clientId});
    }
}