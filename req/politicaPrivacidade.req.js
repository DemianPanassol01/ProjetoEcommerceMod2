const express = require('express');
const router = express.Router();

router.get('/politica-de-privacidade', (req, res) => {

    res.render('./pages/politicaPrivacidade.ejs');
});

module.exports = router;