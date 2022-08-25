const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const bcrypt = require('bcryptjs');
//inits app
const app = express();

// Load env variables
dotenv.config({ path: './config/config.env' });

// Body Parser
app.use(express.json());
//Compress all routes
app.use(compression());
app.use(helmet());
//Cors

app.use(
  cors({
    origin: 'http:localhost:3000',
    preflightContinue: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  next();
});
//Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // console.log('passwords match!');
          return done(null, user);
        } else {
          return done(null, false, { message: 'Incorrect password' });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  if (req.user) res.locals.user = req.user;
  next();
});

app.post(
  '/user/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user',
  })
);
app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err + 'not logged out');
      return next(err);
    }
    console.log('Logged out');
    res.redirect('/');
  });
});
app.get('/', (req, res, next) => {
  // if (res.locals.user) console.log(res.locals.user + 'FUCK');
  res.status(200).json({ foo: 'bar' });
});

//ROUTES
const itemRoute = require('./routes/item');
app.use('/item', itemRoute);

const itemInstanceRoute = require('./routes/itemInstance');
app.use('/iteminstance', itemInstanceRoute);

//USER
const userRoute = require('./routes/user');
app.use('/user', userRoute);

const categoryRoute = require('./routes/category');
app.use('/category', categoryRoute);

const startServer = async () => {
  const PORT = process.env.PORT;
  const portString = `${PORT}`.brightYellow;
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(
      ` Server running in ${process.env.NODE_ENV} , App listening on port ${portString}!`
        .yellow.bold
    );
  });
};
startServer();
