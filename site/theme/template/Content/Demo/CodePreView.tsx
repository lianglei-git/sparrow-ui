import React, { useEffect } from 'react';
type Props = { code: Object | any
    toReactComponent: any}
export default (props:Props) => {
    useEffect(() => {
        console.log(props.code)
    }, [props.code])

    return <div className='showCode'>
        {props.code !== null ? props.toReactComponent([
                'pre',{
                    lang: 'jsx',
                    highlighted: props.code['jsx']
                }
            ]) : ''}
    </div>
}

