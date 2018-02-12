
class ListingAPI {
    fetchPosts(){
        var url = "http://localhost:8000/realEstateProperties"
        return fetch(url)
                .then(response => response.json())
    }
}

export default ListingAPI;
