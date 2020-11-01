/*
    obj: {
        tabNav: "",
        tabContent: "",
        tabMark: "",
        contentMark: "",
    }
*/

export default tabtab = (obj) => {
    const { tabNav, tabContent } = obj;
    const tabMark = obj.tabMark || "active";
    const contentMark = obj.contentMark || "show";

    const tabList = document.querySelectorAll(tabNav);
    const tabNavDefault = document.querySelector(`${tabNav}[iz-default]`);
    const contentList = document.querySelectorAll(tabContent);

    let currentId = null;

    if (tabNavDefault) {
        tabNavDefault.classList.add(tabMark);
        currentId = tabNavDefault.dataset.tabid;
    } else {
        tabList[0].classList.add(tabMark)
        currentId = tabList[0].dataset.tabid;
    }

    contentList.forEach(content => {
        content.classList.remove(contentMark);
        if (content.dataset.tabid === currentId) {
            content.classList.add(contentMark);
        }
    })


    tabList.forEach((tab, i, list) => {
        tab.addEventListener('click', e => {
            currentId = e.target.dataset.tabid;


            list.forEach(item => {
                item.classList.remove(tabMark);
            })

            contentList.forEach(content => {
                content.classList.remove(contentMark);
                if (content.dataset.tabid === currentId) {
                    content.classList.add(contentMark);
                }
            })

            tab.classList.add(tabMark);
        })
    })
}