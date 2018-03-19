export const isPrimitive = (prop: PropType | { name: string }): prop is PropType$Primitive => [ 'string' , 'number' , 'boolean' , 'bool' , 'any' , 'void' , 'Object' , 'String' , 'func' , 'node' , 'object' , 'element' , 'any' , 'array' , 'Element' , 'Element<any>' , 'Function' , 'Node' , 'ComponentType<object>' ].indexOf(prop.name) > -1;

export const isLiteral = (prop: PropType): prop is PropType$Literal => (prop.name === 'literal');

export const isObjectSignature = (prop: PropType): prop is PropType$ObjectSignature => (prop.name === 'signature' && prop.type === 'object');

export const isFunctionSignature = (prop: PropType): prop is PropType$FunctionSignature => (prop.name === 'signature' && prop.type === 'function');

export const isIntersect = (prop: PropType): prop is PropType$Intersect => (prop.name === 'intersect');

export const isUnion = (prop: PropType): prop is PropType$Union => (prop.name === 'union');

export const isEnum = (prop: PropType): prop is PropType$Enum => (prop.name === 'enum');

export const isShape = (prop: PropType): prop is PropType$Shape => (prop.name === 'shape');
export const isShapeArgument = (prop: PropType): prop is PropType$Shape => (prop.name === 'shapeArgument');

export const isArrayOf = (prop: PropType): prop is PropType$ArrayOf => (prop.name === 'arrayOf');

export const isCallBackName = (name: string) => new RegExp(/^on[A-Z]/g).test(name);
export const isCallback = (propName: string, prop: PropType): prop is PropType$Callback => (prop.name === 'func' && isCallBackName(propName));

export const isUnionEnum = (union: PropType) => isUnion(union) && union.value != null ? union.value.reduce((literalsOnly, unionProp) => !literalsOnly ? literalsOnly : unionProp.name === 'literal', true) : false;