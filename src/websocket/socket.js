import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs'
import nanoid from 'nanoid';
import { appendPosts } from '../state/store';

const SERVER_ON = false
const socketUrl = 'http://localhost:8080/socket'
const sockjs = new SockJS(socketUrl)
const clientId = nanoid()
const client = Stomp.over(sockjs)
client.debug = function(str) {}

async function loadDemoPosts(repeatList){
    var demoPosts ="[{\"link\":\"https://www.olx.pt/anuncio/t1-campolide-cozinha-equipada-IDB0EGk.html\",\"title\":\"T1 Campolide - cozinha equipada\",\"price\":690,\"photos\":[{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_1_644x461_t1-campolide-cozinha-equipada-lisboa_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_2_644x461_t1-campolide-cozinha-equipada-imagens_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_3_644x461_t1-campolide-cozinha-equipada-arrenda-se_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_4_644x461_t1-campolide-cozinha-equipada-imveis_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_5_644x461_t1-campolide-cozinha-equipada-lisboa_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_6_644x461_t1-campolide-cozinha-equipada-_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_7_644x461_t1-campolide-cozinha-equipada-_rev042.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_8_644x461_t1-campolide-cozinha-equipada-_rev042.jpg\"}],\"lastUpdated\":\"08:40 25/04/2018\",\"source\":\"OLX\",\"sourceId\":\"546880816\",\"id\":\"5a1d1429-ec56-4f90-a6c7-423dc63af966\",\"mainPhotoUrl\":\"https://img01-olxpt.akamaized.net/img-olxpt/932637286_1_644x461_t1-campolide-cozinha-equipada-lisboa_rev042.jpg\",\"publisher\":\"Profissional\",\"type\":\"T1\",\"size\":\"50 m²\",\"description\":\"Comercializado por: Casas de Lisboa MAIS DETALHES E MARCAÇÕES SÓ POR RESPOSTA AO ANÚNCIO - NÃO SE FAZEM MARCAÇÕES POR TELEFONE T1 com cerca de 50 m2 em Campolide, Prédio com elevador. Apartamento cheio de muita luz com: Cozinha COMPLETAMENTE equipada . Marquise na cozinha  Sala com armário de parede - SEM outros MÓVEIS Quarto com pequena marquise fechada ,onde poderá colocar um roupeiro e/ou uma cómoda - ARRENDADO SEM MÓVEIS Bom Wc com janela Condições: mínimo 1 ano de estadia + 1 caução + renda do primeiro mês + renda do segundo mês + fiador * CASO NÃO TENHA FIADOR , PEDE-SE UMA CAUÇÃO DE 4 MESES - Não são permitidos contratos que visem o sub-arrendamento - Máximo lotação, um casal SEM filhos mas idealmente dá-se preferência a uma pessoa sozinha - Não são permitidos animais de estimação CASO PRETENDA E MEDIANTE NEGOCIAÇÃO PODE MOBILAR-SE O APARTAMENTO\",\"neighborhood\":\"Campolide, Lisboa, Lisboa\"},{\"link\":\"https://www.olx.pt/anuncio/excelente-t2-remodelado-e-mobilado-olivais-IDBtGON.html\",\"title\":\"Excelente T2 Remodelado e Mobilado Olivais\",\"price\":800,\"photos\":[{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_1_644x461_excelente-t2-remodelado-e-mobilado-olivais-lisboa.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_2_644x461_excelente-t2-remodelado-e-mobilado-olivais-imagens.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_3_644x461_excelente-t2-remodelado-e-mobilado-olivais-arrenda-se.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_4_644x461_excelente-t2-remodelado-e-mobilado-olivais-imveis.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_5_644x461_excelente-t2-remodelado-e-mobilado-olivais-lisboa.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_6_644x461_excelente-t2-remodelado-e-mobilado-olivais-.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_7_644x461_excelente-t2-remodelado-e-mobilado-olivais-.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_8_644x461_excelente-t2-remodelado-e-mobilado-olivais-.jpg\"}],\"lastUpdated\":\"08:38 25/04/2018\",\"source\":\"OLX\",\"sourceId\":\"553800541\",\"id\":\"89951027-2898-4bd4-aa39-852e4b1421d4\",\"mainPhotoUrl\":\"https://img01-olxpt.akamaized.net/img-olxpt/941205473_1_644x461_excelente-t2-remodelado-e-mobilado-olivais-lisboa.jpg\",\"publisher\":\"Particular\",\"furnished\":\"Não\",\"type\":\"T2\",\"bathrooms\":\"1\",\"size\":\"75 m²\",\"state\":\"Renovado\",\"description\":\"Apartamento totalmente remodelado recentemente, perto de Escola, Shopping, Metro e Autocarro.\",\"neighborhood\":\"Olivais, Lisboa, Lisboa\"},{\"link\":\"https://www.olx.pt/anuncio/t1-em-benfica-IDBtDhy.html\",\"title\":\"T1 em Benfica\",\"price\":550,\"photos\":[{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_1_644x461_t1-em-benfica-lisboa.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_2_644x461_t1-em-benfica-imagens.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_3_644x461_t1-em-benfica-arrenda-se.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_4_644x461_t1-em-benfica-imveis.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_5_644x461_t1-em-benfica-lisboa.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_6_644x461_t1-em-benfica-.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_7_644x461_t1-em-benfica-.jpg\"},{\"url\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_8_644x461_t1-em-benfica-.jpg\"}],\"lastUpdated\":\"02:15 25/04/2018\",\"source\":\"OLX\",\"sourceId\":\"553786948\",\"id\":\"fa029efb-8670-456c-ad0f-56e44fb2561c\",\"mainPhotoUrl\":\"https://img01-olxpt.akamaized.net/img-olxpt/941190967_1_644x461_t1-em-benfica-lisboa.jpg\",\"publisher\":\"Profissional\",\"furnished\":\"Não\",\"type\":\"T1\",\"size\":\"40 m²\",\"state\":\"Para recuperar\",\"energyClass\":\"B-\",\"description\":\"Apartamento T1, localizado em Benfica, na Travessa da Cruz da Era. Constituído por sala, quarto, casa de banho com banheira, cozinha e pequeno pátio/saguão. O apartamento necessita de algumas pequenas reparações que poderão ficar a cargo do inquilino ou do Senhorio. Preço sem obras - 550\u0080 Preço com obras feitas - 650\u0080 Comercialização: Home Spot AMI: 7889 Referência interna: IT20180019\",\"neighborhood\":\"Benfica, Lisboa, Lisboa\"}]"
    var posts = JSON.parse(demoPosts)
    var repeatedPosts = []
    for(var i =0; i < repeatList; i++){
        repeatedPosts = repeatedPosts.concat(posts.map(p => {
            var clone = {...p}
            clone.id = clone.id + "-" + i
            return clone
        }))
    }
    return repeatedPosts;
}

export const setupListeners = (store) => {
    if(SERVER_ON){
        client.connect({}, function (frame) {
            console.log("Websocket connected...")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            client.subscribe(`/topic/search/${clientId}`, function (result) {                                                                                                                                                                                                                                                                                                                                                                                                               
                var posts = JSON.parse(result.body);
                store.dispatch(appendPosts(posts))
            });
        });
    }else{
        loadDemoPosts(1).then(posts => store.dispatch(appendPosts(posts)));
        setTimeout(function(){loadDemoPosts(10).then(posts => store.dispatch(appendPosts(posts)));}, 2000)
        client.send = function(topic, headers, payload){
            console.log({topic, headers, payload})
        }
    }
}

export const socket = {
    startSearch(resultSize, filters = {}){
        const searchMessage = {
            clientId,
            resultSize,
            ...filters
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