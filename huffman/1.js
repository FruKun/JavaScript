let fs = require('fs');
const fileContent = fs.readFileSync('out.txt', 'utf8');
let input = fileContent.split(/\n/);
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
code = spl(input[0]);

codes = {};

for (let i = 0; i < code.length; i += 2) {
    if (code[i] == '' && code[i + 1] == ''){
        codes[code[i]] = code[i + 2]
        i++;
    }
    else codes[code[i]] = code[i + 1];
}


let string = input[1];
function decode(inp) {
    let decodedString = "";
    let str = "";
    console.log(codes)
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
console.log(decode(string))