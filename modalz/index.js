import "./index.scss"
import $ele, { $pushElement } from "../utils/HtmlElement"

/* 
{
    root: "#app",
} 
*/
export default class ModalZ {
    constructor(obj) {
        const { root } = obj
        // NOTE Khởi tạo các element cần thiết của ModalZ (root, modal, modalBg, Modal, Btn, ModalCtn)
        this.$root = root ? $ele.get(root)(document) : document.body
        this.$modal = $ele.create("div", { id: "modalz", "modalz": "" })
        this.$modalBg = $ele.create("div", { id: "modalz-bg", "modalz-bg": "" })
        this.$modalBtn = $ele.create("div", { id: "modalz-btn", "modalz-btn": "" })
        this.$modalCtn = $ele.create("div", { id: "modalz-ctn", "modalz-ctn": "" })
        this.$buttons = []

        this.initialModal();
    }

    /*  NOTE
        - Gán các thành phần vào modal và thêm vào document
        - * Thêm sự kiện: click btn -> đóng modal
    */
    initialModal() {
        $pushElement(this.$modal)([this.$modalBtn, this.$modalBg, this.$modalCtn])
        $pushElement(this.$root)(this.$modal)
        this.$modalBtn.addEventListener('click', e => {
            this.$modal.classList.remove('open')
            this.$modalCtn.innerHTML = ''
            document.body.style.overflow = 'unset'
        })
    }

    /* NOTE
        - Thêm Button và Content vào modal  
    */
    addContent(obj) {
        const { button, content, options } = obj;
        if (!content) return;
        if (button) {
            const buttonEle = $ele.get(button)(this.$root).addEventListener('click', () => {
                this.$modal.classList.add("open")
                document.body.style.overflow = 'hidden'
            });
            this.$buttons.push(buttonEle);
        } else {
            this.$modal.classList.add("open")
            document.body.style.overflow = 'hidden'
        }
        if (Array.isArray(options)) {
            options.forEach(key => {
                switch (key) {
                    case 'bgClick': {
                        this.$modalBtn.style.display = 'none'
                        this.$modalBg.addEventListener('click', () => {
                            this.$modal.classList.remove("open")
                            document.body.style.overflow = 'unset'
                        })

                        return
                    }
                }
            })
        }
        this.$modalCtn.innerHTML = content
    }
    close() {
        this.$modal.classList.remove("open")
        document.body.style.overflow = 'unset'
        this.$modalCtn.innerHTML = ''
    }
}
