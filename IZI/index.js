export default class IZI {
    constructor(props) {
        this.root = document.body
        this.props = props
        this.dataObject = null
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
        Object.keys(eventObject).forEach(element => {
            Object.keys(eventObject[element]).forEach(type => {
                this[element].addEventListener(type, this.eventUpdate(eventObject[element][type].bind(this)))
            })
        })
    }

    eventUpdate(callback) {
        return async (e) => {
            await callback(e)
            return this.reRender();
        }
    }

    data(dataObject) {
        this.dataObject = dataObject
    }

    method(methodObject) {
        Object.keys(methodObject).forEach(key => {
            this[key] = methodObject[key].bind(this)
        })
    }

    lifeCycle(lifeCycleObject) {
        if (lifeCycleObject.mounted) {
            this.mounted = lifeCycleObject.mounted.bind(this)
        }
        if (lifeCycleObject.updated) {
            this.updated = lifeCycleObject.updated.bind(this)
        }
    }

    render() {
        this.mounted()
    }

    // initial Data (after store fetching data)
    create() {
        Object.keys(this.dataObject).forEach(key => {
            if (key === 'mapGetters') {
                const getterObject = this.dataObject[key]()
                Object.keys(getterObject).forEach(getterKey => {
                    this[getterKey] = getterObject[getterKey]
                })
                return
            }
            this[key] = this.dataObject[key]
        })

        delete this.dataObject
    }

    async reRender() {
        await this.updated()
        return this.mounted()
    }

}

// const home = new IZI();

// home.addRoot("#main")

// home.element({
//     '$title': home.getElement("#title"),
//     '$subtitle': home.getElement("#para")
// })

// home.eventListener({
//     '$title': {
//         click(e) {
//             this.title = 'Updatingggg...'
//             this.isClicked = true
//         }
//     }
// })

// home.data({
//     title: "Hello World",
//     isClicked: false,
// })

// home.method({
//     initial() {
//         this.$subtitle.innerHTML = 'This is sub paragraph'
//         this.$title.innerHTML = this.title
//     },
//     updatee() {
//         if (this.isClicked) {
//             this.$subtitle.innerHTML = 'Tui da click roi nha'
//         }
//     }
// })



// home.lifeCycle({
//     mount() {
//         this.initial()
//     },
//     updated() {
//         this.updatee()
//     },
// })


// home.render()

// console.log(home)
