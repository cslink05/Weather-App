window.addEventListener("load", () => {
    let lon;
    let lat;
    let city = document.querySelector('#city');
    let temperature = document.querySelector('.temperature');
    let weatherIcon = document.querySelector('#weather-icon');
    let unitChange = document.querySelector('#unit-change');
    let tempUnit = document.querySelector('.temp-unit');
    let flavorText = document.querySelector('.flavor-text');
    let clockHour = document.querySelector('#hour');
    let clockMinute = document.querySelector('#minute');

    function clock() {
        const fullDate = new Date();
        let hours = fullDate.getHours();
        let mins = fullDate.getMinutes();

        if (hours < 10) {
            hours = "0" + hours;
        }

        if (mins < 10) {
            mins = "0" + mins;
        }

        clockHour.innerHTML = hours;
        clockMinute.innerHTML = ": " + mins;
    }
    clock();
    setInterval(clock, 10000);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c0cede448139b057a56d854d16c6a7ca`;

            fetch(api)
                .then(response => {
                    return response.json();
                    
                })
                .then(data => {
                    const { id } = data.weather[0];
                    city.textContent = data.name;
                
                    temperature.innerHTML = Math.floor(data.main.temp -273.15) + '&deg;';
                    tempUnit.innerHTML = "C";
                    
                    unitChange.addEventListener("click", () => {
                        if (tempUnit.textContent === "C") {
                           temperature.innerHTML = Math.floor((data.main.temp - 273.15) * 9/5 + 32) + '&deg;';
                           tempUnit.innerHTML = "F";
                           unitChange.innerHTML = "&deg;C"; 
                        } else {
                            temperature.innerHTML = Math.floor(data.main.temp - 273.15) +'&deg;';
                            tempUnit.innerHTML = "C";
                            unitChange.innerHTML = "&deg;F";
                        }
                    });

                    function weatherIcons() {
                        if (id >= 200 && id <= 232) {
                            weatherIcon.src = "icons/animated/thunder.svg";
                            flavorText.textContent = "be careful out there";
                            document.body.style.backgroundImage = "url(./img/rainy-day.jpg)";
                        } else if (id >= 300 && id <= 321) {
                            if (clockHour.innerHTML >= 6 && clockHour.innerHTML <= 17) {
                                weatherIcon.src = "icons/animated/rainy-2.svg";
                                flavorText.textContent = "might need an umbrella out there today";
                                document.body.style.backgroundImage = "url(./img/rainy-day.jpg)";
                            } else {
                                weatherIcon.src = "icons/animated/rainy-4.svg";
                                flavorText.textContent = "better bring an umbrella tonight";
                                document.body.style.backgroundImage = "url(./img/rainy-night.jpg)";
                            }
                        } else if (id >= 500 && id <= 531) {
                            if (clockHour.innerHTML >= 6 && clockHour.innerHTML <= 17) {
                                weatherIcon.src = "icons/animated/rainy-1.svg";
                                flavorText.textContent = "it's wet out there today";
                                document.body.style.backgroundImage = "url(./img/rainy-day.jpg)";
                            } else {
                                weatherIcon.src = "icons/animated/rainy-7.svg";
                                flavorText.textContent = "a dark and stormy night";
                                document.body.style.backgroundImage = "url(./img/rainy-night.jpg)";
                            }
                        } else if (id >= 600 && id <= 622) {
                            if (clockHour.innerHTML >= 6 && clockHour.innerHTML <= 17) {
                                weatherIcon.src = "icons/animated/snowy-1.svg";
                                flavorText.textContent = "don't forget your coat";
                                document.body.style.backgroundImage = "url(./img/snowy-day.jpg)";
                            } else {
                                weatherIcon.src = "icons/animated/snowy-6.svg";
                                flavorText.textContent = "roads might be slick tonight";
                                document.body.style.backgroundImage = "url(./img/snowy-night.jpg)";
                            }
                        } else if (id == 800) {
                            if (clockHour.innerHTML >= 6 && clockHour.innerHTML <= 17) {
                                weatherIcon.src = "icons/animated/day.svg";
                                flavorText.textContent ="another bright and shiny day";
                                document.body.style.backgroundImage = "url(./img/sunny-day.jpg)";
                            } else {
                                weatherIcon.src = "icons/animated/night.svg";
                                flavorText.textContent = "a calm, relaxing night";
                                document.body.style.backgroundImage = "url(./img/clear-night.jpg)";
                            }
                        } else if (id >= 801 && id <=803) {
                            if (clockHour.innerHTML >= 6 && clockHour.innerHTML <= 17) {
                                weatherIcon.src = "icons/animated/cloudy-day-1.svg";
                                flavorText.textContent = "a few clouds floating around today";
                                document.body.style.backgroundImage = "url(./img/cloudy-day.jpg)";
                            } else {
                                weatherIcon.src = "icons/animated/cloudy-night-2.svg";
                                flavorText.textContent = "a quiet, cloudy night";
                                document.body.style.backgroundImage = "url(./img/cloudy-night.jpg)";
                            }
                        } else if (id == 804) {
                            weatherIcon.src = "icons/animated/cloudy.svg";
                            flavorText.textContent = "gray doesn't have to be gloomy";
                            document.body.style.backgroundImage = "url(./img/cloudy-day.jpg)";
                        } else {
                            weatherIcon.src = "icons/animated/day.svg";
                            flavorText.textContent = "have a lovely day";
                            document.body.style.backgroundImage = "url(./img/sunny-day.jpg)";
                        }
                    }
                    weatherIcons();
                });   
        })
    }
});