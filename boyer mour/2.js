let fs = require('fs');
let input = fs.readFileSync("Harry.txt","utf-8");
let search = "Harry Potter";

const start = new Date().getTime();
function stopsymb(string) {
    let a = {};
    for (let i = 0; i < string.length - 1; i++) {
        a[string[i]] = i;
    }
    if (a[string[string.length - 1]] == undefined) {
        a[string[string.length - 1]] = string.length - 1;
    }
    a[undefined] = -1;
    return a;
}

function suff(string) {
    let T = string;
    let m = T.length;
    let suffshift = [];
    let z = [];
    let maxZidx = 0;
    let maxZ = 0;
    for (let j = 0; j <= m; j++) {
        z[j] = 0
        suffshift[j] = m
    }
    for (let j = 1; j < m; j++) {
        if (j <= maxZ) z[j] = Math.min(maxZ - j + 1, z[j - maxZidx]);
        while (j + z[j] < m && T.charAt(m - 1 - z[j]) == T.charAt(m - 1 - (j + z[j]))) z[j]++;

        if (j + z[j] - 1 > maxZ) {
            maxZidx = j;
            maxZ = j + z[j] - 1;
        }
    }
    for (let j = m - 1; j > 0; j--) suffshift[m - z[j]] = j;
    let r = 0;
    for (let j = 1; j <= m - 1; j++)
        if ((j + z[j]) == m)
            for (; r <= j; r++)
                if (suffshift[r] == m) suffshift[r] = j;

    return suffshift;
}

let a = stopsymb(search);
let s = suff(search);
console.log(a,"\n", s)
let i = 0;
let b = [];

while (i <= input.length - search.length) {
    let j = search.length - 1;
    while (j >=0 && search[j] == input[i + j]) j--;
    if (j < 0) {
        b.push(i);


        i += s[j + 1];
    }
    else {
        i += Math.max(s[j + 1], a[input[search.length - 1 - j]] == undefined ? -1 : a[input[search.length - 1- j]]);
    }

}
const end = new Date().getTime();
console.log("time:", end - start);

console.log(b)