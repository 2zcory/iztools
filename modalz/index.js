import "index.css"
import $ele from "../utils/HtmlElement"

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
        this.addContent;
    }

    /*  NOTE
        - Gán các thành phần vào modal và thêm vào document
        - * Thêm sự kiện: click btn -> đóng modal
    */
    initialModal() {
        this.$modal.$push([this.$modalBtn, this.$modalBg, this.$modalCtn])
        this.$root.appendChild(this.$modal)
        modalBtn.addEventListener('click', e => this.$modal.$removeClass('open'))
    }

    /* NOTE
        - Thêm Button và Content vào modal  
    */
    addContent(obj) {
        const { button, content } = obj;
        const buttonEle
            = $ele.get(button)(this.$root)
                .addEventListener('click', () => this.$modal.$addClass("open"));
        this.$buttons.push(buttonEle);
        this.$modalCtn.innerHTML = content
    }
}
