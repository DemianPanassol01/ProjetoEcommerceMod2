const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./pages/inicio.ejs');
});

module.exports = router;