
class ListingAPI {
    fetchPosts(){
        var url = "http://localhost:8000/realStateProperties"
        return fetch(url)
                .then(response => response.json())
    }
}

export default ListingAPI;
