import {MiniMaple} from "../src/miniMaple.js";
import {Term} from "../src/miniMaple.js";

test('test1', () => {
    let term = Term.parse("+x")

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 1).toBeTruthy();
    expect(term.variable === 'x').toBeTruthy();
    expect(term.exponent === 1).toBeTruthy();

    term = term.differentiate('x')

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 1).toBeTruthy();
    expect(term.variable === 'x').toBeTruthy();
    expect(term.exponent === 0).toBeTruthy();

    let termStr = term.toString()

    expect(termStr === '+1').toBeTruthy();
});

test('test2', () => {
    let term = Term.parse("-2")

    expect(term.sign === -1).toBeTruthy();
    expect(term.coefficient === 2).toBeTruthy();
    expect(term.variable === null).toBeTruthy();
    expect(term.exponent === 0).toBeTruthy();

    term = term.differentiate('x')

    expect(term === null).toBeTruthy();
});

test('test3', () => {
    let term = Term.parse("-2*y")

    expect(term.sign === -1).toBeTruthy();
    expect(term.coefficient === 2).toBeTruthy();
    expect(term.variable === 'y').toBeTruthy();
    expect(term.exponent === 1).toBeTruthy();

    term = term.differentiate('y')

    expect(term.sign === -1).toBeTruthy();
    expect(term.coefficient === 2).toBeTruthy();
    expect(term.variable === 'y').toBeTruthy();
    expect(term.exponent === 0).toBeTruthy();

    let termStr = term.toString()

    expect(termStr === '-2').toBeTruthy();
});

test('test4', () => {
    let term = Term.parse("+5*e^3")

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 5).toBeTruthy();
    expect(term.variable === 'e').toBeTruthy();
    expect(term.exponent === 3).toBeTruthy();

    term = term.differentiate('e')

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 15).toBeTruthy();
    expect(term.variable === 'e').toBeTruthy();
    expect(term.exponent === 2).toBeTruthy();

    let termStr = term.toString()

    expect(termStr === '+15*e^2').toBeTruthy();
});

test('test5', () => {
    let term = Term.parse("+a^2")

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 1).toBeTruthy();
    expect(term.variable === 'a').toBeTruthy();
    expect(term.exponent === 2).toBeTruthy();

    term = term.differentiate('a')

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 2).toBeTruthy();
    expect(term.variable === 'a').toBeTruthy();
    expect(term.exponent === 1).toBeTruthy();

    let termStr = term.toString()

    expect(termStr === '+2*a').toBeTruthy();
});

test('test6', () => {
    let term = Term.parse("+x^2")

    expect(term.sign === 1).toBeTruthy();
    expect(term.coefficient === 1).toBeTruthy();
    expect(term.variable === 'x').toBeTruthy();
    expect(term.exponent === 2).toBeTruthy();

    term = term.differentiate('y')

    expect(term === null).toBeTruthy();
});

test('test7', () => {
    let miniMaple = new MiniMaple()

    let str = miniMaple.differentiate('4*x ^ 3 - x^2 + y - 2 * z', 'x')
    expect(str === '12*x^2-2*x').toBeTruthy();

    str = miniMaple.differentiate('4*x ^ 3 - x^2 + y - 2 * z', 'y')
    expect(str === '1').toBeTruthy();
});