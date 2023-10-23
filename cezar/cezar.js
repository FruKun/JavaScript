let fs = require("fs");

//let OtherSymbols = [' ', ',', '.', ':', ';', '!', '?', '-', '_', '=', '+', '(', ')', '[', ']', '@', '`', "'", '"', '«', '»', '<', '…', '>', '|', '/', '%', '$', '^', '&', '*', '~', '“', '”', '—', '\n', '\t', '\r', '\a', '\b', '\v', '\f', '\e'];
//let Numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
let RusAlfUp = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я'];
let RusAlfLower = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];
let EngAlfUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let EngAlfLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
let analizalf = [0.0796, 0.0160, 0.0284, 0.0401, 0.1286, 0.0262, 0.0199, 0.0539, 0.0777, 0.0016, 0.0041, 0.0351, 0.0243, 0.0751, 0.0662, 0.0181, 0.0017, 0.0683, 0.0662, 0.0972, 0.0248, 0.0115, 0.0180, 0.0017, 0.0152, 0.0005];

function cezaralfenc(step, arr) {
    let a = {};
    for (let i = 0; i < arr.length; i++) {
        a[arr[i]] = arr[i + step] == undefined ? arr[i + step - arr.length] : arr[i + step];
    }
    return a;
}
function cezaralfdec(step, arr) {
    let a = {};
    for (let i = 0; i < arr.length; i++) {
        a[arr[i]] = arr[i - step] == undefined ? arr[i - step + arr.length] : arr[i - step];
    }
    return a;
}

function encode(input, step) {
    let result = "";
    let cEngAlfUp = cezaralfenc(step, EngAlfUp);
    let cEngAlflower = cezaralfenc(step, EngAlfLower);
    let cRusAlfUp = cezaralfenc(step, RusAlfUp);
    let cRusAlflower = cezaralfenc(step, RusAlfLower);
    for (let i = 0; i < input.length; i++) {
        let symb = input[i];
        if (EngAlfUp.includes(symb)) result += cEngAlfUp[symb]
        else if (EngAlfLower.includes(symb)) result += cEngAlflower[symb];
        else if (RusAlfUp.includes(symb)) result += cRusAlfUp[symb];
        else if (RusAlfLower.includes(symb)) result += cRusAlflower[symb];
        else result += symb;

    }
    return result;
}
function decode(input, step) {
    let result = "";
    let cEngAlfUp = cezaralfdec(step, EngAlfUp);
    let cEngAlflower = cezaralfdec(step, EngAlfLower);
    let cRusAlfUp = cezaralfdec(step, RusAlfUp);
    let cRusAlflower = cezaralfdec(step, RusAlfLower);
    for (let i = 0; i < input.length; i++) {
        let symb = input[i];
        if (EngAlfUp.includes(symb)) result += cEngAlfUp[symb]
        else if (EngAlfLower.includes(symb)) result += cEngAlflower[symb];
        else if (RusAlfUp.includes(symb)) result += cRusAlfUp[symb];
        else if (RusAlfLower.includes(symb)) result += cRusAlflower[symb];
        else result += symb;

    }
    return result;
}

function analiz(input) {
    let a = new Array(26);
    a.fill(0, 0);
    let k = 0;
    function search(symb, arr) {
        for (let i = 0; i < arr.length; i++) {
            if (symb == arr[i]) return i;
        }
    }
    for (let i = 0; i < input.length; i++) {
        let symb = input[i];
        if (EngAlfLower.includes(symb)) {
            k++
            a[search(symb, EngAlfLower)] += 1;
        }
        else if (EngAlfUp.includes(symb)) {
            k++
            a[search(symb, EngAlfLower)] += 1;
        }

    }
    for (let i = 0; i < a.length; i++) {
        a[i] = a[i] / k;

    }
    let b = [];
    for (let i = 0; i < a.length; i++) {
        let k = 0;
        for (let j = 0; j < a.length; j++) {
            if ((a[j + i] == undefined ? a[j + i - a.length] : a[j + i]) / analizalf[j] > 0.8 && (a[j + i] == undefined ? a[j + i - a.length] : a[j + i]) / analizalf[j] < 1.2) k++;
        }
        b[i] = k;
    }

    function maxindex(input) {
        let a = 0;
        let b = 0;
        for (let i = 0; i < input.length; i++) {
            if (input[i] >= a) {
                b = i;
                a = input[i]
            }
        }
        return b;
    }

    return maxindex(b)
}

//console.log(analiz("But on the edge of town, drills were driven out of his mind by something else."))
//fs.writeFileSync("output2.txt", decode(fs.readFileSync("output.txt", "utf8"), 6));