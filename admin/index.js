import express from "express";
import bodyParser from "body-parser";
import pkg from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managmentRoutes from "./routes/managment.js";
import salesRoutes from "./routes/sales.js";

/* DATA IMPORTS */
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";
/* CONFIGURATION */
const { urlencoded } = pkg;
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(urlencoded({ extended: false }));
app.use(cors());

/* ROUTES*/
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/manegment", managmentRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const URL = process.env.MONGODB;
const PORT = process.env.PORT || 9000;
mongoose.set("strictQuery", true);
mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server staring at ${PORT}`);
    });
    // User.insertMany(dataUser);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
  })
  .catch((error) => {
    console.log(`${error} did not connect `);
  });
