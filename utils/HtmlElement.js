export const $getElement
    = (ele)
        => (root)
            => root ? root.querySelector(ele) : document.querySelector(ele)

export const $createElement = (tag, obj) => {
    const ele = document.createElement(tag)
    Object.keys(obj).forEach(key => {
        ele.setAttribute(key, obj[key])
    })

    /* NOTE
        - Thêm child element vào trong phần tử
        - Có các case của đối số truyền vào
            - array
            - element
            - object: comming soon...    
    */
    this.$push = (children) => {
        if (!children) return;
        const type = typeof children;
        switch (type) {
            case "array":
                children.forEach(child => {
                    ele.appendChild(child)
                })
                break;
            default:
                ele.appendChild(children)
                break;
        }
    }

    this.$addClass = (name) => ele.classList.add(name)
    this.$removeClass = (name) => ele.classList.remove(name)
    this.$toggleClass = (name) => ele.classList.toggle(name)

    return ele
}

export default {
    get: $getElement,
    create: $createElement
}