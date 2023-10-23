let fs = require("fs");
let input = fs.readFileSync("Harry.txt", "utf8");
let search = "Harry Potter";
const start = new Date().getTime();
let cnt = 0;
function findSubstr(text, j, c) {
    cnt++;
    let input = text.substring(0, j) + c;
    for (let i = 0; i < j + 1; i++) {
        let subStr = input.substring(i, j + 1);
        if (text.startsWith(subStr))
            return j - i + 1;
    }
    return 0;
}
function getTableNumbers(input) {
    let alphabet = new Set(input.split(""));
    let array = [];
    for (let i = 0; i < input.length; i++) {
        let arr = [];
        alphabet.forEach(element => { arr[element] = findSubstr(input, i, element); })
        array.push(arr);
    }

    return array;
}
let curs = 0;
let array = getTableNumbers(search);
let pos = [];

for (let i = 0; i < input.length; i++) {
    curs = array[curs][input[i]] || 0;
    
    if (curs == search.length) {
        pos.push(i - search.length + 1);
        curs = 0;

    }
}

const end = new Date().getTime();
console.log("time:", end - start);
console.log(pos)
console.log("Amount of compares: " + cnt);





