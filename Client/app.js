(function init() {
    // variable declaration
    let endpoint = "https://localhost:44367/api/movie/";
    let movies = [];
    let movieList = document.getElementById('movie-list');
    let HTMLString;
    let id;
    
/****************************** GET Request ******************************/
    // Displays all movies
    function getMovies() {
        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'GET',
            success: function (data) {
                movies = data;
                movies.forEach(movie => {
                    HTMLString = `
                    <h3>${ movie.Title }</h3>
                    <h4>${ movie.DirectorName }</h4>
                    <h5>${ movie.Genre }</h5>
                    <button id='MovieId-${ movie.MovieId }' class='show-more'> More Info </button>
                    <hr>
                    `;
                    
                $(movieList).append(HTMLString);
                console.log(endpoint);
                });
            },
            error: function (error) {
                console.log(error);
            }
        });
    };

    getMovies();

/****************************** GET (by MovieId) Request ******************************/
    // Displays a single movie and its information
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
                displayMovie(result);
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

    // used to extract the MovieId out of the id attribute
    function extractId(stringId) {
        // MovieId-7
        let start = stringId.indexOf('-');
        let movieId = stringId.slice(start + 1, stringId.length);

        return movieId;
    }

    function displayMovie(movie) {
        let htmlForSingleMovie;
        let showMoviesBtn;

        htmlForSingleMovie = `
        <h1>${ movie.Title }</h1>
        <h3>${ movie.DirectorName }</h3>
        <h4>${ movie.Genre }</h4>
        <button id='show-all-movies'>Show All Movies</button>
        `;

        $(movieList).empty();
        $(movieList).append(htmlForSingleMovie);
        
        showMoviesBtn = document.getElementById('show-all-movies');
        showMoviesBtn.addEventListener('click', () => {
            $(movieList).empty();
            getMovies();
        });
    }

    /****************************** POST Request ******************************/
    function createMovie(e) {
        var movie = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            DirectorName: this["director"].value
            
        };
        console.log(endpoint);
        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function(){
                getMovies();
                console.log('success on posting');
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

        e.preventDefault();
    }
    $('#my-form').submit(createMovie);
})();

