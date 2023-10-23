let fs = require('fs');
let input = fs.readFileSync('Harry.txt', 'utf-8');

let search = "Harry Potter";

const start = new Date().getTime();
function bruteforce(string1, string2) {
    let t = true;
    for (let i = 0; i <= string1.length; i++) {
        if (string1[i] != string2[i]) {
            t = false;
            break;
        }
    }
    return t;
}

let l = input.length;

let a = []
for (let i = 0; i <= l; i++) {
    if (input[i] = search[0]) {
        if (bruteforce(input.slice(i, i + search.length), search) == true) {
            a.push( i);

        }
    }
}

const end = new Date().getTime();
console.log("time:", end - start);
console.log(a)
