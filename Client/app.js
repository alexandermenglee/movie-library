(function init() {
    // variable declaration
    let endpoint = "https://localhost:44367/api/movie/";
    let movies = [];
    let movieList = document.getElementById('movie-list');
    let HTMLString;
    
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
                    <div id='DisplaySection-${ movie.MovieId }'>
                        <h3 class='display-${ movie.MovieId }'>${ movie.Title }</h3>
                        <h4 class='display-${ movie.MovieId }'>${ movie.DirectorName }</h4>
                        <h5 class='display-${ movie.MovieId }'>${ movie.Genre }</h5>
                        <button id='MovieId-${ movie.MovieId }' class='show-more'> More Info </button>
                        <button id='EditMovieId-${ movie.MovieId }' class='edit-movie'> Edit </button>
                        <hr></hr>
                    </div>
                    `;
                    console.log(HTMLString);
                    
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
        let id = extractId(event.target.getAttribute("id"));

        // concatenate id onto endpoint
        endpoint = endpoint + id;

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
                console.log(error)
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
        <h1 class='display-${ movie.MovieId }'>${ movie.Title }</h1>
        <h3 class='display-${ movie.MovieId }'>${ movie.DirectorName }</h3>
        <h4 class='display-${ movie.MovieId }'>${ movie.Genre }</h4>
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
    /****************************** PUT Request ******************************/
    $(document).on('click', '.edit-movie', function (event) {
        let id = extractId(event.target.getAttribute("id"));
        let headerClass = `display-${id}`;
        let displayDivId = `DisplaySection-${id}`;
        let headerValues = Array.prototype.slice.call(document.querySelectorAll(`.${ headerClass }`)).map(el => el.textContent);
        let displayDiv = document.getElementById(displayDivId);
        let input;
        let hrTag;
        let updateButton;
        let htmlInputString = `
        <input='text' name='title' value='${headerValues[0]}'>
        <input='text' name='title' value='${headerValues[1]}'>
        <input='text' name='title' value='${headerValues[2]}'>
        <button type="submit" id="edit-movie">Update</button>
        `;

        $(displayDiv).empty();
        
        for(let i = 0; i < headerValues.length; i++) {
            input = document.createElement('input');
            input.type = 'text';
            input.value = headerValues[i];
            displayDiv.appendChild(input);
        }

        hrTag = document.createElement('hr');
        updateButton = document.createElement('button');
        updateButton.id = 'edit-movie-button';
        updateButton.textContent = "Update";

        displayDiv.appendChild(updateButton);
        displayDiv.appendChild(hrTag);

        document.getElementById('edit-movie-button').addEventListener('click', () => console.log('coming from the edit update btn'));
        

        // change headings to input='text'
            // grab all headings with same class 
            // change remove class 
        // concatenate id onto endpoint
        endpoint = endpoint + id;

        // $.ajax({
        //     url: endpoint,
        //     dataType: 'json',
        //     type: 'PUT',
        //     success: result => {
        //         endpoint = resetEndpoint(endpoint);
        //         displayMovie(result);
        //     },
        //     err: error => {
        //         endpoint = resetEndpoint(endpoint);
        //         console.log(error)
        //     }
        // });
    });

    /****************************** POST Request ******************************/
    function createMovie(e) {
        var movie = {
            Title: this["title"].value,
            Genre: this["genre"].value,
            DirectorName: this["director"].value
            
        };

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

