const express = require("express");
const app = express();
const port = 3000;

let users = [{
    name: "prakash",
    kidneys: [{
        health: false
    }, {
        health: true
    }]
}];

app.use(express.json());

// Root route
app.get("/", (req, res) => {
    res.send("Welcome to the Kidney Health API");
});

// Get user kidney health summary
app.get("/user", (req, res) => {
    const prakashKidneys = users[0].kidneys;

    let numberOfHealthyKidneys = prakashKidneys.filter(kidney => kidney.health).length;
    const numberOfUnhealthyKidneys = prakashKidneys.length - numberOfHealthyKidneys;

    res.json({
        numberOfKidneys: prakashKidneys.length,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

// Add a new kidney
app.post("/user", (req, res) => {
    const { isHealthy } = req.body;

    if (typeof isHealthy !== "boolean") {
        return res.status(400).json({ msg: "Invalid input, isHealthy should be a boolean" });
    }

    users[0].kidneys.push({ health: isHealthy });
    res.json({ msg: "Kidney added!" });
});

// Update a kidney's health status
app.put("/user", (req, res) => {
    const { index, isHealthy } = req.body;

    if (typeof index !== "number" || typeof isHealthy !== "boolean") {
        return res.status(400).json({ msg: "Invalid input, index should be a number and isHealthy should be a boolean" });
    }

    if (index >= 0 && index < users[0].kidneys.length) {
        users[0].kidneys[index].health = isHealthy;
        res.json({ msg: "Kidney health status updated!" });
    } else {
        res.status(400).json({ msg: "Invalid index" });
    }
});

// Remove a kidney
app.delete("/user", (req, res) => {
    const { index } = req.body;

    if (typeof index !== "number") {
        return res.status(400).json({ msg: "Invalid input, index should be a number" });
    }

    if (index >= 0 && index < users[0].kidneys.length) {
        users[0].kidneys.splice(index, 1);
        res.json({ msg: "Kidney removed!" });
    } else {
        res.status(400).json({ msg: "Invalid index" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
