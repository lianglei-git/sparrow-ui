import React, { useEffect } from 'react';

 const Content = (props:any) => {
    useEffect(() => {
        console.log(props)
    }, [])
    return <div>
        组件o
    </div>
}

export default Content