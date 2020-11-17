export const getEle = (root, ele) => root.querySelector(ele)

export const createEle = (tag, obj) => {
    const ele = document.createElement(tag)
    Object.keys(obj).forEach(key => {
        ele.setAttribute(key, obj[key])
    })
    return ele
}