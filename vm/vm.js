let fs = require('fs');
const fileContent = fs.readFileSync('alg.txt', 'utf8');
let commands = { input: 0, out: 1, write: 2, goto: 3, assign: 4, assignn: 5, sum: 6, sumn: 7, sub: 8, subn: 9, div: 10, divn: 11, rem: 12, remn: 13, mult: 14, multn: 15, abs: 16, if: 17, ifn: 18, metka: 19, el: 20, exit: 21 };
let input = [];
input = fileContent.split(/ |\n/);
let mem = [0, 0, 0, 0, 0];

for (let i = 0; i < input.length; i++) {
    input[i] = input[i].replace(/\r|\s/, "");
    if (input[i] == "metka") {
        input[i + 1] = input[i + 1].replace(/\r|\s/, "");
        mem[input[i + 1]] = i + 5;
    }
}
for (let i = 0; i < input.length; i++) {
    if ((input[i] in commands) && (input[i] != "metka") && (input[i] != "write") && (input[i] != "goto")) {
        mem.push(commands[input[i]]);
    }
    else if (input[i] == "metka") {
        mem.push(commands[input[i]]);
        mem.push(input[i + 1])
        i++;
    }
    else if (input[i] == "goto") {
        mem.push(commands[input[i]]);
        mem.push(input[i + 1]);
        i++;
    }
    else if (input[i] == "write") {
        mem.push(commands[input[i]]);
        mem.push(input[i + 1]);
        i++;
    }
    else if (input[i] == ">") {
        mem.push(">");
    }
    else if (input[i] == "==") {
        mem.push("==");
    }
    else if (input[i] == "<") {
        mem.push("<");
    }
    else {
        mem.push(Number(input[i]));
    }
}

let ip = 5;
let j = 0;


while (ip < mem.length) {
    switch (mem[ip]) {
        case 0: 
            mem[mem[ip + 1]] = Number(process.argv[j + 2]);
            j++;
            ip += 2;
            break;          
        case 1:
            console.log(mem[mem[ip + 1]]);
            ip += 2;
            break;
        case 2:
            console.log(mem[ip + 1]);
            ip += 2;
            break;
        case 3:
            ip = mem[mem[ip + 1]];
            break;
        case 4:
            mem[mem[ip + 1]] = mem[mem[ip + 2]];
            ip += 3;
            break;
        case 5:
            mem[mem[ip + 1]] = mem[ip + 2];
            ip += 3;
            break;
        case 6:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[mem[ip + 2]];
            ip += 4;
            break;
        case 7:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] + mem[ip + 2];
            ip += 4;
            break;
        case 8:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] - mem[mem[ip + 2]];
            ip += 4;
            break;
        case 9:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] - mem[ip + 2];
            ip += 4;
            break;
        case 10:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] / mem[mem[ip + 2]];
            ip += 4;
            break;
        case 11:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] / mem[ip + 2];
            ip += 4;
            break;
        case 12:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] % mem[mem[ip + 2]];
            ip += 4;
            break;
        case 13:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] % mem[ip + 2];
            ip += 4;
            break;
        case 14:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[mem[ip + 2]];
            ip += 4;
            break;
        case 15:
            mem[mem[ip + 3]] = mem[mem[ip + 1]] * mem[ip + 2];
            ip += 4;
            break;
        case 16:
            mem[mem[ip + 2]] = Math.abs(mem[mem[ip + 1]]);
            ip += 3;
            break;
        case 17:
            let result;
            if (mem[ip + 2] == '>') result = (mem[mem[ip + 1]] > mem[mem[ip + 3]]);
            if (mem[ip + 2] == '==')  result = (mem[mem[ip + 1]] == mem[mem[ip + 3]]);
            if (mem[ip + 2] == '<') result = (mem[mem[ip + 1]] > mem[mem[ip + 3]]);
            if (result == false) ip += 4;
            else ip += 6;
            break;
        case 18:
            if (mem[ip + 2] == '>') result = (mem[mem[ip + 1]] > mem[ip + 3]);
            if (mem[ip + 2] == '==') result = (mem[mem[ip + 1]] == mem[ip + 3]);
            if (mem[ip + 2] == '<')  result = (mem[mem[ip + 1]] > mem[ip + 3]);
            if (result == false) ip += 4;
            else ip += 6;
            break;
        case 19:
            ip += 2;
            break;
        case 20:
            ip += mem[ip + 1] + 2;
            break;
        case 21:
            process.exit(1);
            break;
        default:
            console.log("Error, unknown command " + ip);
            break;
    }
}


