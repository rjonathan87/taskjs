const { Weather } = require('./Weather');
const { UI } = require('./UI');

const weather = new Weather('London', 'uk');
const ui = new UI();

require('./index.css');


async function fetchWeather(){
    const data = await weather.getWeather();
    //console.log(data);
    ui.render(data);
}

document.addEventListener('DOMContentLoaded', fetchWeather);