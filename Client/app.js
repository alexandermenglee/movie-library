(function () {
    // variable declaration
    let endpoint = "https://localhost:44367/api/movie/";
    let movies = [];
    let movieList = document.getElementById('movie-list');
    let moreInfoBtn;
    let HTMLString;
    let id;
    
    (function getMovies() {
        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                movies = data;
                movies.forEach(movie => {
                    HTMLString = `
                    <h3>${movie.Title}</h3>
                    <h4>${movie.DirectorName}</h4>
                    <h5>${movie.Genre}</h5>
                    <button id='MovieId-${movie.MovieId}' class='show-more'> More Info </button>
                    <hr>
                    `;
                    
                    $(movieList).append(HTMLString);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    })();

    $(document).on('click', '.show-more', function(event) {
        id = extractId(event.target.getAttribute("id"));
        console.log(id);

        // concatenate id onto endpoint
        endpoint = endpoint + id;
        console.log(endpoint);

        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'GET',
            success: result => {
                endpoint = resetEndpoint(endpoint);
                // endpoint = "https://localhost:44367/api/movie/";
                console.log(result);
            },
            err: error => {
                endpoint = resetEndpoint(endpoint);
                // console.log(error)
            }
        });
    });
    
    //helper method to reset endpoint
    function resetEndpoint(endpoint) {
        return endpoint = "https://localhost:44367/api/movie/";
    }

    function extractId(stringId) {
        // MovieId-7
        let start = stringId.indexOf('-');
        let movieId = stringId.slice(start + 1, stringId.length);

        return movieId;
    }

    // function createMovie(e) {
    //     var dict = {
    //         Title: this["title"].value,
    //         Director: this["director"].value

    //     };

    //     $.ajax({
    //         url: 'endpoint',
    //         dataType: 'json',
    //         type: 'post',
    //         contentType: 'application/json',
    //         data: JSON.stringify(dict),
    //         success: function (data, textStatus, jQxhr) {
    //             $('#response pre').html(data);
    //         },
    //         error: function (jqXhr, textStatus, errorThrown) {
    //             console.log(errorThrown);
    //         }
    //     });

    //     e.preventDefault();
    // }
    // $('#create-movie').submit(createMovie);
})();

