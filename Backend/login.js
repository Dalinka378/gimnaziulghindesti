const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt'); // Biblioteca instalată adineaori

const dbPath = path.join(__dirname, 'scoala.db');
const db = new sqlite3.Database(dbPath);

// Tabelul rămâne la fel
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilizatori (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        parola TEXT
    )`);
});

// Funcție ASINCRONĂ pentru înregistrare
async function registerUser(email, password, callback) {
    try {
        // Transformăm parola în hash (10 este nivelul de securitate)
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO utilizatori (email, parola) VALUES (?, ?)`;
        db.run(query, [email, hashedPassword], function (err) {
            callback(err, this ? this.lastID : null);
        });
    } catch (error) {
        callback(error);
    }
}

// Funcție pentru login
async function loginUser(email, password, callback) {
    try {
        const query = `SELECT * FROM utilizatori WHERE email = ?`;
        db.get(query, [email], async (err, user) => {
            if (err) {
                return callback(err);
            }

            if (!user) {
                return callback(null, null);
            }

            // Compară parola introdusă cu hash-ul din bază
            const isPasswordValid = await bcrypt.compare(password, user.parola);

            if (isPasswordValid) {
                callback(null, user);
            } else {
                callback(null, null);
            }
        });
    } catch (error) {
        callback(error);
    }
}

module.exports = { registerUser, loginUser };