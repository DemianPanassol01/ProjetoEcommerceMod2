const express = require('express');
const router = express.Router();
const nodeMailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

router.get('/contate-nos', (req, res) => {
    res.render('./pages/contato.ejs');
});

router.post('/contate-nos', (req, res) => {
    const { client } = req.body;

    const emailInfo = {
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject: "Mensagem de cliente",
        html: `
            <h2>Mensagem de cliente</h2>
            <ul>
                <li><p>Nome: ${client.name}</p></li>
                <li><p>Telefone: ${client.phone}</p></li>
                <li><p>E-mail: ${client.email}</p></li>
                <li><p>Mensagem do Cliente: ${client.message}</p></li>
            </ul>
        `
    };

    transporter.sendMail(emailInfo, error => {
        if (error) {
            req.flash('error', 'Algo deu errado. Por favor, tente novamente')
            return res.redirect("/contate-nos");
        };

        req.flash('success', 'Mensagem Enviada com Sucesso')
        res.redirect('/contate-nos');
    });
});

const transporter = nodeMailer.createTransport(new SMTPTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASSWORD,
    }
}));

module.exports = router;