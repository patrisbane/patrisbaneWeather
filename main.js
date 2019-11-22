// Foursquare API Info
const clientId = 'MJWOLTEGAC2SKWOC3KIUL0UAIJHEJBUUDCEKPVZ5H445VO41';
const clientSecret = 'WHSPFXB0OEOAM2OAUQM42KPSATBNXQM1T21AJYPTKLAQNFE1';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '9b3988515cfe07755b26d68a5604122b';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4"), $("#venue5")];
const $weatherDiv = $("#weather1");
const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Add AJAX functions here:
const getVenues = async () => {
    const city = $input.val();
    const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20191121`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
            return venues;

        }
    } catch(error) {
        console.log(error);
    }
}

const getForecast = async () => {
    const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        }
    } catch(error) {
        console.log(error);
    }
}


// Render functions
const renderVenues = (venues) => {
    for (let i = 0; i < $venueDivs.length; i++) {
        const $venue = $venueDivs[i];
        while (true) {
            let num = Math.floor(Math.random() * venues.length);
            if (venues[num] != null) {
                var venue = venues[num];
                const venueIcon = venue.categories[0].icon;
                const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
                let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
                $venue.append(venueContent);
                venues[num] = null;
                console.log(venue);
                break;
            }
        }
    }
    $destination.append(`<h2>${venue.location.city}</h2>`);
}

const renderForecast = (day) => {
    // Add your code here:
    let weatherContent = createWeatherHTML(day);
    $weatherDiv.append(weatherContent);
};

const executeSearch = () => {
    $venueDivs.forEach(venue => venue.empty());
    $weatherDiv.empty();
    $destination.empty();
    $container.css("visibility", "visible");
    getVenues().then(venues => renderVenues(venues));
    getForecast().then(day => renderForecast(day));
    return false;
};

$submit.click(executeSearch)