const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
app.use(express.json());

const testRoutes = require("./routes/testRoutes");
app.use("/api/test", testRoutes);

//Error middleware LAST
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});