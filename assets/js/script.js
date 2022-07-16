"use strict";
const tecla = document.getElementsByClassName('tecla');
const display = document.getElementById('display');
var startValue;
var operation;
var lastValue;
var clear = 0;
function changeDisplay(valor) {
    if (operation) {
        if (clear === 0) {
            display.innerHTML = valor;
            clear = 1;
        }
        else {
            if (display.textContent) {
                if (display.textContent.length < 16) {
                    display.innerHTML += valor;
                }
            }
        }
    }
    else {
        if (display.textContent === '0') {
            display.innerHTML = valor;
        }
        else if (display.textContent) {
            if (display.textContent.length < 16) {
                display.innerHTML += valor;
            }
        }
    }
    if (display.textContent) {
        ajustSizeDisplay(display.textContent);
    }
}
function ajustSizeDisplay(texto) {
    if (texto.length >= 8)
        display.style.fontSize = '50px';
    if (texto.length >= 10)
        display.style.fontSize = '40px';
    if (texto.length >= 13)
        display.style.fontSize = '30px';
}
function clearDisplay(disp) {
    disp.innerHTML = '0';
    disp.style.fontSize = '65px';
}
function teclasClick(li) {
    var _a, _b, _c, _d, _e;
    if (li.classList.contains('tecla-numerica')) {
        if (li.textContent) {
            changeDisplay(li.textContent);
        }
    }
    else if (li.classList.contains('tecla-virgula')) {
        if (li.textContent) {
            if (!((_a = display.textContent) === null || _a === void 0 ? void 0 : _a.includes(','))) {
                console.log('contém virgula');
                display.innerHTML += ',';
            }
        }
    }
    else if (li.classList.contains('tecla-divisao')) {
        startValue = Number((_b = display.textContent) === null || _b === void 0 ? void 0 : _b.replace(',', '.'));
        operation = '/';
        clear = 0;
    }
    else if (li.classList.contains('tecla-multipli')) {
        startValue = Number((_c = display.textContent) === null || _c === void 0 ? void 0 : _c.replace(',', '.'));
        operation = 'x';
        clear = 0;
    }
    else if (li.classList.contains('tecla-subtracao')) {
        startValue = Number((_d = display.textContent) === null || _d === void 0 ? void 0 : _d.replace(',', '.'));
        operation = '-';
        clear = 0;
    }
    else if (li.classList.contains('tecla-adicao')) {
        startValue = Number((_e = display.textContent) === null || _e === void 0 ? void 0 : _e.replace(',', '.'));
        operation = '+';
        clear = 0;
    }
    else if (li.classList.contains('tecla-igualdade')) {
        if (operation === '/') {
            display.innerHTML = realizaOperacao('/').replace('.', ',');
            ajustSizeDisplay((display.textContent) ? display.textContent : '');
        }
        else if (operation === 'x') {
            display.innerHTML = realizaOperacao('x').replace('.', ',');
            ajustSizeDisplay((display.textContent) ? display.textContent : '');
        }
        else if (operation === '-') {
            display.innerHTML = realizaOperacao('-').replace('.', ',');
            ajustSizeDisplay((display.textContent) ? display.textContent : '');
        }
        else if (operation === '+') {
            display.innerHTML = realizaOperacao('+').replace('.', ',');
            ajustSizeDisplay((display.textContent) ? display.textContent : '');
        }
    }
    else if (li.classList.contains('tecla-porcentagem')) {
        if (operation) {
            if (operation === 'x') {
                display.innerHTML = realizaOperacao('x-%').replace('.', ',');
                ajustSizeDisplay((display.textContent) ? display.textContent : '');
            }
            else if (operation === '+') {
                display.innerHTML = realizaOperacao('+-%').replace('.', ',');
                ajustSizeDisplay((display.textContent) ? display.textContent : '');
            }
            else if (operation === '-') {
                display.innerHTML = realizaOperacao('--%').replace('.', ',');
                ajustSizeDisplay((display.textContent) ? display.textContent : '');
            }
        }
        else {
            display.innerHTML = realizaOperacao('%').replace('.', ',');
            ajustSizeDisplay((display.textContent) ? display.textContent : '');
        }
    }
    else if (li.textContent === "C") {
        operation = '';
        clear = 0;
        clearDisplay(display);
    }
}
function realizaOperacao(operador) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    let total;
    operation = '';
    clear = 0;
    switch (operador) {
        case '/':
            total = startValue / Number((_a = display.textContent) === null || _a === void 0 ? void 0 : _a.replace(',', '.'));
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case 'x':
            total = startValue * Number((_b = display.textContent) === null || _b === void 0 ? void 0 : _b.replace(',', '.'));
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case '-':
            total = startValue - Number((_c = display.textContent) === null || _c === void 0 ? void 0 : _c.replace(',', '.'));
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case '+':
            total = startValue + Number((_d = display.textContent) === null || _d === void 0 ? void 0 : _d.replace(',', '.'));
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case '%':
            total = Number((_e = display.textContent) === null || _e === void 0 ? void 0 : _e.replace(',', '.')) / 100;
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case 'x-%': // representa quando for uma operação do tipo 160 x 2%
            let valor2 = Number((_f = display.textContent) === null || _f === void 0 ? void 0 : _f.replace(',', '.'));
            total = (valor2 / 100) * startValue;
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case '+-%':
            let adicaoValor2 = Number((_g = display.textContent) === null || _g === void 0 ? void 0 : _g.replace(',', '.'));
            let resultParcial = (adicaoValor2 / 100) * startValue;
            total = startValue + resultParcial;
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        case '--%':
            let subtracaoValor2 = Number((_h = display.textContent) === null || _h === void 0 ? void 0 : _h.replace(',', '.'));
            let resultParcialSubtracao = (subtracaoValor2 / 100) * startValue;
            total = startValue - resultParcialSubtracao;
            return (String(total).length >= 13) ? String(total).substring(0, 16) : String(total);
        default:
            return '';
    }
}
function addClickAndLis(teste) {
    for (let i = 0; i < tecla.length; i++) {
        teste[i].addEventListener('click', function () {
            teclasClick(teste[i]);
        });
    }
}
addClickAndLis(tecla);
