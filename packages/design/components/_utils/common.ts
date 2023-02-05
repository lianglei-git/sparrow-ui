
export const runIFELSE: (sets: Set<any[]>) => void | boolean = (sets) => {
  let _arr: Array<boolean> = new Array()
  for (let [is, fn = () => true] of sets) {
    if (is) {
      if (fn()) {
        _arr.push(true)
        break
      }
      _arr.push(false)
    }
  }
  
  if (!(_arr as any).includes(false)) {
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

export const sto: (fn: Function, time?: number) => any = (fn, time = 16) => {
  let t = setTimeout(async () => {
    await fn()
    clearTimeout(t)
  }, time);
  return t
}

export const isObject = (tar:any) => Object.prototype.toString.call(tar) === '[object Object]'

export const has = (target:Object, key: string) => Reflect.has(target, key)


export function ArrayRemove(any: any) {
  if (Array.isArray(any)) {
      any.map(i => {
          this.map((i2: any, idx: number) => {
              if (i == i2) this.splice(idx, 1)
          })
      });
      return;
  }
  this.map((i: any, idx: number) => i == any && this.splice(idx, 1))
}

export function CorrectBoolean (k:boolean | string) {
  if(k == true || k == 'true') return true;
  return false;
}