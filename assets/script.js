function isNumber(ch){
    return ( ( ch >= '0' && ch <= '9' ) || ch == '.' );
}

function isAlpha(ch){
    return ( ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z');
}

function eval(exp){
    exp = exp.trim() + ' ';
    var stc = [];
    var evalstr = '';
    var operand = '';
    while(exp.length){
        var ch = exp[0];
        if(!isNumber(ch) && !isAlpha(ch) && operand.length){
            evalstr += operand + ' ';
            operand = '';
        }
        if(ch == '(' || ch == '=') {
            stc.push(ch);
        } else if(isNumber(ch) || isAlpha(ch)) {
            operand += ch;
        } else if(ch == '*' || ch == '/' || ch == '+' || ch == '-') {
            if(ch == '*'){
                stc.push(ch);
            } else if(ch == '/'){
                while(stc.length && stc[stc.length - 1] == '*') {
                    evalstr += stc.pop() + ' ';
                }
                stc.push(ch);
            }
            else if(ch == '+' || ch == '-') {
                if(stc[stc.length - 1] == '*' || stc[stc.length - 1] == '/'){
                    while(stc[stc.length - 1] != '+' || stc[stc.length - 1] != '-') {
                        evalstr += stc.pop() + ' ';
                    }
                }
                stc.push(ch);
            }
        } else if(ch == ')') {
            while(stc.length) {
                if(stc[stc.length - 1] == '('){
                    stc.pop();
                } else if(stc[stc.length - 1] == '=') {
                    break;
                } else {
                    evalstr += stc.pop() + ' ';
                }
            }
        }
        exp = exp.substr(1);
    }
    while(stc.length) {
        if(stc[stc.length - 1] == '(') {
            stc.pop();
        } else {
            evalstr += stc.pop() + ' ';
        }
    }
    return evalstr;
}

function parse(exp) {
    exp = eval(exp);
    var stc = [];
    var table = [];
    while(exp.length) {
        var n = exp.indexOf(' ');
        var item = exp.substr(0, n);
        if(parseFloat(item) || /\w+/.test(item)) {
            stc.push(item);
        } else {
            var v = stc.pop();
            var u = stc.pop();
            var r;
            switch(item) {
                case '=': table.push([u,parseFloat(v)]); r = 0; break;
                case '*': r = u * v; break;
                case '/': r = u / v; break;
                case '+': r = u + v; break;
                case '-': r = u - v; break;
            }
            stc.push(r);
        }
        exp = exp.substr(n + 1);
    }
    return table.pop();
}

function expressionWithoutLine(exps){
    return exps.replace(/( |\n|\r)*/g, '').split(';');
}

function batchParse(exps){
    var arrExps = expressionWithoutLine(exps);
    arrExps.pop();
    var arrResult = [];
    while(arrExps.length){
        arrResult.push(parse(arrExps.pop()));
    }
    return arrResult;
}
