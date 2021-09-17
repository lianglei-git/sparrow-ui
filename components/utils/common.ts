export const runIFELSE:(sets:Set<any[]>) => void | any = (sets) => {
    for(let [is, fn] of sets) {
        if(is) {
            if(fn()) {
                break
            }
        }
    }
}