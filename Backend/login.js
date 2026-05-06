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
        db.run(query, [email, hashedPassword], function(err) {
            callback(err, this ? this.lastID : null);
        });
    } catch (error) {
        callback(error);
    }
}

module.exports = { registerUser };xxx