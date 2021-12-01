const express = require('express');
const router = express.Router();

router.get('/politica-de-troca', (req, res) => {

    res.render('./pages/politicaTroca.ejs');
});

module.exports = router;