const Jexl = require("lib/Jexl");

let inst;

describe("Expression", () => {
  beforeEach(() => {
    inst = new Jexl.Jexl();
  });
  describe("compile", () => {
    it("returns the parent instance", () => {
      const expr = inst.createExpression("2/2");
      const compiled = expr.compile();
      expect(expr).toBe(compiled);
    });
    it("compiles the Expression", () => {
      const expr = inst.createExpression("2 & 2");
      const willFail = () => expr.compile("2 & 2");
      expect(willFail).toThrow("Invalid expression token: &");
    });
    it("compiles more than once if requested", () => {
      const expr = inst.createExpression("2*2");
      const spy = jest.spyOn(expr, "compile");
      expr.compile();
      expr.compile();
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
  describe("eval", () => {
    it("resolves Promise on success", async () => {
      const expr = inst.createExpression("2/2");
      await expect(expr.eval()).resolves.toBe(1);
    });
    it("rejects Promise on error", async () => {
      const expr = inst.createExpression("2++2");
      await expect(expr.eval()).rejects.toThrow(/unexpected/);
    });
    it("passes context", async () => {
      const expr = inst.createExpression("foo");
      await expect(expr.eval({ foo: "bar" })).resolves.toBe("bar");
    });
    it("never compiles more than once", async () => {
      const expr = inst.createExpression("2*2");
      const spy = jest.spyOn(expr, "compile");
      await expr.eval();
      await expr.eval();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe("evalSync", () => {
    it("returns success", () => {
      const expr = inst.createExpression("2 % 2");
      expect(expr.evalSync()).toBe(0);
    });
    it("throws on error", () => {
      const expr = inst.createExpression("2++2");
      expect(expr.evalSync.bind(expr)).toThrow(/unexpected/);
    });
    it("passes context", () => {
      const expr = inst.createExpression("foo");
      expect(expr.evalSync({ foo: "bar" })).toBe("bar");
    });
    it("never compiles more than once", () => {
      const expr = inst.createExpression("2*2");
      const spy = jest.spyOn(expr, "compile");
      expr.evalSync();
      expr.evalSync();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe("toString", () => {
    const expressions = [
      ["true", "true"],
      ["'hello world'", '"hello world"'], // We always use double quotes
      ["123.0", "123"],
      ["-123.0", "-123"],
      ["123456789101112131415161718", "123456789101112140000000000"],
      ["-123456789101112131415161718", "-123456789101112140000000000"],
      ["8.27936475869709331257", "8.279364758697094"],
      ["-8.27936475869709331257", "-8.279364758697094"],
      ["foo .bar .baz", "foo.bar.baz"],
      ['foo["bar"].baz', null], // Stays as filter syntax
      ["foo  ? bar  : baz", "foo ? bar : baz"],
      ["{ one: a.value, two: b.value }", '{ "one": a.value, "two": b.value }'],
      [
        '{ "one a": a.value, "two b": b.value }',
        '{ "one a": a.value, "two b": b.value }'
      ],
      ["! foo", "!foo"],
      ["foo.bar   ==   foo.baz", "foo.bar == foo.baz"],
      ['[true,"two",3]', '[true, "two", 3]'],
      ["foo[.bar == 3]", null],
      ["foo[bar == 3]", null],
      ["foo | bar | baz(1, 2)", null],
      ["baz(bar(foo), 1, 2)", null],
      ["1 + (2 * 3)", "1 + 2 * 3"],
      ["(1 + 2) * 3", null],
      ["1 + 2 + 3 - 3 - 2 - 1", null],
      ['1 // 2 * (foo["bar"] - 4) % 6 ^ foo[.bar == 1 * 2 * 3]', null],
      ["a.b[e.f].c[g.h].d", null],
      ["a[c][d].b", null],
      ["(a ? b : c) + (d && (e || f))", null],
      ["!a", null],
      ["!(a && b)", null],
      ["!a[b]", null],
      ["!a ? b : c", null],
      ["!(a ? b : c)", null],
      [
        '(z + 0) + " A " + (a + 1) + " B " + (b + 2) + " C " + (c == 0 ? "c1" : "c2")',
        'z + 0 + " A " + (a + 1) + " B " + (b + 2) + " C " + (c == 0 ? "c1" : "c2")'
      ],
      ["a ? b1 ? b2 : b3 : c1 ? c2 : c3", null],
      ["a < b | c", null],
      ["a < (b | c) ? true : false", null], // Jexl can't parse this if the brackets are removed
      ["a | b < c ? true : false", null]
    ];

    test.each(expressions)("`%s`", (input, expected) => {
      const expr = inst.compile(input);
      const stringExp = expr.toString();
      expect(stringExp).toBe(expected == null ? input : expected);
      expect(() => inst.compile(stringExp)).not.toThrow();
    });
  });
});
