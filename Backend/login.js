const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, 'scoala.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS utilizatori (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE,
        parola TEXT
    )`);
});

async function registerUser(email, password, callback) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO utilizatori (email, parola) VALUES (?, ?)`;
        db.run(query, [email, hashedPassword], function (err) {
            callback(err, this ? this.lastID : null);
        });
    } catch (error) {
        callback(error);
    }
}

function loginUser(email, password, callback) {
    const query = `SELECT id, email, parola FROM utilizatori WHERE email = ?`;
    db.get(query, [email], async (err, user) => {
        if (err) {
            return callback(err);
        }

        if (!user) {
            return callback(null, null);
        }

        try {
            const passwordMatch = await bcrypt.compare(password, user.parola);
            if (passwordMatch) {
                callback(null, { id: user.id, email: user.email });
            } else {
                callback(null, null);
            }
        } catch (error) {
            callback(error);
        }
    });
}

module.exports = { registerUser, loginUser };