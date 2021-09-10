const request = require("request");

const geocode = (address, callback) => {
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoicm9ueW1hdGhld3MiLCJhIjoiY2tzdnZtdXhjMXR1bTMyb2RuMHk5bXA1byJ9.jkLmAkIFbsOHGarMMUEjCQ&limit=1";

  request({ url, json: true }, (error, {body}) => {
    if(error)
      callback("Unable to get in touch with location services!");
    else if(body.features.length === 0)
      callback("Unable to find any locations matching your search terms");
    else{
      callback(undefined, {
        place_name: body.features[0].place_name,
        lat: body.features[0].center[1],
        long: body.features[0].center[0]
      });
    }
  });
};

module.exports = geocode;
