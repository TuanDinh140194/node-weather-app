const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tuan Dinh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help Page",
    name: "Tuan Dinh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tuan Dinh",
  });
});

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide the address'
    })
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }

      res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address,
      })
    });
  });

  
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tuan Dinh",
    errorMessage: "Help article not found."
  })
})

app.get ("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tuan Dinh",
    errorMessage: "Page not found"
  })
});

app.listen(port, () => {
  console.log("Port " + port + " is running");
});
