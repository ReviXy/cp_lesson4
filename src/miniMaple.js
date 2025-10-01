class MiniMaple {
    constructor() {
        this.terms = [];
    }

    differentiate(polynomial, variable) {
        this.terms = [];
        
        if (!this.isValidInput(polynomial, variable)) {
            throw new Error('Некорректные входные данные');
        }

        const terms = this.parsePolynomial(polynomial);
        const derivativeTerms = terms.map(term => term.differentiate(variable)).filter(term => term !== null);
        
        return this.combineTerms(derivativeTerms);
    }

    isValidInput(polynomial, variable) {
        if (!polynomial || !variable) return false;
        if (variable.length !== 1) return false;
        if (!/^[a-zA-Z]$/.test(variable)) return false;
        return true;
    }

    parsePolynomial(polynomial) {
        let cleaned = polynomial.replace(/\s+/g, '');

        if (!cleaned.startsWith('-'))
            cleaned = '+' + cleaned;
        
        const termStrings = cleaned.split(/(?=[+-])/);
        return termStrings.map(termStr => Term.parse(termStr));
    }

    combineTerms(terms) {
        if (terms.length === 0) {
            return '0';
        }

        const termStrings = terms.map(term => term.toString()).filter(str => str !== '');
        if (termStrings.length === 0) {
            return '0';
        }

        let result = termStrings.join('');
        if (result.startsWith('+')) {
            result = result.substring(1);
        }

        return result;
    }
}

class Term{
    constructor() { 
        this.coefficient = 1
        this.variable = null
        this.exponent = 0
        this.sign = 1
    }

    static parse(termStr){
        const term = new Term()

        if (termStr.startsWith('-'))
            term.sign = -1;
        termStr = termStr.substring(1);

        const hasVariable = /[a-zA-Z]/.test(termStr);
        if (!hasVariable) {
            const temp = parseFloat(termStr)
            if (temp) term.coefficient = temp 
            else throw "Failed parseFloat"
            term.exponent = 0;
            return term;
        }

        const parts = termStr.split('*');
        let a

        if (parts.length != 1){
            const temp = parseFloat(parts[0])
            if (temp) term.coefficient = temp 
            else throw "Failed parseFloat"
            a = parts[1]
        }
        else a = parts[0]

        if (a.includes('^')) {
            const [variable, exponent] = a.split('^');
            term.variable = variable;

            const temp = parseInt(exponent);
            if (temp) term.exponent = temp 
            else throw "Failed parseInt"
        } else {
            term.variable = a;
            term.exponent = 1;
        }

        return term;
    }

    differentiate(variable) {
        if (!this.variable || this.variable !== variable)
            return null;

        const newCoefficient = this.coefficient * this.exponent;
        const newExponent = this.exponent - 1;

        if (newExponent < 0) {
            return null;
        }

        this.coefficient = newCoefficient
        this.exponent = newExponent

        return this
    }

    toString(){
        let termStr = '';
            if (this.coefficient === 0) {
                return '';
            }

            if (this.sign == 1) termStr += '+'
            else termStr += '-'

            if (Math.abs(this.coefficient) !== 1 || this.exponent === 0)
                termStr += this.coefficient;

            if (this.exponent > 0) {
                if (Math.abs(this.coefficient) !== 1) {
                    termStr += '*';
                }
                termStr += this.variable;
                if (this.exponent > 1) {
                    termStr += '^' + this.exponent;
                }
            }

            return termStr;
    }
}
