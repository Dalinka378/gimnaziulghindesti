const express = require('express');
const path = require('path');
const dbLogic = require('./login');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Add CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use('/Frontend', express.static(path.join(__dirname, '../Frontend')));

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Folosim funcția din celălalt fișier
    dbLogic.registerUser(email, password, (err, userId) => {
        if (err) {
            console.log("Eroare:", err.message);
            return res.status(500).send("Eroare la înregistrare.");
        }
        console.log("Utilizator salvat cu ID:", userId);
        res.json({ success: true, message: "Utilizator înregistrat cu succes" });
    });
});

app.listen(3000, () => console.log("Server pornit pe portul 3000"));

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    dbLogic.loginUser(email, password, (err, user) => {
        if (err) {
            console.error("Eroare server:", err.message);
            return res.status(500).send("Eroare la procesarea cererii.");
        }

        if (!user) {
            // Nu spunem exact dacă e-mailul sau parola e greșită (securitate!)
            return res.status(401).send("Email sau parolă incorectă.");
        }

        console.log("Utilizator logat cu succes:", user.email);
        // Return JSON instead of redirecting
        res.json({ success: true, message: "Logare reușită", user: user });
    });
});