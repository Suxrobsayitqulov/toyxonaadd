// Express appni boshlab olish
const express = require("express");
const app = express();
const cors = require("cors");
const toyxona =require("./routes/toyxonaRouter")
const user = require("./routes/useRouter");
// mongooseni yuklab olish
const mongoose = require("mongoose");

// Dotenv orqali port numberni olib olish
require("dotenv").config();
const port = process.env.PORT;

// middleware
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

// routers
const toyxonaRouter=require("./routes/toyxonaRouter")
app.use("/toyxona",toyxonaRouter)
app.use("/user",user)

// Databasega ulanish
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server ${port} portda ishga tushdi va MongoDB ga ulandi`);
    });
  })
  .catch((err) => console.log(err));
