// import * as search from './search.js'
import { checkState, checkDispatchPatch } from './utils'

const store = {};

export const initialStore = () => {
    return {
        getStore: () => {
            const returnStore = {}
            Object.keys(store).forEach(key => {
                returnStore[key] = store[key].state
            })
            return returnStore
        },
        create: (name, stateObj) => {
            store[name] = {
                ...stateObj,
                state: stateObj.state()
            }
        },
        getState: (state) => {
            if (!checkState(store, state)) return
            return store[state].state
        },
        dispatch: (path, data) => {
            const [state, action] = path.split("/")

            if (!checkDispatchPatch(store, state, action)) return

            const context = {
                commit: (mutation, data) => {
                    store[state].state = store[state].mutations[mutation](store[state].state, data)
                },
                state: store[state].state,
                dispatch: (action, data) => {
                    if (!checkDispatchPatch(store, state, action)) return
                    return store[state].actions[action](context, data)
                }
            }
            return store[state].actions[action](context, data)
        }
    }
}


// const mapState = ({ variable, state }) => {
//     return {
//         [variable]: store[state].state
//     }
// }

// const appStore = initialStore();
// appStore.create('search', search);
// appStore.dispatch('search/setSearchData', {
//     manufacture: 'HONDA'
// })

// console.log(appStore.getState('search'))


// appStore.dispatch('search/abc')