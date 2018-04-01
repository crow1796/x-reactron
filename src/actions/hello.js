import * as Types from '@/actions/types/hello'

const greet = (name) => {
    return {
        type: Types.GREET,
        payload: name
    }
}

export {
    greet
}