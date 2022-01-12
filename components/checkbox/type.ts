
export interface checkboxTypes {
    checked: boolean
    disabled: boolean
    indeterminate: boolean
} 

export const checkboxProps = Object.freeze({
    checked: undefined,
    disabled: undefined,
    indeterminate: undefined
})


export interface checkboxGroupTypes {
    value: any;
    disabled: boolean | undefined
} 

export const checkboxGroupProps = Object.freeze({
    value: undefined,
    disabled: undefined
})
