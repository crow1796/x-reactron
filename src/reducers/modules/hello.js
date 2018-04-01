import * as Types from '@/actions/types/hello'
const initialState = {
    name: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case Types.GREET:
            return Object.assign(state, { name: action.payload })
        default:
            return state
    }
}

export default reducer