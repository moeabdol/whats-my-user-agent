const express = require("express");
const path    = require("path");
const hbs     = require("express-handlebars");

const app = express();

app.set("port", process.env.PORT || 3000);

app.engine("hbs", hbs({
  extname: "hbs"
}));
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  const userAgent = req.headers["user-agent"] || "none";
  if (req.accepts("html")) {
    res.render("index", { userAgent: userAgent });
  } else {
    res.type("text");
    res.send(userAgent);
  }
});

if (!module.parent) {
  app.listen(app.get("port"), () => {
    console.log("App started on port " + app.get("port"));
  });
}

module.exports = app;
