import React, { useEffect, useRef } from 'react';
import { useRipple } from './ripple';

/**
 * @example 
    const 🌰 = () => {
        const target = useRef(null);
        return  <>
            <div ref={target}>Text</div>
            <TouchRipple target={target.current} />
        </>
    }
 */
const TouchRipple = (props) => {
    useEffect(() => {
        if(props.target.current) {
            useRipple(props.target.current);
        }
    }, [props.target])
    return <></>
}

export default TouchRipple