const getTest = (req, res) => {
    res.json({
        message: "Test route working",
    });
};

module.exports = {
    getTest,
};