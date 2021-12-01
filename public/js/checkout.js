document.addEventListener('DOMContentLoaded', () => {
    if (sectionValidation(inputsEntrega)) {
        breadcrumb[0].classList.remove('item-selected');
        breadcrumb[1].classList.add('item-selected');
        viewSection[0].classList.remove('show');
        viewSection[1].classList.add('show');
    }
});

//Responsável por Inserir o valor do produto no DOM
document.getElementById('prodVal').innerText = document.getElementById('transactionAmmount').value.replace('.', ',');
document.getElementById('prodFrete').innerText = document.getElementById('prodFrete').innerText.replace('.', ',');

//Responsável por validadar os campos;
const input = document.querySelectorAll('input');

// Validação do Email;
input[0].addEventListener("blur", () => {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    const value = !re.test(input[0].value);
    inputValidation(value, input[0]);
});

// Validação do Telefone;
input[1].addEventListener("blur", () => {
    const value = input[1].value.length > 12 || input[1].value.length < 9;
    inputValidation(value, input[1]);
});

// Validação do Endereco;
input[2].addEventListener("blur", () => {
    const value = input[2].value === '';
    inputValidation(value, input[2]);
});

// Validação do Numero de endereço;
input[3].addEventListener("blur", () => {
    const value = input[3].value === '';
    inputValidation(value, input[3]);
});

// Validação do CEP;
input[4].addEventListener("blur", () => {
    const value = input[4].value.length != 9;
    inputValidation(value, input[4]);
});

// Validação da cidade;
input[5].addEventListener("blur", () => {
    const value = input[5].value === '';
    inputValidation(value, input[5]);
});

// Validação do Estado;
input[6].addEventListener("blur", () => {
    const value = input[6].value === '';
    inputValidation(value, input[6]);
});

// Validação do Nome;
input[7].addEventListener("blur", () => {
    const value = input[7].value === '' || input[7].value.length < 4;
    inputValidation(value, input[7]);
});

// Validação do CPF;
input[8].addEventListener("blur", () => {
    const value = input[8].value.length != 14;
    inputValidation(value, input[8]);
});

// Validação do Cartão;
input[9].addEventListener("blur", () => {
    const value = input[9].value.length != 19;
    inputValidation(value, input[9]);
});

// Validação CVV;
input[10].addEventListener("keyup", () => {
    const value = input[10].value.length < 3;
    inputValidation(value, input[10]);
});

//Função responsável por Validar os inputs;
function inputValidation(value, input) {
    if (value) {
        input.nextElementSibling.classList.add('invalid-msg');
    } else {
        input.nextElementSibling.classList.remove('invalid-msg');
    };
};

//Máscaras dos Inputs;

// Máscara do CEP;
input[4].addEventListener('keydown', (e) => {
    let value = e.target.value;
    if (isNaN(value[value.length - 1])) {
        input[4].value = value.substring(0, input[4].value.length - 1)
    };
    if (value.length === 5) {
        input[4].value += '-'
    };
});

// Máscara do Número do Cartão de Crédito;
input[9].addEventListener('keydown', (e) => {
    let value = e.target.value;
    if (isNaN(value[value.length - 1])) {
        input[9].value = value.substring(0, input[9].value.length - 1)
    };
    if (value.length == 4 || value.length == 9 || value.length == 14) {
        input[9].value += "."
    };
});

// Máscara d0 CPF;
input[8].addEventListener('keydown', (e) => {
    let value = e.target.value;
    if (isNaN(value[value.length - 1])) {
        input[8].value = value.substring(0, input[8].value.length - 1)
    };
    if (value.length == 3 || value.length == 7) {
        input[8].value += "."
    };
    if (value.length == 11) {
        input[8].value += "-"
    };
});

const viewSection = document.querySelectorAll('#viewSection'),
    proxPag = document.querySelectorAll('#proxPag'),
    breadcrumb = document.querySelectorAll('.breadcrumb-item'),
    inputsEntrega = document.querySelectorAll('[inputEntrega]'),
    inputsPagamento = document.querySelectorAll('[inputPagamento]');

//Responsável pelo botão da página de entrega;
proxPag[0].addEventListener('click', () => {
    if (sectionValidation(inputsEntrega)) {
        breadcrumb[0].classList.remove('item-selected');
        breadcrumb[1].classList.add('item-selected');
        viewSection[0].classList.remove('show');
        viewSection[1].classList.add('show');
    } else {
        document.querySelectorAll(".msg-lemb")[0].classList.add('displayed');
        setTimeout(() => {
            document.querySelectorAll(".msg-lemb")[0].classList.remove('displayed');
        }, 4000);
    };
});

//Responsável pelo botão da página de pagamento;
proxPag[1].addEventListener('click', () => {
    if (sectionValidation(inputsPagamento) && seletor.selectedIndex !== 0) {
        breadcrumb[1].classList.remove('item-selected');
        breadcrumb[2].classList.add('item-selected');
        viewSection[1].classList.remove('show');
        viewSection[2].classList.add('show');
        populateReview();
        createtoken();
    } else {
        document.querySelectorAll(".msg-lemb")[1].classList.add('displayed');
        setTimeout(() => {
            document.querySelectorAll(".msg-lemb")[1].classList.remove('displayed');
        }, 4000);
    };
});

//Responsável por retornar para páginas anteriores através do botões de editar;
document.querySelectorAll('[data-prev]').forEach(item => {
    item.addEventListener('click', (e) => {
        let i = e.target.id;
        if (i == 0) {
            breadcrumb[1].classList.remove('item-selected');
            breadcrumb[i].classList.add('item-selected');
            viewSection[1].classList.remove('show');
            viewSection[i].classList.add('show');
        } else {
            breadcrumb[2].classList.remove('item-selected');
            breadcrumb[i - 1].classList.add('item-selected');
            viewSection[2].classList.remove('show');
            viewSection[i - 1].classList.add('show');
        };
    });
});

//Função responsável por verificar as info de cada seção;
function sectionValidation(nodeList) {
    return Array.from(nodeList).every(elm => elm.value !== '' && !elm.nextElementSibling.classList.contains('invalid-msg'));
};

//Função responsável por popular a seção de revisão;
let nameIssuer;

function populateReview() {
    let installments = document.getElementById('userInstallment').selectedOptions[0].innerText;

    document.getElementById('confEnd').innerText = `${input[2].value}, ${input[3].value}, ${input[5].value} - ${input[6].value}`;
    document.getElementById('confCont').innerText = `${input[0].value} - ${input[1].value}`;
    document.getElementById('confPag').innerText = `Cartão de Crédito, ${nameIssuer} - Final ${input[9].value.substring(15,19)}`;
    document.getElementById('confParcel').innerText = `${installments}`;
}

/////////////// Seção do Mercado Pago ///////////////

const mp = new MercadoPago('TEST-4329eb45-b758-425d-bc89-5af5a41eaf76');

//Inputs Ocultos;
const cardNum = document.getElementById('form-checkout__cardNumber'),
    idNumber = document.getElementById('form-checkout__identificationNumber'),
    mmNumber = document.getElementById('form-checkout__cardExpirationMonth'),
    aaNumber = document.getElementById('form-checkout__cardExpirationYear'),
    tokenCard = document.getElementById('MPHiddenInputToken'),
    paymentMethodInput = document.getElementById('MPHiddenInputPaymentMethod'),
    issuer = document.getElementById('form-checkout__issuer'),
    seletor = document.querySelector("#userInstallment");

//Input oculto do numero do cartão sanitizado;
input[9].addEventListener("keyup", () => {
    let card = input[9].value;
    if (card.length === 19) {
        card = card.replace(".", "").replace(".", "").replace(".", "");
        cardNum.value = card;
        showInstallments();
        getIssuers();
    };
});

//Input oculto do numero do CPF sanitizado;
input[8].addEventListener("keyup", () => {
    let cpf = input[8].value;
    if (cpf.length === 14) {
        cpf = cpf.replace(".", "").replace(".", "").replace("-", "");
        idNumber.value = cpf;
    };
});

//Input oculto do mês;
document.getElementById('userccExpMonth').addEventListener('blur', () => {
    mmNumber.value = document.getElementById('userccExpMonth').value;
});

//Input oculto do ano;
document.getElementById('userccExpYear').addEventListener('blur', () => {
    aaNumber.value = document.getElementById('userccExpYear').value;
});

let totalVal;
//Responsável por Mostrar as opções de parcelamento ao tarminar de digitar o cartão;
async function showInstallments() {
    try {
        let bin = cardNum.value;
        bin = bin.substring(0, 6);
        const installments = await mp.getInstallments({
            amount: document.getElementById('transactionAmmount').value,
            bin: bin,
            paymentTypeId: "credit_card",
        });
        const response = installments[0].payer_costs;
        totalVal = response;
        response.forEach((result) => {
            let installment = result.installments,
                message = result.recommended_message,
                inner = document.createElement("option");

            inner.innerHTML = `${message}`;

            inner.value = installment;

            seletor.appendChild(inner);

            if (seletor.children[1].value === "1") {
                seletor.children[1].selected = true;
            };
            if (seletor.children.length > 13) {
                for (let i = 13; i < seletor.children.length; i++) {
                    seletor.removeChild(seletor.children[i])
                }
            };
        });
        seletor.disabled = false;

    } catch (error) {
        seletor.disabled = true;
        setTimeout(() => {
            input[9].nextElementSibling.classList.add('invalid-msg')
        }, 3000);
    }
};

//Responsável por atualizar o valor do "Você irá pagar";
seletor.addEventListener('click', () => {
    const totalValInput = document.getElementById('prodValTotal');
    const id = seletor.selectedIndex;
    const attVal = totalVal[id - 1].total_amount;
    totalValInput.innerText = attVal.toFixed(2).replace('.', ',');
});

//Responsável por retornar o método de pagamento;
async function paymentMethod() {
    try {
        let bin = cardNum.value;
        bin = bin.substring(0, 6);
        const paymentMethods = await mp.getPaymentMethods({
            bin: bin
        });
        const issuerNameID = paymentMethods.results[0].id;
        nameIssuer = paymentMethods.results[0].name;
        paymentMethodInput.value = issuerNameID;
        return issuerNameID;
    } catch (error) {
        setTimeout(() => {
            input[9].nextElementSibling.classList.add('invalid-msg')
        }, 3000);
        paymentMethodInput.value = '';
    };
};

//Responsável por identificar o provedor de pagamento;
async function getIssuers() {
    try {
        const paymentMethodResult = await paymentMethod();
        let bin = cardNum.value;
        bin = bin.substring(0, 6);
        const issuers = await mp.getIssuers({
            paymentMethodId: paymentMethodResult,
            bin: bin
        });
        let issuer_id = issuers[0].id;
        issuer.value = issuer_id;
    } catch (error) {
        setTimeout(() => {
            input[9].nextElementSibling.classList.add('invalid-msg')
        }, 3000);
        issuer.value = '';
    }
};

//Responsável por criar um tokien do cartão;
async function createtoken() {
    try {
        const token = await mp.createCardToken({
            cardNumber: cardNum.value,
            cardholderName: input[7].value,
            identificationType: 'CPF',
            identificationNumber: idNumber.value,
            securityCode: input[10].value,
            cardExpirationMonth: mmNumber.value,
            cardExpirationYear: aaNumber.value,
        });
        document.getElementById('MPHiddenInputToken').value = token.id;
    } catch (error) {
        input[9].nextElementSibling.classList.add('invalid-msg');
        breadcrumb[2].classList.remove('item-selected');
        breadcrumb[1].classList.add('item-selected');
        viewSection[2].classList.remove('show');
        viewSection[1].classList.add('show');
    };
};

document.querySelector('.btn-comprar').addEventListener('submit', () => {
    document.querySelector('form').requestSubmit();
});