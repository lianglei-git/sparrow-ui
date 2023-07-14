import '../icon/remixicon.css'

let zIndex = 2000;

const getIndex = () => {
    return zIndex
}

const setIndex = (i:number = 1) => {
    zIndex += i;
    return zIndex
}


export  {
    getIndex,
    setIndex
}