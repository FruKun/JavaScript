let fs = require('fs');
let input = fs.readFileSync(process.argv[2], 'utf8');

function Jump_encode() {
    let str = "";
    let i = 0;
    while (i < input.length) {
        let correct = 1;
        while (correct < 128 && input[i] == input[i + correct] && i + correct < input.length) {
            correct++
        }
        if (correct >= 3) {
            str += String.fromCharCode(correct - 3 + 128) + input[i];
            i += correct;
        }
        else {
            let noncorrect = correct;
            while (input[i + noncorrect] != input[i + noncorrect + 1] && input[i + noncorrect + 1] != input[i + noncorrect + 2] &&
                i + noncorrect < input.length && noncorrect < 128) {
                noncorrect++;
            }
            str += String.fromCharCode(noncorrect);
            for (let j = 0; j < noncorrect; j++) {
                str += input[i + j];
            }
            i += noncorrect;
        }
    }
    return (str);
}

function Jump_decode() {
    let i = 0;
    let count = 0;
    let str = "";
    while (i < input.length) {
        count = 0;
        let current = input.charCodeAt(i);
        if (current >= 128) {

            while (count < current + 3 - 128) {
                str += input[i + 1];
                count++;
            }
            i += 2;
        }
        else {
            for (let j = 0; j < current; j++) {
                str += input[i + j + 1];
            }
            i += input.charCodeAt(i) + 1;
        }
    }
    return (str);
}
function Escape_encode() {
    let i = 0;
    let str = "";

    while (i < input.length) {
        let count = 1;
        while (count <= 255 + 4 && input[i] == input[i + count] && count + i < input.length) {
            count++;
        }
        if ((input[i] == '#') || (count > 3)) {
            str += "#" + String.fromCharCode(input[i] == '#' ? count : count - 4) + input[i];
        }
        else {
            for (let j = 0; j < count; j++) {
                str += input[i];
            }
        }
        i += count;
    }
    return str;
}
function Escape_decode() {
    let i = 0;
    let str = "";
    while (i < input.length) {
        if (input[i] == "#") {
            let count = 0;

            if (input[i + 2] == "#") {
                while (count < input.charCodeAt(i + 1)) {
                    str += input[i + 2];
                    count++;
                }
            }
            else {
                while (count < input.charCodeAt(i + 1) + 4) {
                    str += input[i + 2];
                    count++;
                }
            }
            i += 2;
        }
        else
            str += input[i];

        i++;
    }
    return str;
}
switch (process.argv[3]) {
    case "jump":
        switch (process.argv[4]) {
            case "encode":
                fs.writeFileSync('encode.txt', Jump_encode());
                break;
            case "decode":
                fs.writeFileSync('decode.txt', Jump_decode());
                break;

        }
        break;
    case "escape":
        switch (process.argv[4]) {
            case "encode":
                fs.writeFileSync('encode.txt', Escape_encode());
                break;
            case "decode":
                fs.writeFileSync('decode.txt', Escape_decode());
                break;

        }
        break;
}

