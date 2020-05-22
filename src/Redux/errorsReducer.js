const initialState = []

const errorsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_ERROR:
            return [...state, action.error]

        case RESET_ERROR:
            return state.filter((el, index) => index !== 0)

        default:
            return state
    }
}

export default errorsReducer;


const SET_ERROR = 'SET_ERROR'
export const setErrorAC = (error) => ({ type: SET_ERROR, error: error })


const RESET_ERROR = 'RESET_ERROR'
export const resetErrorAC = () => ({ type: RESET_ERROR })