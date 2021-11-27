
export interface affixTypes {
    'offset-bottom': string | number
    'offset-top': string | number
    // target: () => HTMLElement
    onChange: (affixed?: boolean) => void
}

export const affixProps = {
    'offset-bottom': undefined,
    'offset-top': 0,
}
