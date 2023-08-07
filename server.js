const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const listEndpoints = require('express-list-endpoints');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.use(express.json());

const sess = {
  name:"monster", //name of cookie
  secret: process.env.SECRET, //secret that makes the cookies effective
  cookie: {
    maxAge: 1000 * 60 * 60, //cookie expires after 1 hour
    secure: false, //set to true if using https
    httpOnly: true, //true means cookie is not accessible via front end JS
  },
  resave: false, //resave cookie even if no changes made
  saveUninitialized: false, //don't save cookie if there is no data to store gdpr laws user has to give permission
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
console.log(listEndpoints(app));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});