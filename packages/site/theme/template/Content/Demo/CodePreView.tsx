import React, { useEffect } from 'react';
type Props = { code: Object | any
    toReactComponent: any}
export default (props:Props) => {
    useEffect(() => {
        console.log(props.code)
    }, [props.code])

    return <div className='showCode'>
        {props.code !== null && props.code.length ? props.code.map((t:any) => {
            for(let k in t) {
                return props.toReactComponent([
                    'pre',{
                        lang: k,
                        highlighted: t[k]
                    }
                ])
            }
        }) :''}
    </div>
}

