# izStore

> Là một công cụ để quản lý data cho trang web javascript

## Cài đặt

```
npm install iztools
```

## Bắt đầu với ví dụ

### Khởi tạo một state obj

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
};
```

### Tạo store của trang web

```js
import { izStore } from "iztools";

const { initialStore } = izStore;

// Khởi tạo store cho toàn bộ trang web
const store = initialStore();

// Tạo một state
/*
  - (1) "todos" (string): tên state
  - (2) todos: state object (Nói về state object ở phần sau)
*/
store.create("todos", todos);

// Lấy toàn bộ thông tin của store
store.getStore();

// Lấy data của state
store.getState("stateName");

// dispatch
/*
  - path ("stateName/actionName"): có cấu trúc là một path dẫn tới actions của state obj
  - 
*/
store.dispatch(path, data);
```
