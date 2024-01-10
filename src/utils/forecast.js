const request = require("request");
const weatherCode = require("./weatherCode.json");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.tomorrow.io/v4/weather/realtime?location="+ latitude + "," + longitude + "&apikey=HCew1mkilCj8p6v8x4VrKr8UxEqVbi2Y&units=imperial";
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else {
      try {
        const data = response.body;
        const description = weatherCode.weatherCodeFullDay[data.data.values.weatherCode];
        callback(undefined, 
          `${description} throughout the day. It is currently ${data.data.values.temperature} degrees out. There is a ${data.data.values.precipitationProbability} % chance of rain.\n` + 
          `The humidity is ${data.data.values.humidity}%.`

        );
      } catch (error) {
        callback(response.body.type, undefined);
      }
    }
  });
};

module.exports = forecast;