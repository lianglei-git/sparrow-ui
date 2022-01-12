
export interface radioTypes {
    checked: boolean
    disabled: boolean
} 

export const radioProps = Object.freeze({
    checked: undefined,
    disabled: undefined,
})


export interface radioGroupTypes {
    value: any;
    disabled: undefined,
    type: undefined | 'button'
    optiontype: undefined | 'button'
}

export const radioGroupProps =  {
    value: undefined,
    disabled: undefined,
    type: undefined,
    optiontype: undefined
}