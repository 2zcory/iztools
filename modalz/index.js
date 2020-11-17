import "index.css"
import { createEle, getEle } from "../utils"

/* 
{
    root: "#app",
} 
*/

class ModalZ {
    constructor(obj) {
        this.root = obj.root ? getEle(document, obj.root) : document.body

        const { modal, modalCtn } = this.initialModal()
        const btnOpenList = []

        this.addBtnOpen = (ele) => {
            btnOpenList.push(ele)
            btnOpenList.forEach(btn =>
                getEle(root, btn).addEventListener('click', e => modal.classList.add('open'))
            )
        }

        this.addContent = (htmlContent) => {
            modalCtn.innerHTML = htmlContent
        }
    }

    initialModal() {
        const modal = createEle("div", { id: "modalz", "modalz": "" })
        const modalBg = createEle("div", { id: "modalz-bg", "modalz-bg": "" })
        const modalBtn = createEle("div", { id: "modalz-btn", "modalz-btn": "" })
        const modalCtn = createEle("div", { id: "modalz-ctn", "modalz-ctn": "" })
        modal.appendChild(modalCtn)
        modal.appendChild(modalBtn)
        modal.appendChild(modalBg)
        this.root.appendChild(modal)

        modalBtn.addEventListener('click', e => modal.classList.remove('open'))

        return { modalCtn, modalBtn, modalBg, modal }
    }
}
