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
            ...methodObject
        }
    }

    lifecycle(lifeCycleObject) {
        this.created = () => null
        this.mounted = () => null
        this.updated = () => null
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

        this.created()

        delete this.dataObject
    }

    mount() {
        // add data to Component from computedObject
        this.initComputed()
        // add Element to Component
        this.initElement()

        this.mounted()
    }

    render() {
        // add data to Component from computedObject
        this.initComputed()
        // add method again before mounted
        this.initMethod()
    }

    async update() {
        await this.updated()
        return this.render()
    }

    // initial Component
    initData() {
        Object.keys(this.dataObject).forEach(key => {
            this[key] = this.dataObject[key]
        })
    }
    initComputed() {
        Object.keys(this.computedObject).forEach(key => {
            if (key === 'storez') {
                this.computedObject.storez.forEach(getter => {
                    const getterObject = getter()
                    Object.keys(getterObject).forEach(getterKey => {
                        this[getterKey] = getterObject[getterKey]
                    })
                });
                return
            }
            if (typeof this.computedObject[key] === 'function') {
                this.computedObject[key] = this.computedObject[key].bind(this)
                this[key] = this.computedObject[key]()
                return
            }
        })
    }
    initMethod() {
        Object.keys(this.methodObject).forEach(key => {
            this[key] = this.methodObject[key].bind(this)
        })
    }
    initElement() {
        Object.keys(this.elementObject).forEach(key => {
            const elementValue = this.elementObject[key]
            if (Array.isArray(elementValue)) {
                this[key] = elementValue[0]
            }
            if (typeof elementValue === 'object') {
                const { element, event: eventList } = elementValue
                if (element) {
                    this[key] = element;
                }
                if (eventList) {
                    Object.keys(eventList).forEach(eventName => {
                        this[key].addEventListener(eventName, this.eventUpdate(eventList[eventName].bind(this)))
                    })
                }
                return;
            }
        })
    }
}