let fs = require('fs');
const fileContent = fs.readFileSync('inp.txt', 'utf8');
let input = [];
input = fileContent.split(/ |\n/);
function conversion(num) {
    let a = Number(num);
    if (num[0] == "i" && num[1] == "n" && num[2] == "f" && num[3] == undefined) return "0 11111111 000000000000000000000000";
    if (num[0] == "-" && num[1] == "i" && num[2] == "n" && num[3] == "f" && num[4] == undefined) return "1 11111111 000000000000000000000000";
    if (a == 0 && num.slice(0, 1) != "-") return "0 00000000 000000000000000000000000";
    if (a == 0 && num.slice(0, 1) == "-") return "1 00000000 000000000000000000000000";
    if (a > 3.4028234663852886e+38) return "0 11111111 000000000000000000000000";
    if (a < -3.4028234663852886e+38) return "1 11111111 000000000000000000000000";
    if (a != a) return "0 11111111 000000000001010000000000";
    let mod = a >= 0 ? "0" : "1";
    a = Math.abs(a);
    let b = a.toString(2).split(".");
    b[1] = b[1] === undefined ? "" : b[1];
    let e;
    let mant = "";
    if (b[0].length == 1) {
        if (b[0] == "1") {
            mant = b[1].length < 23 ? "0".repeat(23 - b[1].length) : "" + b[1].slice(0, 23);
            return mod + " " + "01111111" + " " + mant;
        }
        if (b[0] == "0") {
            e = b[1].indexOf("1") + 1;
            if (e >= 127) {
                let d = e - 127;
                let sdvg = d >= 0 && d <= 23 ? 23 - d : 0;
                if (e > 149) return mod + " 00000000 000000000000000000000000";
                mant = ('0'.repeat(d) + '1' + b[1].slice(e)).slice(0, 23);
                return mod + " 00000000 " + mant;
            }
        }
        mant = b[1].slice(e) > 23 ? b[1].slice(e).slice(0, 23) : b[1].slice(e) + "0".repeat(23 - b[1].slice(e).length);
        e = (127 - e).toString(2).length < 8 ? "0".repeat(8 - (127 - e).toString(2).length) + (127 - e).toString(2) : (127 - e).toString(2);
        return mod + " " + e + " " + mant;
    }
    e = b[0].length + 126;
    if (e >= 255) return mod + " 11111111 000000000000000000000000";
    e = e.toString(2);
    mant = (b[0].slice(1) + b[1]).length > 23 ? (b[0].slice(1) + b[1]).slice(0, 23) : b[0].slice(1) + b[1] + "0".repeat(23 - (b[0].slice(1) + b[1]).length);
    return mod + " " + e + " " + mant;
}
function nconversion(num) {
    let a = num;
    let mod = a.slice(0, 1);
    let e = a.slice(1, 9);
    let mant = a.slice(9);
    let mod1 = mod == "1" ? "-" : "";
    mod = mod == "1" ? -1 : 1;
    if (e.indexOf("1") == -1 && mant.indexOf("1") == -1) return mod1 + "0";
    if (e.indexOf("0") == -1 && mant.indexOf("1") == -1) return mod1 + "inf";
    if (e.indexOf("0") == -1 && mant.indexOf("1") != -1) return mod1 + "NaN";
    if (e.indexOf("1") == -1 && mant.indexOf("1") != -1) {
        e = 2 ** -(118 + num.indexOf('1'));
        mant = 1 + parseInt(num.slice(num.indexOf('1')+1) == "" ? "0" : num.slice(num.indexOf('1')+1), 2) / (2 ** num.slice(num.indexOf('1')+1).length)
        return mod * e * mant
    }
    return mod * (2 ** (parseInt(e, 2) - 127)) * (1 + parseInt(mant, 2) / 2 ** 23);
}
function binsum(num1, num2) {
    let sdvg = 0;
    let res = "";
    let a = num1;
    let b = num2;
    if (a.length > b.length) b = "0".repeat(a.length - b.length) + b;
    else if (b.length > a.length) a = "0".repeat(b.length - a.length) + a;
    let c = Math.max(a.length, b.length);
    for (let i = c - 1; i >= 0; i--) {
        if (sdvg == 0) {
            if (a[i] == b[i] && a[i] == "1") {
                res = "0" + res;
                sdvg = 1;
            }
            if (a[i] == b[i] && a[i] == "0") {
                res = "0" + res;
                sdvg = 0;
            }
            if (a[i] != b[i]) {
                res = "1" + res;
                sdvg = 0;
            }
        }
        else if (sdvg == 1) {
            if (a[i] == b[i] && a[i] == "1") {
                res = "1" + res;
                sdvg = 1;
            }
            if (a[i] == b[i] && a[i] == "0") {
                res = "1" + res;
                sdvg = 0;
            }
            if (a[i] != b[i]) {
                res = "0" + res;
                sdvg = 1;
            }
        }
    }
    if (sdvg == 1) return "1" + res;
    if (sdvg == 0) return res;
}
function binsub(num1, num2) {
    let sdvg = 0;
    let res = "";
    let a = num1;
    let b = num2;
    if (a.length > b.length) b = "0".repeat(a.length - b.length) + b;
    else if (b.length > a.length) a = "0".repeat(b.length - a.length) + a;
    let c = Math.max(a.length, b.length);
    if (parseInt(a, 2) < parseInt(b, 2)) {
        let d = a;
        a = b;
        b = d;
    }
    for (let i = c - 1; i >= 0; i--) {
        if (sdvg == 0) {
            if (b[i] == "1" && a[i] == "1") {
                res = "0" + res;
                sdvg = 0;
            }
            if (b[i] == "0" && a[i] == "0") {
                res = "0" + res;
                sdvg = 0;
            }
            if (b[i] == "0" && a[i] == "1") {
                res = "1" + res;
                sdvg = 0;
            }
            if (b[i] == "1" && a[i] == "0") {
                res = "1" + res;
                sdvg = 1;
            }
        }
        else if (sdvg == 1) {
            if (a[i] == "1" && b[i] == "0") {
                res = "0" + res;
                sdvg = 0;
            }
            if (a[i] == "1" && b[i] == "1") {
                res = "1" + res;
                sdvg = 1;
            }
            if (a[i] == "0" && b[i] == "0") {
                res = "1" + res;
                sdvg = 0;
            }
            if (a[i] == "0" && b[i] == "1") {
                res = "0" + res;
                sdvg = 1;
            }
        }
    }
    return res;
}
function operation(num1, num3) {
    let a = conversion(num1);
    let b = conversion(num3);
    if (a == "0 11111111 000000000000000000000000" || b == "0 11111111 000000000000000000000000") {
        console.log("inf");
        console.log("0 11111111 000000000000000000000000")
        process.exit(1);
    }
    if (a == "1 11111111 000000000000000000000000" || b == "1 11111111 000000000000000000000000") {
        console.log("-inf");
        console.log("1 11111111 000000000000000000000000");
        process.exit(1);
    }
    if (a == "0 11111111 000000000001010000000000" || b == "0 11111111 000000000001010000000000") {
        console.log("NaN");
        console.log("0 11111111 000000000001010000000000");
        process.exit(1);
    }
    a = a.split(" ");
    b = b.split(" ");
    let c = [];
    if (parseInt(a[1], 2) < parseInt(b[1], 2)) {
        c = a;
        a = b;
        b = c;
    }
    if (a[1] == b[1]) {
        let newmant = binsum("1" + a[2], "1" + b[2]);
        newmant = newmant.slice(1, newmant.length - 1);
        let neweps = binsum(a[1], "1");
        a[1] = neweps.slice(0, 8);
        a[2] = newmant.slice(0, 23);
    }
    else if (a[1] != b[1]) {
        let neweps = a[1];
        let newmant = ("0".repeat(parseInt(binsub(a[1], b[1]), 2)) + "1" + b[2]).slice(0, 24);
        newmant = binsum("1" + a[2], newmant);
        if (newmant.length > 24) neweps = binsum(neweps, "1");
        newmant = newmant.slice(1, newmant.length);
        a[1] = neweps.slice(0, 8);
        a[2] = newmant.slice(0, 23);
    }
    return (a[0] + a[1] + a[2]).toString();
}
switch (input[0]) {
    case "conv":
        console.log(conversion(input[1]));

        break;
    case "nconv":
        console.log(nconversion(input[1]));
        break;
    case "sum":
        let out = operation(input[1], input[2]);
        console.log(input[1]);
        console.log(conversion(input[1]));
        console.log(input[2]);
        console.log(conversion(input[2]));
        console.log("=");
        console.log(nconversion(out));
        console.log(out.slice(0, 1), out.slice(1, 9), out.slice(9));
        break;
}

