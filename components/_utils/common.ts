
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