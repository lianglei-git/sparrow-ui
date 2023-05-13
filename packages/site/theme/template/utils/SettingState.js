
/** @type {{useSW: boolean}} */
let SettingState = {
    useSW: false
};

let isInit = false;

const getSettingState = () => {
    if(isInit) return SettingState;
    let settingData = localStorage.getItem('setting')
    settingData = settingData && JSON.parse(settingData) || {}
    SettingState = {...SettingState, ...settingData};
    isInit = true;
    return SettingState;
}



const setSettingState = (obj) => {
    const base = getSettingState();
    for(let k in obj) {
        base[k] = obj[k];
    }
    
    localStorage.setItem('setting',JSON.stringify(base))
    SettingState = base;
}


export {
    setSettingState,
    getSettingState
}