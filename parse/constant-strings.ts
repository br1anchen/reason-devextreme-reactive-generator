const ConstantStrings = [
    `
external toJsUnsafe : 'a => 'b = "%identity";

let unwrapValue =
  fun
    | \`String(s) => toJsUnsafe(s)
    | \`Bool(b) => toJsUnsafe(Js.Boolean.to_js_boolean(b))
    | \`Float(f) => toJsUnsafe(f)
    | \`Int(i) => toJsUnsafe(i)
    | \`Date(d) => toJsUnsafe(d)
    | \`Callback(c) => toJsUnsafe(c)
    | \`Element(e) => toJsUnsafe(e)
    | \`ObjectArray(oa) => toJsUnsafe(oa)
    | \`StringArray(sa) => toJsUnsafe(sa)
    | \`IntArray(ia) => toJsUnsafe(ia)
    | \`FloatArray(fa) => toJsUnsafe(fa)
    | \`ObjectGeneric(og) => toJsUnsafe(og)
    | \`Array(ag) => toJsUnsafe(ag)
    | \`Any(an) => toJsUnsafe(an)
    | \`Object(_) => assert false
    | \`Enum(_) => assert false
    | \`EnumArray(_) => assert false;
`,
];

const constant = ConstantStrings.join('\n');

export default constant;
