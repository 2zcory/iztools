// import * as search from './search.js'
import { checkState, checkDispatchPatch } from './utils'

const store = {};

export default class StoreZ {
    constructor() {
        this.getStore = () => {
            const returnStore = {}
            Object.keys(store).forEach(key => {
                returnStore[key] = { ...store[key].state }
            })
            return returnStore
        }

        this.getState = (state) => {
            if (!checkState(store, state)) return
            return { ...store[state].state }
        }

        this.create = (stateObjList) => {
            Object.keys(stateObjList).forEach(key => {
                const { state } = stateObjList[key]
                store[key] = {
                    ...stateObjList[key],
                    state: state(),
                }
            })
            // REMOVE store[name] = {
            //     ...stateObj,
            //     state: stateObj.state()
            // }
        }

        this.dispatch = (path, data) => {
            const [state, action] = path.split("/")

            if (!checkDispatchPatch(store, state, action)) return

            const context = {
                commit: (mutation, data) => {
                    store[state].mutations[mutation](store[state].state, data)
                },
                dispatch: (action, data) => {
                    if (!checkDispatchPatch(store, state, action)) return
                    return store[state].actions[action](context, data)
                },
                state: (() => ({ ...store[state].state }))(),
                rootState: (() => {
                    const returnStore = {}
                    Object.keys(store).forEach(key => {
                        returnStore[key] = { ...store[key].state }
                    })
                    return returnStore
                })(),
                rootDispatch: this.dispatch
            }
            return store[state].actions[action](context, data)
        }
    }
}

export const mapGetters = (stateName, stateList) => {
    return () => {
        const isArray = Array.isArray(stateList)
        const currentGetter = store[stateName].getter
        if (isArray) {
            const stateGetters = stateList.reduce((acc, item) => {
                acc[item] = currentGetter[item]({ ...store[stateName].state })
                return acc
            }, {})
            return stateGetters
        }
        if (typeof stateList === 'object') {
            const stateGetters = Object.entries(stateList).reduce((acc, [key, value]) => {
                acc[key] = currentGetter[value]({ ...store[stateName].state })
                return acc
            }, {})
            return stateGetters
        }
    }
}