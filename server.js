const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuration de la connexion (À remplir avec tes infos Alwaysdata)
const db = mysql.createConnection({
    host: 'mysql-telliezsulivan.alwaysdata.net', // Regarde sur ton panel Alwaysdata pour confirmer l'hôte
    user: 'telliezsulivan',                     // Ton nom d'utilisateur Alwaysdata
    password: 'Telliez.2005',                // Le mot de passe de ton compte ou de la base
    database: 'telliezsulivan_db'               // Le nom exact que tu as cliqué à gauche dans phpMyAdmin
});

db.connect(err => {
    if (err) throw err;
    console.log('Connecté à MySQL !');
});

app.use(express.json());
app.use(express.static('public'));

// 3. ROUTES

// Route principale : envoie le fichier HTML au navigateur
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route API : va chercher un défi au hasard dans le SQL
app.get('/api/challenge', (req, res) => {
    const sql = "SELECT * FROM challenges ORDER BY RAND() LIMIT 1";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erreur lors de la récupération du défi" });
        } else {
            res.json(result[0]); // Envoie le défi trouvé au format JSON
        }
    });
});

// 4. Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    console.log(`📂 Dossier de travail : ${__dirname}`);
});