const { json } = require('express');
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./database/connection')
const app = express()
const posts = require('./routes/posts');
const users = require('./routes/users');
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const cookieParser = require("cookie-parser");

// middleware
var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/v1/posts', posts);
app.use("/api/v1/user", users);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(notFound);
app.use(errorHandlerMiddleware);


const port = 3000


const start = async () => {
    try {
        connectDB.sequelize.sync();
        app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };

start();