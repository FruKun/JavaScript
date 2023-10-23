const fs = require("fs");

let output = "out.txt";

class Node {
    constructor(left, right, frequense, value) {
        this.left = left;
        this.right = right;
        this.frequense = frequense;
        this.value = value;
    }
}
function getFrequense(str) {
    let frequense = {};
    for (let i = 0; i < str.length; i++) {
        if (frequense[str[i]]) {
            frequense[str[i]]++;
        } else {
            frequense[str[i]] = 1;
        }
    }
    frequense["/end"] = 1;

    return frequense;
}
function entropy(s) {
    let ar = {};
    let p = {};
    let cnt = 0;
    for (let i = 0; i < s.length; ++i) {
        if (s[i] in ar)
            ar[s[i]]++;
        else {
            cnt++;
            ar[s[i]] = 1;
        }
    }
    for (let i in ar)
        p[i] = ar[i] / s.length;
    let e = 0;
    if (s.length == 1)
        e = -1;
    if (cnt > 1) {
        for (let i in p) {
            e += p[i] * (Math.log(p[i]) / Math.log(2));

        }
    }
    e = -e;

    return e;
}
function spl(string) {
    let a = [''.repeat(input[0].length)]
    let k = 0;
    let str = ""
    for (let i = 0; i < string.length; i++) {
        if (string[i] != " ") str += string[i];
        if (string[i] == " ") {
            a[k] = str;
            str = "";
            k++;
            if (string[i + 1] == " ") {
                a[k] = " ";
                i += 2;
                k++;
            }
        }
    }
    return a;
}
function encode(string) {

    let encodedString = '';
    for (let i = 0; i < string.length; i++) {
        encodedString += codes[string[i]];
    }
    encodedString += codes["/end"];
    let a = false
    while (a == false) {
        if (encodedString.length % 8 != 0) encodedString += "0";
        else a = true;
    }
    return encodedString;
}

function generateTree(string) {
    let frequense = getFrequense(string);
    let nodes = [];
    for (let key in frequense) {
        nodes.push(new Node(null, null, frequense[key], key));
    }
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.frequense - b.frequense);
        let left = nodes.shift();
        let right = nodes.shift();
        let node = new Node(left, right, left.frequense + right.frequense);
        nodes.push(node);
    }

    return nodes[0];
}

function generateCode(tree) {
    let codes = {};

    function generateCodeHelper(node, code) {
        if (node.value) {
            codes[node.value] = code;
        } else {
            generateCodeHelper(node.left, code + '0');
            generateCodeHelper(node.right, code + '1');
        }
    }
    generateCodeHelper(tree, '');

    return codes;
}
function bitsym(input) {
    let output = "";
    for (let i = 0; i < input.length; i += 8) {
        output += String.fromCharCode(parseInt(input.slice(i, i + 8), 2));
    }
    return (output);
}
function decode(inp) {
    let decodedString = "";
    let str = "";
    for (let i of inp) {
        str += i;
        if (Object.values(codes).includes(str)) {
            if (codes["/end"] == str) {
                str = "";
                break;
            }
            decodedString += Object.keys(codes).find((k) => codes[k] == str);
            str = "";
        }
    }
    return decodedString;
}

let stringToEncode = "Войдя по ступенькам входа на курган, Пьер взглянул впереди себя и замер от восхищенья перед красотою зрелища. Это была та же панорама, которою он любовался вчера с этого кургана; но теперь вся эта местность была покрыта войсками и дымами выстрелов...";;
codes = generateCode(generateTree(stringToEncode));
let encodestr = encode(stringToEncode);
fs.writeFileSync(output, "");
for (let [key, value] of Object.entries(codes)) {
    fs.appendFileSync(output, `${key} ${value} `);
}
fs.appendFileSync(output, `\n${encodestr}`);
let decodestr = decode(encodestr)
fs.appendFileSync(output, `\n${decodestr}`);
console.log("entropia bin = ", entropy(bitsym(encodestr)));
console.log("entropia = ", entropy(decodestr));




