const express = require('express');
const router = express.Router();

router.get('/sucesso', (req, res) => {

    res.render('./pages/sucesso.ejs');
});

module.exports = router;