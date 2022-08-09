function tabs() {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    const hideContent = () => {
        tabsContent.forEach((tab) => {
            tab.classList.add('hide');
            tab.classList.remove('show', 'fade');
        })

        tabs.forEach((tab) => {
            tab.classList.remove('tabheader__item_active');
        })
    }

    const showContent = (i = 0) => {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideContent();
    showContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((tab, i) => {
                if (tab === target) {
                    hideContent();
                    showContent(i);
                }
            })
        }
    })
}

module.exports = tabs;