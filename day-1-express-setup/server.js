const express = require("express");
const app = express();
const testRoutes = require("./routes/testRoutes");
const logger = require("./middleware/logger");
const PORT = 5000;

app.use(logger);
app.use("/api/test", testRoutes);

app.get("/", (req, res) => {
    res.send("Server is running...");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});