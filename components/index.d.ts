import * as SparrowButton from  './button/index'

import * as Types from './_utils/type'

export {
    SparrowButton
}

declare module 'sparrow-ui'

declare module '_utils/types' {
    export default Types
}