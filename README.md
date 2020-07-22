# weather_app
```
GIVEN a weather dashboard with form inputs
WHEN user searches for a city
THEN they are presented with current and future conditions for that city and that city is added to the search history
WHEN user views current weather conditions for that city
THEN they are presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN user views the UV index
THEN they are presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN user views future weather conditions for that city
THEN they are presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN user clicks on a city in the search history
THEN they are again presented with current and future conditions for that city
WHEN user opens the weather dashboard
THEN they are presented with the last searched city forecast
```

this app will use local storage to save their inputed data so we can render their search history
we also use an api to call for weather information
this app was used without bootstrap or a responsive pre-designed template so the app is made responsive through local css