export default class IZI {
    constructor(props) {
        this.root = document.body
        this.props = props
        this.dataObject = {}
        this.eventObject = {}
    }

    addRoot(root) {
        const newRoot = document.querySelector(root)
        if (!newRoot) return
        this.root = newRoot
    }

    getElement(selector) {
        return this.root.querySelector(selector)
    }

    getAllElement(selector) {
        return this.root.querySelectorAll(selector)
    }

    element(elementObject) {
        Object.keys(elementObject).forEach(key => {
            this[key] = elementObject[key]
        })
    }

    eventListener(eventObject) {
        this.eventListenerObject = {
            ...this.eventObject,
            eventObject
        }
    }

    eventUpdate(callback) {
        return async (e) => {
            await callback(e)
            return this.update();
        }
    }

    data(dataObject) {
        this.dataObject = {
            ...this.dataObject,
            dataObject
        }
    }

    method(methodObject) {
        Object.keys(methodObject).forEach(key => {
            this[key] = methodObject[key].bind(this)
        })
    }

    lifeCycle(lifeCycleObject) {
        if (lifeCycleObject.mounted) {
            this.mount = lifeCycleObject.mount.bind(this)
        }
        if (lifeCycleObject.updated) {
            this.updated = lifeCycleObject.updated.bind(this)
        }
    }

    // initial Data (after store fetching data)
    create() {
        Object.keys(this.dataObject).forEach(key => {
            if (key === 'storez') {
                this.dataObject.storez.forEach(getter => {
                    const getterObject = getter()
                    Object.keys(getterObject).forEach(getterKey => {
                        this[getterKey] = getterObject[getterKey]
                    })
                });
                return
            }
            this[key] = this.dataObject[key]
        })

        delete this.dataObject
    }

    render() {
        this.mount()
        // add Event
        Object.keys(this.eventObject).forEach(element => {
            Object.keys(this.eventObject[element]).forEach(type => {
                this[element].addEventListener(type, this.eventUpdate(this.eventObject[element][type].bind(this)))
            })
        })
    }


    async update() {
        await this.updated()
        return this.mounted()
    }

}