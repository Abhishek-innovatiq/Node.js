const calculator = require("../src/calculator");

describe("Calculator Unit Tests", () => {

  test("Addition of two numbers", () => {
    expect(calculator.add(10, 5)).toBe(15);
  });

  test("Subtraction of two numbers", () => {
    expect(calculator.subtract(10, 5)).toBe(5);
  });

  test("Multiplication of two numbers", () => {
    expect(calculator.multiply(4, 5)).toBe(20);
  });

  test("Division of two numbers", () => {
    expect(calculator.divide(10, 2)).toBe(5);
  });

  test("Division by zero should throw error", () => {
    expect(() => calculator.divide(10, 0))
      .toThrow("Division by zero is not allowed");
  });

});