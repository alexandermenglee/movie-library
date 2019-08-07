(function () {
    // variable declaration
    let endpoint = "https://localhost:44367/api/movie/";
    console.log('coming from first iife');

    // add event listeners

    (function getMovies() {
        console.log('coming from getMovies fn');

        $.ajax({
            url: endpoint,
            dataType: 'json',
            type: 'GET',
            success: function (data, textStatus, jQxhr) {
                console.log(data);
            },
            error: function (jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
    })();

    

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

