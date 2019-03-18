$(document).ready(function () {

    var movieURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=26f11059b0bb2b81a52459d80f97f024&language=en-US&page=1&region=US&limit=10";
    var recipeURL = "https://api.edamam.com/search?ingr=10&to=6&app_id=ca210f04&app_key=5ed5790624ab671570a82720dfa1d6f3&q=";

    //when date night in is clicked
    $("#dateOpt1").one("click", function () {
        scroll(350);

        //message
        $("#prompt1").append("<h5>Night in, oo la la! Let's start with dinner.</h5><h5>Enter the type of recipe you'd like to make below.</h5>");

        //input box to search for recipe
        $("#recipeSearch").append("<input type='text' id='recipe' placeholder='ex. Chicken Pasta, Pizza, etc.'><label>Recipe Type</label>")

        //create submit button for recipe search
        $("#recipeButton").append("<button class='recipeBtn waves-effect waves-light btn cyan'>Submit</button>");

    });

    //when recipe search submit button is clicked
    $(document).on("click", ".recipeBtn", function() {
        //get recipe type from user input
        var recipe = $("#recipe").val();

        //API call to get recipes generated
        $.ajax({
            url: recipeURL + recipe,
            method: "GET"
        }).done(function(recipeRes) {
            scroll(800);

            //title for dinner display
            var dinnerSugg = $(".inDinnerOpt").append("<h4 class='center-align'>Dinner Suggestions</h4>");

            for(var x = 0; x < recipeRes.hits.length; x++) {
                var recipeName = recipeRes.hits[x].recipe.label;
                var servings = recipeRes.hits[x].recipe.yield;
                var calories = recipeRes.hits[x].recipe.calories;
                var recipeLink = recipeRes.hits[x].recipe.url;
                calories = Math.round(calories);

                //display info on recipes
                dinnerSugg.append("<hr><h6 data-link=" + recipeLink + " class='recipeInfo'>" + recipeName + "</h6><p>Yields " + servings + " servings</p><p>" + calories + " calories</p>");
            }
        })
        var message = $("<h5>Click the button below for more fun date ideas!</h5><p>HINT: Keep clicking for more ideas</p>");
        //get more ideas button
        $("#nightInIdeas").append(message).append("<button class='inIdeas btn-floating btn-large pink pulse'><i class='material-icons'>favorite</i></button><br><br>");
    })

    // $(document).on("click", ".recipeInfo", function() {
    //     console.log($(this).attr("data-link"));
    // })

    $(document).on("click", ".inIdeas", function() {
       scroll(500);
        var in0 = $("<img src='assets/images/in0.png' class='dateIdea z-depth-2'>"),
            in1 = $("<img src='assets/images/in1.png' class='dateIdea z-depth-2''>"),
            in2 = $("<img src='assets/images/in2.png' class='dateIdea z-depth-2''>"),
            in3 = $("<img src='assets/images/in3.png' class='dateIdea z-depth-2''>"),
            in4 = $("<img src='assets/images/in4.png' class='dateIdea z-depth-2''>"),
            in5 = $("<img src='assets/images/in5.png' class='dateIdea z-depth-2''>"),
            in6 = $("<img src='assets/images/in6.png' class='dateIdea z-depth-2''>"),
            in7 = $("<img src='assets/images/in7.png' class='dateIdea z-depth-2''>");
        var inArr = [in0, in1, in2, in3, in4, in5, in6, in7];

        var randomImg = Math.floor(Math.random() * inArr.length);
        console.log(inArr[randomImg]);
        $("#randomIdea").html(inArr[randomImg]);
    })

    //when date night out is clicked
    $("#dateOpt2").one("click", function () {
        scroll(350);

        $("#prompt1").append("<h5>Night out, nice! How much are you willing to spend?</h5>");

        //create first column div, l3 and offset-3 so it is right aligned & centered 
        var stepTwoDiv1 = $("<div>").attr("class", "col s3 offset-s3 center-align stepTwoOpt");
        //create second column div, l3 left aligned and centered
        var stepTwoDiv2 = $("<div>").attr("class", "col s3 center-align stepTwoOpt");
        //create card div for the budget date option
        var budgetDiv = $("<div>").attr("class", "budgetOpt card-panel hoverable");
        //create card div for the no budget date option
        var richDiv = $("<div>").attr("class", "richOpt card-panel hoverable");

        //variables to append to cards, makes code more readable
        var budgetTitle = "ON A BUDGET";
        var budgetDesc = "Saving money but still want to have fun."
        var richTitle = "$$ AIN'T A THING";
        var richDesc = "I'm willing to spend a pretty penny on this date."
        var budgetImg = $("<img src='assets/images/pigBank.jpg' alt='piggy bank' class='circle cardImg'>");
        var richImg = $("<img src='assets/images/rich.jpg' alt='money' class='circle cardImg'>");

        //append message and image to both card divs
        budgetDiv.append("<span><h5>" + budgetTitle + "</h5><p>" + budgetDesc + "</p>").append(budgetImg).append("</span>");
        richDiv.append("<span><h5>" + richTitle + "</h5><p>" + richDesc + "</p>").append(richImg).append("</span>");

        //append budget & rich cards to each column div, and append column divs to row div
        $("#stepTwoRow").append(stepTwoDiv1.append(budgetDiv)).append(stepTwoDiv2.append(richDiv));
    });

    //when budget card is clicked
    $(document).on("click", ".budgetOpt", function () {
        scroll(500);

        $("#prompt2").append("<h5>Smart, enter your five digit zip code for dinner and movie suggestions in your area.</h5>");
        //append input box to div
        $("#zipCode").append("<input type='text' id='enterZip'><label>Zip Code</label>")
        //append submit button
        $("#submitButton").append("<button data-price='2' class='submit waves-effect waves-light btn cyan'>Submit</button>");
    });

    //when no budget card is clicked
    $(document).on("click", ".richOpt", function () {
        scroll(500);

        $("#prompt2").append("<h5>Fancy, enter your five digit zip code for dinner and movie suggestions in your area.</h5>");
        //append input box to div
        $("#zipCode").append("<input type='text' id='enterZip'><label>Zip Code</label>")
        //append submit button
        $("#submitButton").append("<button data-price='3, 4' class='submit waves-effect waves-light btn cyan'>Submit</button>");
    });

    //when submit (for zipcode) button is clicked
    $(document).one("click", ".submit", function (event) {
        event.preventDefault();

        //call dinner suggestion function with specific price range depending on which budget card is clicked
        nightOutSugg($(this).attr("data-price"));

        var message = $("<h5>Click the button below for more fun date ideas!</h5>")
        //get more ideas button
        $("#nightOutIdeas").append(message).append("<button class='outIdeas btn-floating btn-large pink pulse'><i class='material-icons'>favorite</i></button><br><br>");
    });

    //when more ideas button is clicked
    $(document).on("click", ".outIdeas", function () {
        scroll(500);
        var out0 = $("<img src='assets/images/out0.png' class='dateIdea z-depth-2'>"),
            out1 = $("<img src='assets/images/out1.png' class='dateIdea z-depth-2''>"),
            out2 = $("<img src='assets/images/out2.png' class='dateIdea z-depth-2''>"),
            out3 = $("<img src='assets/images/out3.png' class='dateIdea z-depth-2''>"),
            out4 = $("<img src='assets/images/out4.png' class='dateIdea z-depth-2''>"),
            out5 = $("<img src='assets/images/out5.png' class='dateIdea z-depth-2''>"),
            out6 = $("<img src='assets/images/out6.png' class='dateIdea z-depth-2''>"),
            out7 = $("<img src='assets/images/out7.png' class='dateIdea z-depth-2''>");
        var outArr = [out0, out1, out2, out3, out4, out5, out6, out7];

        var randomImg = Math.floor(Math.random() * outArr.length);
        console.log(outArr[randomImg]);
        $("#randomIdea").html(outArr[randomImg]);
    });

    //function to scroll page when something is clicked
    function scroll(howFar) {
        var y = $(window).scrollTop();
        $('html, body').animate({ scrollTop: y + howFar });
    }

    //function to get zip code and foursquare API call for restaurants
    function nightOutSugg(price) {
        //get zip code from user
        var zipInput = $("#enterZip").val();

        //if zip code is not a number
        if (isNaN(zipInput)) {
            swal("Oops! Please enter your 5 digit zip code.");
        }
        //else call yelp and movie API's and display movie and dinner suggestions
        else {
            scroll(800);

            //append 'suggestion' titles to div
            var dinnerSugg = $(".dinnerOpt").append("<h4 class='center-align'>Dinner Suggestions</h4>");
            var movieSugg = $(".movieOpt").append("<h4 class='center-align'>Movie Suggestions</h4>");

            //yelp API call
            $.ajax({
                url: "https://laroyc6tsc.execute-api.us-east-1.amazonaws.com/Test/yelpbusinesssearch?zipCode=" + zipInput + "&budget=" + price,
                method: "GET"
            }).done(function (res) {

                //for loop to go through api's jsons array
                for (var x = 0; x < res.body.length; x++) {
                    var restName = res.body[x].name;
                    var restAdd1 = res.body[x].location.display_address[0];
                    var restAdd2 = res.body[x].location.display_address[1];
                    var restRating = res.body[x].rating;

                    //append restaurant name, address and ratings to dinner suggestion div
                    dinnerSugg.append("<hr><h6>" + restName + "</h6><p>" + restAdd1 + "</p><p>" + restAdd2 + "</p><p>Yelp Rating: " + restRating + " out of 5</p>");
                }
            })

            //movie API call
            $.ajax({
                url: movieURL,
                method: "GET"
            }).done(function (response) {
                //for loop to go through api's jsons array
                for (var x = 0; x < response.results.length; x++) {
                    var releaseDate = moment(response.results[x].release_date);
                    var custRating = response.results[x].vote_average;
                    var movieListing = response.results[x].original_title;
                    var popularity = response.results[x].popularity;
                    var currYear = moment().format('YYYY');

                    //if the release date is no more than 3 weeks ago, high customer rating and popular
                    if (moment().diff(releaseDate, 'weeks') <= 3 && custRating >= 6 && popularity >= 40) {
                        //omdb api call to get movie details
                        $.ajax({
                            url: 'https://www.omdbapi.com/?t=' + movieListing + '&type=movie&r=json&y=' + currYear + '&apikey=65c38f10',
                            method: 'GET'
                        }).done(function (response2) {
                            var movRating = response2.Rated;
                            var imdbRating = response2.imdbRating;
                            var genre = response2.Genre;
                            var movName = response2.Title;

                            //append movie name, rating, imdb rating and genre to movie suggestion div
                            movieSugg.append("<hr><h6>" + movName + "</h6></p>Rated: " + movRating + "</p><p>IMDB Rating: " + imdbRating + " out of 10</p><p>Genre: " + genre + "<p>");
                        })
                    }
                }
            })
        }
    }
});