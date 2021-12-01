require("dotenv").config();

const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const flash = require("connect-flash");
const session = require('cookie-session');

const carrinhoRouter = require('./req/carrinho.req');
const contatoRouter = require('./req/contato.req');
const inicioRouter = require('./req/inicio.req');
const perguntasFrequentesRouter = require('./req/perguntasFrequentes.req');
const politicaPrivacidadeRouter = require('./req/politicaPrivacidade.req');
const politicaTrocaRouter = require('./req/politicaTroca.req');
const sucessoRouter = require('./req/sucesso.req');
const Errors = require('./admin/Errors');

const app = express();

app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'", "http://*"],
                scriptSrc: ["'self'", "https://*"],
                imgSrc: ["'self'", "data:", "https://*"],
            },
        }
    })
);

app.use(
    session({
        name: 'Wb0c*5$g',
        maxAge: new Date(Date.now() + 259200000),
        keys: [
            'jCnKN8#82#k3S#oxtb&Xwmc96',
            'o9rH1*98f7$G%1P%T5nLV3G5P',
            '3pdFSyNn^SALJ^zo#Gzn2l1bU'
        ],
    })
);

app.use(flash());
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(carrinhoRouter);
app.use(contatoRouter);
app.use(inicioRouter);
app.use(perguntasFrequentesRouter);
app.use(politicaPrivacidadeRouter);
app.use(politicaTrocaRouter);
app.use(sucessoRouter);

app.all("*", (req, res, next) => {
    next(new Errors("Ops...página Não Encontrada", 404));
});

app.use((err, req, res, next) => {
    let {
        message,
        statusCode = 500
    } = err;
    res.status(statusCode).render("./error/error.ejs", {
        message,
        statusCode
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Ouvindo a porta ${port}`);
});