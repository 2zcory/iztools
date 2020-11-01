export default (obj) => {

    const { button, content, activeButton, mode } = obj;
    const root = document.querySelector(obj.root) || document;
    const showContent = obj.showContent || 'show';
    let showObjList = {};
    let showArrList = [];
    let currentShow = null;

    const buttonsEle = root.querySelectorAll(button);
    const contentsEle = root.querySelectorAll(content);
    const defaultContent = root.querySelector(`${content}[iz-default]`);

    // reset content active và khởi tạo giá trị cho showObjList
    contentsEle.forEach((content, i) => {
        content.classList.remove(showContent);

        const key = content.dataset.show;
        showObjList[key] = false;
    })

    // Khởi tạo giá trị cho showArrList
    Object.keys(showObjList).forEach(key => {
        showArrList.push(key);
    })

    // setContent active
    if (defaultContent) {
        const key = defaultContent.dataset.show;
        showObjList[key] = true;
        currentShow = showArrList.findIndex(item => item === key);
        contentsEle.forEach(content => {
            if (content.dataset.show === showArrList[currentShow]) {
                content.classList.add(showContent);
            }
        })
    } else {
        const key = contentsEle[0].dataset.show;
        showObjList[key] = true;
        currentShow = showArrList.findIndex(item => item === key);
        contentsEle.forEach(content => {
            if (content.dataset.show === showArrList[currentShow]) {
                content.classList.add(showContent);
            }
        })
    }

    // tablist
    buttonsEle.forEach((btn, i, btnList) => {
        if (activeButton) {
            btn.classList.remove(activeButton)
            if (btn.dataset.show === showArrList[currentShow]) {
                btn.classList.add(activeButton)
            }
        }

        switch (mode) {
            case 'tablist': {
                btn.addEventListener('click', e => {
                    const key = btn.dataset.show;
                    currentShow = showArrList.findIndex(item => item === key);

                    if (activeButton) {
                        btnList.forEach(btnItem => {
                            btnItem.classList.remove(activeButton)

                        })
                        btn.classList.add(activeButton)
                    }

                    contentsEle.forEach(content => {
                        content.classList.remove(showContent);
                        if (content.dataset.show === showArrList[currentShow]) {
                            content.classList.add(showContent);
                        }
                    })
                })
                break;
            }
            case 'slide': {
                const { hideButtonOnDisable } = obj;

                if (hideButtonOnDisable) {
                    switch (btn.dataset.action) {
                        case 'prev':
                            btn.style.display = currentShow === 0 ? 'none' : hideButtonOnDisable;
                            break;
                        case 'next':
                            btn.style.display = currentShow === (showArrList.length - 1) ? 'none' : hideButtonOnDisable;
                            break;
                        default:
                            break;
                    }
                }

                btn.addEventListener('click', e => {
                    const key = btn.dataset.action; // 'next' or 'prev'



                    if (key === 'next') {
                        if (currentShow === (showArrList.length - 1)) return;
                        ++currentShow;
                    } else if (key === 'prev') {
                        if (currentShow === 0) return;
                        --currentShow;
                    } else return;

                    contentsEle.forEach(content => {
                        content.classList.remove(showContent);
                        if (content.dataset.show === showArrList[currentShow]) {
                            content.classList.add(showContent);
                        }
                    })

                    btnList.forEach(btnItem => {
                        if (hideButtonOnDisable) {
                            switch (btnItem.dataset.action) {
                                case 'prev':
                                    btnItem.style.display = currentShow === 0 ? 'none' : hideButtonOnDisable;
                                    break;
                                case 'next':
                                    btnItem.style.display = currentShow === (showArrList.length - 1) ? 'none' : hideButtonOnDisable;
                                    break;
                                default:
                                    break;
                            }
                        }
                    })

                })
            }
        }
    })


}
