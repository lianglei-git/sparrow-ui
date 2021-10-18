
let zin = 1

const getIndex = () => {
    console.log(zin)
    return zin
}

const setIndex = (i:number) => {
    zin += i;
    console.log(zin)
    return zin
}
export  {
    getIndex,
    setIndex
}