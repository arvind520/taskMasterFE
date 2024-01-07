import { LOGOUT, SIGN_IN } from "./authTypes"

//action creators
export const signIn= (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}