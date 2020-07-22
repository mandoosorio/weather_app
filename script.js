$(document).ready(function() {
        
    var searchArray = [];

    renderTime();
    renderLastSearch();
    
    function renderLastSearch() {
        retrieveHistory();
        let lastSearch = $("#city-search").val(searchArray[searchArray.length - 1]);
        retrieveWeather();
        $("#city-search").val("");
    }

    function renderTime() {
        $("#date").text(moment().format("MMMM Do YYYY"));
        $("#second-date").text(moment().add(1, "day").format("MM/D/YY"));
        $("#third-date").text(moment().add(2, "day").format("MM/D/YY"));
        $("#fourth-date").text(moment().add(3, "day").format("MM/D/YY"));
        $("#fifth-date").text(moment().add(4, "day").format("MM/D/YY"));
        $("#sixth-date").text(moment().add(5, "day").format("MM/D/YY"));
    }

    function renderHistory() {
        for (var i = 0; i < searchArray.length; i++) {
            let histBut = $("<button></button");
            histBut.addClass("buttons");
            $("#button-list").prepend(histBut);
            histBut.text(searchArray[i]);
            histBut.val(searchArray[i]);
        }
    }

    function retrieveHistory() {
        var hist = JSON.parse(localStorage.getItem("history"));
        if (hist !== null) {
            searchArray = hist;
        }
        renderHistory();
    }

    function storeHistory() {
        localStorage.setItem("history", JSON.stringify(searchArray));
    }

    $("#search").on("click", function(event) {
        event.preventDefault();
        var cityName = $("#city-search").val();
        if (cityName.trim() === "") {
            return;
        } else if (searchArray.includes(cityName)) {
            retrieveWeather();
        } else {
            searchArray.push($("#city-search").val());
            console.log(searchArray);
            let newBut = $("<button></button");
            newBut.addClass("buttons");
            $("#button-list").prepend(newBut);
            newBut.text(cityName);
            newBut.val(cityName);
            retrieveWeather();
        }

        storeHistory();
        $("#city-search").val("");
    });

    var input = $("#city-search");
    input.on("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#search").click();
        }
    });

    function retrieveWeather() {
        var APIKey = "55ac09963b57fe74f0f75836a19a3789";
        var cityName = $("#city-search").val();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;

        $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            $('.city').text(response.name);

            var lon = response.coord.lon;
            var lat = response.coord.lat;
            var futureURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + APIKey;

            $.ajax({
                url: futureURL,
                method: "GET"
            }).then(function(response) {
                let tempF = ((response.current.temp - 273) * 1.8) + 32;
                $('.wind').text(`Wind Speed: ${response.current.wind_speed}mph`);
                $('.humidity').text(`Humidity: ${response.current.humidity}%`);
                $('.tempF').text(`Temp: ${tempF.toFixed(2)}\xB0`);

                var temp2 = (((response.daily[1].temp.max - 273) * 1.8) + 32);
                $("#day-two-temp").text(temp2.toFixed(2) + "\xB0");
                var humid2 = response.daily[1].humidity;
                $("#day-two-humidity").text(humid2 + "%");

                var temp3 = (((response.daily[2].temp.max - 273) * 1.8) + 32);
                $("#day-three-temp").text(temp3.toFixed(2) + "\xB0");
                var humid3 = response.daily[2].humidity;
                $("#day-three-humidity").text(humid3 + "%");
                
                var temp4 = (((response.daily[3].temp.max - 273) * 1.8) + 32);
                $("#day-four-temp").text(temp4.toFixed(2) + "\xB0");
                var humid4 = response.daily[3].humidity;
                $("#day-four-humidity").text(humid4 + "%");  

                var temp5 = (((response.daily[4].temp.max - 273) * 1.8) + 32);
                $("#day-five-temp").text(temp5.toFixed(2) + "\xB0");
                var humid5 = response.daily[4].humidity;
                $("#day-five-humidity").text(humid5 + "%"); 

                var temp6 = (((response.daily[5].temp.max - 273) * 1.8) + 32);
                $("#day-six-temp").text(temp6.toFixed(2) + "\xB0");
                var humid6 = response.daily[5].humidity;
                $("#day-six-humidity").text(humid6 + "%");

                var uvIndex = response.current.uvi;
                $(".index").text(`${uvIndex}`);
                if (uvIndex >= 0 && uvIndex < 3) {
                    $(".index").css("background-color", "green");
                } else if (uvIndex >= 3 && uvIndex < 6) {
                    $(".index").css("background-color", "yellow");
                } else if (uvIndex >= 6 && uvIndex < 8) {
                    $(".index").css("background-color", "orange");
                } else if (uvIndex >= 8) {
                    $(".index").css("background-color", "red");
                }

                

                for (let i = 0; i < 6; i++) {
                    let icons = response.daily[i].weather[0].icon;
                    let iconURL = "http://openweathermap.org/img/wn/" + icons + "@2x.png";
                    $("#icon" + (i + 1)).attr("src", iconURL);
                }
            });
        });
    }

    $("body").on("click", ".buttons", function() {
        let butVal = event.target.value;
        console.log(event.target.value);
        let buttonClicked = $("#city-search").val(butVal);
        retrieveWeather();
        $("#city-search").val("");
        // let index = searchArray.indexOf(butVal);
        // console.log(index);
        // if (index <= 0) {
        //     searchArray.splice(index, 1);
        //     console.log(searchArray);
        //     searchArray.push(butVal);
        //     console.log(searchArray);
        //     storeHistory;
        // } else {
        // searchArray.splice(index, index);
        // console.log(searchArray);
        // searchArray.push(butVal);
        // console.log(searchArray);
        // $("#city-search").val("");
        // storeHistory;
        // }
    });
    
});