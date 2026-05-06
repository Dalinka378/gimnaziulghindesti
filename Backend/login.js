const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'scoala.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilizatori (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nume TEXT,
        email TEXT UNIQUE,
        parola TEXT
    )`);
});

async function registerUser(nume, email, password, callback) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO utilizatori (nume, email, parola) VALUES (?, ?, ?)`;
        db.run(query, [nume, email, hashedPassword], function(err) {
            callback(err, this ? this.lastID : null);
        });
    } catch (error) {
        callback(error);
    }
}

// Asigură-te că exportul de jos este curat, fără semnele <<<<<<
module.exports = { registerUser };