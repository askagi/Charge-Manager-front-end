
function money(value) {
    value = String(value).replace(/^(0+)/g, "")
    value = value.replace(/[^\w\s]|\s|[A-Z]/gi, '')
    var len = value.length;

    len == 1 ? value = value.replace(/(\d)/, "0,0$1") : '';
    len == 2 ? value = value.replace(/(\d)/, "0,$1") : ''
    len > 2 ? value = value.replace(/(\d{2})$/, ',$1') : '';
    len == 6 ? value = value.replace(/(\d{1})/, '$1.') : '';
    len == 7 ? value = value.replace(/(\d{2})/, '$1.') : '';
    len == 8 ? value = value.replace(/(\d{3})/, '$1.') : '';
    len == 9 ? value = value.replace(/(\d{1})(\d{3})/, '$1.$2.') : '';
    len == 10 ? value = value.replace(/(\d{2})(\d{3})/, '$1.$2.') : '';
    len == 11 ? value = value.replace(/(\d{3})(\d{3})/, '$1.$2.') : '';
    len == 12 ? value = value.replace(/(\d{1})(\d{3})(\d{3})/, '$1.$2.$3.') : '';
    len == 13 ? value = value.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3.') : '';
    return value;
}

function dateFormat(date) {
    date = date.slice(0, date.indexOf('T')).split('-');
    const newDate = new Date(date);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return newDate.toLocaleDateString(newDate.getTimezoneOffset());
}

function formatEditDate(date) {
    return date.slice(0, date.indexOf('T'));
}

function amountFormat(amount) {
    return Number(amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, });
}

function idFormat(id) {
    const stringId = `${id}`;
    return stringId.padStart(4, '0');
}

function maxLengthString(string) {
    const maxLength = 50;
    return string.length > maxLength ? string.slice(0, maxLength) + '...' : string;
}

function formatCurrentCpf(cpf) {
    cpf = String(cpf).replace(/[^\w\s]|\s|[A-Z]/gi, '');
    let len = cpf.length;
    len == 11 ? cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : '';
    return cpf;
}

function formatCurrentTelephone(tel) {
    tel = String(tel).replace(/[^\w\s]|\s|[A-Z]/gi, '');
    var len = tel.length;

    if (len > 2 && len < 10) {
        tel = tel.replace(/(\d{2})/, '($1) ');
    }
    else if (len == 10) {
        tel = tel.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    else if (len == 11) {
        tel = tel.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
    }
    else {
        return tel;
    }
    return tel;
}

function formatCurrentCep(cep) {
    return String(cep).replace(/(\d{5})(\d{2})/, '$1-$2');
}

export {
    formatCurrentCep,
    formatCurrentTelephone,
    formatCurrentCpf,
    money,
    dateFormat,
    formatEditDate,
    amountFormat,
    idFormat,
    maxLengthString
};


