const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

const scoreSubmissionLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5
});

app.use(limiter);
app.use(express.json());
app.use(express.static('public'));


const db = new sqlite3.Database('./leaderboard.db', (err) => {
    if(err){
        console.log('Error opening database: ' + err.message);
    }else{
        console.log("Connected to SQLite database");
        initializeDatabase();
    }
})

const initializeDatabase = () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS scores (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL CHECK(length(name) > 0 AND length(name) <= 20),
            score INTEGER NOT NULL CHECK(score >= 0),
            date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    db.run(createTableQuery, (err) => {
        if(err){
            console.log('Error creating table: ' + err.message);
        }else{
            console.log('Table created');
        }
    });
}


app.get('/api/leaderboard', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const query = 'SELECT id, name, score, date FROM scores ORDER BY score DESC, date ASC LIMIT ?';

    db.all(query, [limit], (err, rows) => {
        if (err){
            console.log('Error fetching scores: ' + err);
            res.status(500).json({error: 'Failed to fetch leaderboard'});
        }else{
            res.json({scores: rows});
        }
    });
});


app.post('/api/leaderboard', scoreSubmissionLimiter, (req, res) => {
    const { name, score } = req.body;

    if (!name || typeof score !== 'number' || score < 0) {
        return res.status(400).json({ error: 'Invalid name or score' });
    }

    if (name.length > 20) {
        return res.status(400).json({ error: 'Name too long' });
    }

    const query = 'INSERT INTO scores (name, score) VALUES (?, ?)';
    
    db.run(query, [name.trim(), score], function(err) {
        if (err) {
            console.error('Error saving score:', err);
            res.status(500).json({ error: 'Failed to save score' });
        } else {
            res.status(201).json({
                id: this.lastID,
                name: name.trim(),
                score: score,
                message: 'Score saved successfully'
            });
        }
    });
});


app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Your game is available at http://localhost:${PORT}`);
});