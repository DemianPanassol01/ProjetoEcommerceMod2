const express = require('express');
const router = express.Router();
const mercadopago = require("mercadopago");
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);

const {
    rejectedUser,
    newClient,
    messageRepo
} = require('../admin/middlewares');

router.get('/carrinho', (req, res) => {
    const produto = {
        value: '189.90',
        description: 'Massageador Elétrico Neck Massager PRO',
        qnt: '1',
        frete: '0.00'
    };

    let client = req.session.rejectedUser;

    if (!client) {
        client = newClient();
    };

    req.session = null;
    res.render('./pages/carrinho.ejs', {
        produto,
        client
    });
});

router.post('/process_payment', async (req, res) => {
    const { user, payment } = req.body;
    const payment_data = {
        transaction_amount: Number(payment.transactionAmmount),
        token: payment.MPHiddenInputToken,
        description: payment.description,
        installments: Number(user.installment),
        payment_method_id: payment.MPHiddenInputPaymentMethod,
        issuer_id: payment.issuer,
        payer: {
            email: user.email,
            identification: {
                type: payment.identificationType,
                number: payment.identificationNumber,
            },
        },
    };

    try {
        const response = await mercadopago.payment.save(payment_data);
        const { id, status, status_detail, statement_descriptor } = response.body;

        if (status === "approved" || status === "in_process") {
            const msg = messageRepo(status_detail);

            req.session.userInformation = {
                id,
                status_detail,
                statement_descriptor,
                msg
            };
            return res.redirect("/sucesso");
        };

        if (status === "rejected") {
            req.session.rejectedUser = rejectedUser(user);
            const msg = messageRepo(status_detail);

            req.flash('error', msg);
            return res.redirect('/carrinho');
        };

    } catch (error) {
        const msg = messageRepo(error.message);
        req.session.rejectedUser = rejectedUser(user);

        req.flash('error', msg);
        res.redirect('/carrinho');
    };
});

router.get('/sucesso', (req, res) => {
    const info = req.session.userInformation;

    if (!info) {
        return res.redirect('/')
    };

    req.session = null;
    res.render('./pages/sucesso.ejs', { info });
});

module.exports = router;