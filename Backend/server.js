const express = require('express');
const path = require('path');
const dbLogic = require('./login');

const app = express();
app.use(express.urlencoded({ extended: true }));
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
        res.redirect('/Frontend/html/login.html');
    });
});

app.listen(3000, () => console.log("Server pornit pe portul 3000"));

// ... restul codului tău de sus ...

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
        // Aici l-ai putea trimite la o pagină de profil sau dashboard
        res.redirect('/Frontend/html/index.html');
    });
});