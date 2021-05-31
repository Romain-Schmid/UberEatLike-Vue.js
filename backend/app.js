const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Ton serveur est en route Beau Gosse !' }); 
});

module.exports = app;