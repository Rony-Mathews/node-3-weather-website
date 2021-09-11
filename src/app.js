const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const getWeather = require("./utils/weatherApi");

const app = express();
const port = process.env.PORT || 3000;
const publidDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publidDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Creep"
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Rony Mathews" });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name: "Radiohead" });
});

app.get("/weather", (req, res) => {
  if(!req.query.address)
    return res.send({ error: "'address' query parameter is required!" });

  const { address: location } = req.query;
  geocode(location, (error, {place_name, lat, long} = {}) => {
    if(error){
      return res.send({
        message: "Something went wrong while invoking geocode api",
        error
      });
    }

    getWeather(lat, long, (weatherErr, weatherResp) => {
      if(weatherErr){
        return res.send({
          message: "Something went wrong while invoking geocode api",
          error
        });
      }

      res.send({
        searchText: location,
        location: place_name,
        forecast: weatherResp.description + " - It is currently " + weatherResp.temperature + ' degrees out. It feels like ' + weatherResp.feelslike + ' degrees out! The humidity is ' + weatherResp.humidity + "%."
      });
    });
  });

});

app.get("/products", (req, res) => {
  if(!req.query.search) {
    return res.send({ error: "You must provide 'search'." });
  }
  res.send({ products: "" });
});

app.get("/help/*", (req, res) => {
  res.render("404-not-found", { title: "404 not found", message: "Help article not found", name: "Rony Mathews" });
});

app.get("*", (req, res) => {
  res.render("404-not-found", { title: "404 not found", message: "Page not found", name: "Rony Mathews" });
});

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
