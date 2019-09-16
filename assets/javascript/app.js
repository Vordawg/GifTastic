var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chincilla", "hedgehog",
    "hermit crab", "gerbil", "pygmy goat", "chicken", "capybata",
    "teacup pig", "serval", "salamander", "frog"];

function setButtons() {
    $("#buttons").empty();

    for (var loop = 0; loop < animals.length; loop++) {

        var $button = $('<button style="margin-right: 5px">');

        $button.addClass("animal");
        $button.attr("data-name", animals[loop]);
        $button.text(animals[loop]);

        $("#buttons").append($button);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();

    var newAnimal = $("#animal-input").val().trim();

    if (newAnimal.length > 0 && animals.lastIndexOf(newAnimal) == -1) {
        animals.push(newAnimal);
        setButtons();
    }
});

function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=8Q14oFQ6SQyNme8uLSBwLWGSKhxyvUIB&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        if (results.length > 0) {

            var $gifRow = $('<div class="row">');

            for (var loop = 0; loop < results.length; loop++) {

                var rating = results[loop].rating;
                var imageAnimateName = results[loop].images.fixed_height.url;
                var imageStillName = results[loop].images.fixed_height_still.url;

                var $gifSpan = $('<span class="col-sm-4">');

                var $p = $('<p style="padding-top: 40px">').text("Rating: " + rating);

                var $animalImage = $("<img>");
                $animalImage.addClass("gif");
                $animalImage.attr("data-state", "still");
                $animalImage.attr("src", imageStillName);
                $animalImage.attr("data-still", imageStillName);
                $animalImage.attr("data-animate", imageAnimateName);

                $gifSpan.append($p);
                $gifSpan.append($animalImage);

                $gifRow.append($gifSpan);
            }

            $("#pictures").prepend($gifRow);
        }
    });
}

function setImageStatus() {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}

$(document).on("click", ".animal", displayAnimalInfo);

$(document).on("click", ".gif", setImageStatus);

window.onload = function () {
    setButtons();
};