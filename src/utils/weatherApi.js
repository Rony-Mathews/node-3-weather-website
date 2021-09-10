const request = require("request");

const getWeatherForLocation = (lat, long, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=96b358dcb155d1b00e42e645c8bb782a&query=" + lat + "," + long + "&units=f";
  request({ url, json: true }, (error, {body}) => {
    if(error)
      callback("Unable to connect to the Weather Service");
    else if(body.error)
      callback("Unable to find location");
    else
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike
      });
  });
};

module.exports = getWeatherForLocation;
