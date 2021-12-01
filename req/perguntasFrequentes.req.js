const express = require('express');
const router = express.Router();

router.get('/perguntas-frequentes', (req, res) => {

    res.render('./pages/perguntasFrequentes.ejs');
});

module.exports = router;