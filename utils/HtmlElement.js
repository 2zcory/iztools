export const $getElement = (ele) => (root) => root ? root.querySelector(ele) : document.querySelector(ele)

export const $createElement = (tag, obj) => {
    const ele = document.createElement(tag)
    Object.keys(obj).forEach(key => {
        ele.setAttribute(key, obj[key])
    })

    return ele
}

export const $pushElement = (parent) => (children) => {
    if (!paren || !children) return
    const childType = typeof children;
    switch (childType) {
        case 'array':
            children.forEach(child => parent.appendChild(child))
            break;
        default:
            parent.appendChild(children)
            break;
    }
}

export const $addAttribute = (parent) => (obj) => {
    if (!obj || typeof obj !== "object") return
    Object.keys(obj).forEach(key => {
        parent.setAttribute(key, obj[key])
    })
}

export default {
    get: $getElement,
    create: $createElement
}