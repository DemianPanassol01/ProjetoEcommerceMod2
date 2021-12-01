module.exports.catchAsync = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
};

module.exports.rejectedUser = (user) => {
    return {
        email: user.email,
        phone: user.phone,
        adress: user.adress,
        adressNumber: user.adressNumber,
        cep: user.CEP,
        city: user.city,
        state: user.state,
        name: user.name,
        cpf: user.CPF
    };
};

module.exports.newClient = () => {
    return {
        email: '',
        phone: '',
        adress: '',
        adressNumber: '',
        cep: '',
        city: '',
        state: '',
        name: '',
        cpf: ''
    };
};

module.exports.messageRepo = (msg) => {
    const m = [
        {
            status_detail: 'accredited',
            msg_sugerida: 'Pronto! Seu pagamento foi aprovado! No resumo da fatura você verá a cobrança do valor como:',
        },
        {
            status_detail: 'pending_contingency',
            msg_sugerida: 'Estamos Processando o pagamento. Não se preocupe, em menos de 2 dias lhe informaremos por e-mail se foi creditado',
        },
        {
            status_detail: 'pending_review_manual',
            msg_sugerida: 'Estamos Processando o pagamento. Não se preocupe, em menos de 2 dias lhe informaremos por e-mail se foi creditado',
        },
        {
            status_detail: 'cc_rejected_bad_filled_card_number',
            msg_sugerida: 'Número do cartão inválido: Por favor, revise-o e tente novamente',
        },
        {
            status_detail: 'cc_rejected_bad_filled_date',
            msg_sugerida: 'Data de vencimento inválida: Revise-a e tente novamente',
        },
        {
            status_detail: 'cc_rejected_bad_filled_other',
            msg_sugerida: 'Erro: Por favor, revise seus dados de pagamento',
        },
        {
            status_detail: 'cc_rejected_bad_filled_security_code',
            msg_sugerida: 'Código de segurança inválido: Revise-o e tente novamente',
        },
        {
            status_detail: 'cc_rejected_blacklist',
            msg_sugerida: 'Desculpe, não conseguimos processar o pagamento',
        },
        {
            status_detail: 'cc_rejected_card_disabled',
            msg_sugerida: 'Erro: Ligue para a operadora do seu cartão para ativá-lo. O telefone se encontra no verso do seu cartão',
        },
        {
            status_detail: 'cc_rejected_card_error',
            msg_sugerida: 'Erro: Não foi possível processar o pagamento com o cartão selecionado. Tente novamente com outro cartão',
        },
        {
            status_detail: 'cc_rejected_duplicated_payment',
            msg_sugerida: 'Erro: Você já efetuou um pagamento com esse valor. Caso precise pagar novamente, utilize outro cartão',
        },
        {
            status_detail: 'cc_rejected_high_risk',
            msg_sugerida: 'Erro: Seu pagamento foi recusado. Por favor, utilize outro cartão',
        },
        {
            status_detail: 'cc_rejected_insufficient_amount',
            msg_sugerida: 'Erro: Seu cartão não possui saldo suficiente',
        },
        {
            status_detail: 'cc_rejected_invalid_installments',
            msg_sugerida: 'Erro: A operadora do cartão utilizado não processa pagamentos com o numero selecionado de parcelas',
        },
        {
            status_detail: 'cc_rejected_max_attempts',
            msg_sugerida: 'Erro: Você atingiu o limite de tentativas permitido. Por favor, escolha outro cartão',
        },
        {
            status_detail: 'cc_rejected_other_reason',
            msg_sugerida: 'Erro: A operadora do seu cartão recusou a processar o pagamento devido a um erro interno. Tente novamente com outro cartão',
        },
        {
            status_detail: 'Invalid card_number_validation',
            msg_sugerida: 'Erro: Parece que você inseriu um número de cartão de crédito inválido',
        },
        {
            status_detail: 'cc_rejected_call_for_authorize',
            msg_sugerida: 'Erro: Seu cartão não está apto para realizar esse tipo de transação. Por favor, selecione outro',
        },
        {
            status_detail: "The customer can't be equal to the collector",
            msg_sugerida: 'Erro: Parece que há informações invalidas na Seção de Pagamento. Por favor, tente novamente',
        }
    ];
    let mensagem = m.find((data) => data.status_detail === msg);

    if (mensagem === undefined) {
        mensagem.msg_sugerida = 'Erro Interno: Por favor, tente novamente';
    }

    return mensagem.msg_sugerida;
};