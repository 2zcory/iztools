export default class IZI {
    constructor(props) {
        this.root = document.body
        this.props = props
        this.dataObject = {}
        this.eventObject = {}
        this.elementObject = {}
        this.computedObject = {}
        this.methodObject = {}
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
        this.elementObject = {
            ...this.elementObject,
            ...elementObject
        }
    }

    computed(computedObject) {
        this.computedObject = {
            ...this.computedObject,
            ...computedObject
        }
    }

    eventListener(eventObject) {
        this.eventListenerObject = {
            ...this.eventObject,
            ...eventObject
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
            ...dataObject
        }
    }

    method(methodObject) {
        this.methodObject = {
            ...this.methodObject,
            methodObject
        }
    }

    lifecycle(lifeCycleObject) {
        if (lifeCycleObject.created) {
            this.created = lifeCycleObject.created.bind(this)
        }
        if (lifeCycleObject.mounted) {
            this.mounted = lifeCycleObject.mounted.bind(this)
        }
        if (lifeCycleObject.updated) {
            this.updated = lifeCycleObject.updated.bind(this)
        }
    }

    // initial Data (after store fetching data)
    create() {
        // add data to Component from dataObject
        this.initData()
        // add data to Component from computedObject
        this.initComputed()
        // add method before created
        this.initMethod()

    }

    mount() {
        this.render()

        delete this.dataObject
        delete this.elementObject
        delete this.eventObject
        delete this.methodObject
        delete this.computedObject
    }

    render() {
        // add data to Component from dataObject
        this.initData()
        // add data to Component from computedObject
        this.initComputed()
        // add Element to Component
        this.initElement()
        // add Event
        this.initEvent()
        // add method again before mounted
        this.initMethod()

        this.mounted()
    }

    async update() {
        await this.updated()
        return this.render()
    }

    // initial Component
    initData() {
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
    }
    initComputed() {
        Object.keys(this.computedObject).forEach(key => {
            if (typeof this.computedObject[key] !== 'function') return
            this.computedObject[key] = this.computedObject[key].bind(this)
            this[key] = this.computedObject[key]()
        })
    }
    initMethod() {
        Object.keys(this.methodObject).forEach(key => {
            this[key] = this.methodObject[key].bind(this)
        })
    }
    initElement() {
        Object.keys(this.elementObject).forEach(key => {
            this[key] = this.elementObject[key]
        })
    }
    initEvent() {
        Object.keys(this.eventObject).forEach(element => {
            Object.keys(this.eventObject[element]).forEach(type => {
                this[element].addEventListener(type, this.eventUpdate(this.eventObject[element][type].bind(this)))
            })
        })
    }

}