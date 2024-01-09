const request = require("request");

const geocode = (address, callback) => {
    const url =
      "https://api.geoapify.com/v1/geocode/search?text=" +
      encodeURIComponent(address) +
      "&apiKey=c5dc2dc4bd494e5b8be28d972041b10a&limit=1";
    request({ url: url, json: true }, (error, response) => {
      if (error) {
        callback("Unable to connect to location service!", undefined);
      } else if (response.body.features.length === 0) {
        callback("Unable to find location. Try another search", undefined);
      } else {
        callback(undefined, {
          latitude: response.body.features[0].properties.lat,
          longitude: response.body.features[0].properties.lon,
          location: response.body.features[0].properties.formatted,
        });
      }
    });
  };

  module.exports = geocode;