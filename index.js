const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const btoa = require('btoa');
const cron = require('node-cron');
require('dotenv').config();
const axios = require('axios');
const parseString = require('xml2js').parseString;
const qs = require('qs');
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
// app.use(cors({
//   origin: 'https://www.nadimama.com'
// }));
const { createProxyMiddleware } = require('http-proxy-middleware');


// app.use(cors());
// app.options('*', cors())

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.header('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.header('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});



//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
// .connect(config.database, { useNewUrlParser: true })
mongoose
.connect('mongodb+srv://joe:MontBlanc7098!!@cluster0-9hdl4.mongodb.net/authapp?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    // console.log("Database is connected");
  })
  .catch(err => {
    // console.log({ database_error: err });
  });


console.log(cors)



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan("dev")); // configire morgan

app.get("/", (req, res) => {
  // res.send(JSON.stringify({ Hello: 'medddaeeen solider'}));
  // res.send(cors);
 res.send(JSON.stringify({ Hello: 'dont give up on me'}));
});

const userRoutes = require("./api/user/route/user"); //bring in our user routes
app.use("/user", userRoutes);

const productRoutes = require("./api/product/route/product"); //bring in our product routes
app.use("/product", productRoutes);

const tockRoutes = require("./api/tock/route/tock"); //bring in our tock routes

app.use("/tock", tockRoutes);


// app.use('/api', createProxyMiddleware({ target: 'http://young-hamlet-03679.herokuapp.com/', changeOrigin: true }));


app.listen(PORT, () => {
  // console.log(`App is running on ${PORT}`);
});

// show all items
// cron.schedule('0-59/5 * * * * *', () => {
//   // tockController.logMongoTock()
// });





