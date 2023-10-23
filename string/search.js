let fs = require('fs');
let input = fs.readFileSync('Harry.txt', 'utf-8');
let search = "Harry Potter";

const start = new Date().getTime();
g = 0;

function bruteforce(string1, string2) {
    let t = true;
    for (let i = 0; i <= string1.length; i++) {
        if (string1[i] != string2[i]) {
            t = false;
            g++;
            break;
        }
    }
    return t;
}
function gethashsum(string) {
    let sum = 0;
    for (let i = 0; i < string.length; i++) {
        sum += Number(string.charCodeAt(i));
    }
    return sum;
}

shs = gethashsum(search);
let b = gethashsum(input.slice(0, search.length));
let a = [];

for (let i = 0; i <= input.length - search.length; i++) {
    if (search[0] == input[i]) {

        if (shs == b)
            if (bruteforce(input.slice(i, i + search.length), search) == true)
                a.push(i);
    }
    b -= Number(input.charCodeAt(i));
    b += Number(input.charCodeAt(i + search.length));
    
}

const end = new Date().getTime();
console.log("time:", end - start);
console.log("collision:", g);
console.log(a);

