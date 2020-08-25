function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, classActivity) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector),//'.tabheader__item'
        tabsContent = document.querySelectorAll(tabsContentSelector),//'.tabcontent'
        tabsParent = document.querySelector(tabsParentSelector);//'.tabheader__items'

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(classActivity);//'tabheader__item_active'
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(classActivity);//'tabheader__item_active'
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;

