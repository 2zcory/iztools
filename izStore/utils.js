export const checkState = (store, state) => {
    const haveState = Object.keys(store).some(key => key === state)
    if (!haveState) return false
    return true
}

export const checkDispatchPatch = (store, state, action) => {
    const haveState = Object.keys(store).some(key => key === state);
    if (!haveState) {
        console.log('state chưa được tạo')
        return false
    }
    const haveAction = Object.keys(store[state].actions).some(key => key === action)
    if (!haveAction) {
        console.log('action chưa được tạo')
        return false
    }
    return true
}