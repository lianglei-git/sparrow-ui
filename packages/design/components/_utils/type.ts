
const tuple = <T extends string[]>(...args: T) => args

const tupleNum = <T extends number[]>(...args: T) => args;


type Args2<T, Idx extends number = 0> = T extends (...args: infer F) => any ? F[Idx] : null;


export {
    Args2,
    tuple,
    tupleNum
}