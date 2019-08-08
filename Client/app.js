(function init() {
    console.log("Don't resize. Not optimized for mobile.");
    // variable declaration
    let endpoint = "https://localhost:44367/api/movie/";
    let movies = [];
    let movieList = document.getElementById('movie-list');
    let HTMLString;
    let editing = false;
    
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
                        <p class='display-${ movie.MovieId } title'>${ movie.Title }</p>
                        <p class='display-${ movie.MovieId } director-name'>${ movie.DirectorName }</p>
                        <p class='display-${ movie.MovieId } genre'>${ movie.Genre }</p>
                        <button id='MovieId-${ movie.MovieId }' class='show-more btn'> More Info </button>
                        <button id='EditMovieId-${ movie.MovieId }' class='edit-movie btn'> Edit </button>
                        <hr></hr>
                    </div>
                    `;
                    
                $(movieList).append(HTMLString);
                });
            },
            error: function (error) {
                return error;
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
                return error;
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

        if(editing === true) {
            return alert("Please finish updating the currently selected movie");
        }


        let id = extractId(event.target.getAttribute("id"));
        let headerClass = `display-${id}`;
        let displayDivId = `DisplaySection-${id}`;
        let headerValues = Array.prototype.slice.call(document.querySelectorAll(`.${ headerClass }`)).map(el => el.textContent);
        let displayDiv = document.getElementById(displayDivId);
        let formTag;
        let input;
        let hrTag;
        let updateButton;
        let updateForm;
        debugger;
        editing = true;

        $(displayDiv).empty();
        
        formTag = document.createElement('form');
        formTag.id = 'update-form';
        displayDiv.appendChild(formTag);
        updateForm = document.getElementById('update-form');

        for(let i = 0; i < headerValues.length; i++) {
            input = document.createElement('input');
            input.type = 'text';

            switch(i) {
                case 0:
                    input.name = 'title';
                    break;
                case 1:
                    input.name = 'director';
                    break;
                case 2:
                        input.name = 'genre';
                        break;
            }
            input.id = `EditMovie-${id}`;
            input.value = headerValues[i];
            updateForm.appendChild(input);
        }

        hrTag = document.createElement('hr');
        updateButton = document.createElement('button');
        updateButton.type = 'submit';
        updateButton.id = 'edit-movie-btn';
        updateButton.textContent = "Update";

        displayDiv.appendChild(updateButton);
        displayDiv.appendChild(hrTag);

        endpoint = endpoint + id;
        document.getElementById('edit-movie-btn').addEventListener('click', updateMovie.bind(updateForm));
    });

    function updateMovie(e) {
        var movie = {
            Title: this["title"].value,
            DirectorName: this["director"].value,
            Genre: this["genre"].value
        };

        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function () {
                endpoint = resetEndpoint(endpoint);
                editing = false;
                $(movieList).empty();
                getMovies();
            },
            error: function (jqXhr, textStatus, errorThrown) {
                return errorThrown
            }
        });

        e.preventDefault();
    }
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
            },
            error: function (jqXhr, textStatus, errorThrown) {
                return errorThrown;
            }
        });

        e.preventDefault();
    }

    $('#my-form').submit(createMovie);

})();

