
export const runIFELSE:(sets:Set<any[]>) => void | boolean = (sets) => {
    let _arr:Array<boolean> = new Array()
    for(let [is, fn = () => true] of sets) {
        if(is) {
            if(fn()) {
                _arr.push(true)
                break
            }
            _arr.push(false)
        }
    }
    if(!_arr.includes(false)) {
        return true
    }
}
let _globalThis: any
export const getGlobalThis = (): any => {
    return (
      _globalThis ||
      (_globalThis =
        typeof globalThis !== 'undefined'
          ? globalThis
          : typeof self !== 'undefined'
            ? self
            : typeof window !== 'undefined'
              ? window
              : typeof global !== 'undefined'
                ? global
                : {})
    )
  }

  export const sto: (fn: Function, time?: number) => void = (fn, time = 16) => {
    let t = setTimeout(async () => {
        await fn()
        clearTimeout(t)
    }, time);
}