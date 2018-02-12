
class ListingAPI {
    //TODO handle pages
    fetchPosts(){
        var url = "http://localhost:8080/realEstate?page=0"
        return fetch(url)
                .then(response => response.json())
    }
}

export default ListingAPI;
