// import * as search from './search.js'
import { checkState, checkDispatchPatch } from './utils'

const store = {};

export class ZStore {
    constructor() {
        this.getStore = () => {
            const returnStore = {}
            Object.keys(store).forEach(key => {
                returnStore[key] = store[key].state
            })
            return returnStore
        }

        this.getState = (state) => {
            if (!checkState(store, state)) return
            return store[state].state
        }

        this.create = (name, stateObj) => {
            store[name] = {
                ...stateObj,
                state: stateObj.state()
            }
        }

        this.dispatch = (path, data) => {
            const [state, action] = path.split("/")

            if (!checkDispatchPatch(store, state, action)) return

            const context = {
                commit: (mutation, data) => {
                    store[state].state = store[state].mutations[mutation](store[state].state, data)
                },
                dispatch: (action, data) => {
                    if (!checkDispatchPatch(store, state, action)) return
                    return store[state].actions[action](context, data)
                },
                state: () => store[state].state,
                rootState: () => {
                    const returnStore = {}
                    Object.keys(store).forEach(key => {
                        returnStore[key] = store[key].state
                    })
                    return returnStore
                },
                rootDispatch: this.dispatch
            }
            return store[state].actions[action](context, data)
        }
    }
}