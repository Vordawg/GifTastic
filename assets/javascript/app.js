var wrestlers = ["the undertaker", "hulk hogan", "john cena", "the rock", "steve austin", "triple h",
    "shawn michaels", "bret hart", "ric flair", "randy savage", "randy orton", "andre the giant",
    "bill goldgerg", "the ultimate warrior", "trish stratus", "becky lynch", "sasha banks",
    "alexa bliss", "beth phoenix", "charlotte flair", "edge"];

function setButtons() {
    $("#buttons").empty();

    for (var loop = 0; loop < wrestlers.length; loop++) {

        var $button = $('<button style="margin-right: 5px">');

        $button.addClass("wrestler");
        $button.attr("data-name", wrestlers[loop]);
        $button.text(wrestlers[loop]);

        $("#buttons").append($button);
    }
}

$("#add-wrestler").on("click", function (event) {
    event.preventDefault();

    var newwrestler = $("#wrestler-input").val().trim();
    newwrestler = newwrestler.toLowerCase();

    if (newwrestler.length > 0 && wrestlers.lastIndexOf(newwrestler) == -1) {
        wrestlers.push(newwrestler);
        setButtons();
        $("#wrestler-input").val("");
    }
});

function displaywrestlerInfo() {

    var wrestler = $(this).attr("data-name");
    wrestler = encodeURIComponent(wrestler);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + wrestler + "&api_key=8Q14oFQ6SQyNme8uLSBwLWGSKhxyvUIB&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var results = response.data;

        if (results.length > 0) {

            var $gifRow = $('<div class="row">');

            for (var loop = 0; loop < results.length; loop++) {

                var rating = results[loop].rating;
                rating = rating.toUpperCase();
                var imageAnimateName = results[loop].images.fixed_height.url;
                var imageStillName = results[loop].images.fixed_height_still.url;

                var $gifSpan = $('<span class="col-sm-4">');

                var $p = $('<p style="padding-top: 40px">').text("Rating: " + rating);

                var $wrestlerImage = $("<img>");
                $wrestlerImage.addClass("gif");
                $wrestlerImage.attr("data-state", "still");
                $wrestlerImage.attr("src", imageStillName);
                $wrestlerImage.attr("data-still", imageStillName);
                $wrestlerImage.attr("data-animate", imageAnimateName);

                $gifSpan.append($p);
                $gifSpan.append($wrestlerImage);

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

$(document).on("click", ".wrestler", displaywrestlerInfo);

$(document).on("click", ".gif", setImageStatus);

window.onload = function () {
    setButtons();
};