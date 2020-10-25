```js
// import * as search from './search.js'
const store = {};

module.exports = function initialStore() {
  return {
    getStore: () => store,
    create: (name, stateObj) => {
      store[name] = {
        ...stateObj,
        state: stateObj.state(),
      };
    },
    getState: (state) => {
      if (!checkState(state)) return;
      return store[state].state;
    },
    dispatch: (path, data) => {
      const [state, action] = path.split("/");

      if (!checkDispatchPatch(state, action)) return;

      const context = {
        commit: (mutation, data) => {
          store[state].state = store[state].mutations[mutation](
            store[state].state,
            data
          );
        },
        state: store[state].state,
        dispatch: (action, data) => {
          if (!checkDispatchPatch(state, action)) return;
          return store[state].actions[action](context, data);
        },
      };
      return store[state].actions[action](context, data);
    },
  };
};

function checkState(state) {
  const haveState = Object.keys(store).some((key) => key === state);
  if (!haveState) return false;
  return true;
}

function checkDispatchPatch(state, action) {
  const haveState = Object.keys(store).some((key) => key === state);
  if (!haveState) {
    console.log("state chưa được tạo");
    return false;
  }
  const haveAction = Object.keys(store[state].actions).some(
    (key) => key === action
  );
  if (!haveAction) {
    console.log("action chưa được tạo");
    return false;
  }
  return true;
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
```

```js
export const state = () => ({
  manufacture: null,
  model: null,
});

export const mutations = {
  SET_SEARCH_DATA: (state, data) => ({ ...state, ...data }),
};

export const actions = {
  setSearchData: ({ commit, state, dispatch }, data) => {
    commit("SET_SEARCH_DATA", data);
    // dispatch('setOtherData', { abc: 1 })
  },

  // setOtherData: ({ commit, state }, data) => {
  //     console.log(data)
  //     console.log(state)
  // }
};

// export const reducer = (state, { type, payload }) => {
//     switch (type) {
//         case 'SET_SEARCH_DATA': {
//             return {
//                 ...state,
//                 ...payload
//             }
//         }
//         default: {
//             return state
//         }
//     }
// }
```
