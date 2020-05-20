const initialState = {
    error: null
}

const errorsReducer = (state = initialState, action) => {

    switch (action.type) {
        
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }

        case RESET_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export default errorsReducer;


const SET_ERROR = 'SET_ERROR'
export const setErrorAC = (error) => ({ type: SET_ERROR, error: error })


const RESET_ERROR = 'RESET_ERROR'
export const resetErrorAC = () => ({ type: RESET_ERROR })