const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crossUnblocker = require("./middileware/cros-unblocker");
const path = require("path");
require('dotenv').config();

// Cross Unblocked File..
const cors = require("cors");
const errorHandler = require("./middileware/error-handler");

// Swagger

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pump Management API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./docs/*.yaml'], // files containing annotations
};

const swaggerSpec = swaggerJsdoc(options);

/**
 *  Router File Import
 */
const adminRoutes = require("./routes/admin");
const pumpRoutes = require("./routes/pump");
const testRoutes = require("./routes/testHistory");

const app = express();

app.use(crossUnblocker.allowCross);
app.use(cors());
app.options("*", cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use("/api/admin", adminRoutes);
app.use("/api/pump", pumpRoutes);
app.use("/api/test-history", testRoutes);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use(errorHandler.route);
app.use(errorHandler.next);


mongoose.set('strictQuery', false);
mongoose
  .connect(
    // `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:27017/${process.env.DB_NAME}?authSource=${process.env.AUTH_SOURCE}`,
    // `mongodb://0.0.0.0:27017/${process.env.DB_NAME}`,
    `mongodb+srv://sani:${process.env.DB_PASSWORD}@cluster0.ngr6z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,

    // {
      // useNewUrlParser: true,
      //  useFindAndModify: false,
      // useUnifiedTopology: true,
      //  useCreateIndex: true
    // }
  )
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is running at port:${port}`));
  })
  .catch((err) => {
    console.error("Oops! Could not connect to mongoDB Cluster0", err);
  });
