let fs = require('fs');
let input = fs.readFileSync('Harry.txt', 'utf-8');
let search = "Harry Potter";
const start = new Date().getTime();
function badchar(string) {
    let a = [];
    let b = {};
    for (let i = 0; i < input.length; i++) a.push(string.length);
    for (let i = 0; i < string.length - 1; i++) {
        a[string.charCodeAt(i)] = string.length - i - 1;
        b[string[i]] = a[string.charCodeAt(i)];
    }
    b[string[string.length - 1]] = a[string.charCodeAt(string.length - 1)]
    //console.log(b)
    return a;
}
let a = badchar(search);
let last = search.length - 1;

let i = 0;
let b = [];

while (i < input.length - last) {
    let j = last;
    while (j >= 0 && input[i + j] == search[j]) j--;
    if (j == -1) b.push(i)


    i += a[input.charCodeAt(i + last)];

}
const end = new Date().getTime();
console.log("time:", end - start);
console.log(b)