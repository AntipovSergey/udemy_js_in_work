window.addEventListener('DOMContentLoaded', () => {

    // Tabs
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

    // Date

    const deadline = '2023-5-11';

    const getTimeRemaining = (endtime) => {
        const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor( (t / (1000 * 60 * 60 * 24)) ),
                seconds = Math.floor( (t / 1000) % 60 ),
                minutes = Math.floor( (t / 1000/60) % 60 ),
                hours = Math.floor( (t / (1000 * 60 * 60) % 24) );

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds');

        const updateClock = () => {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInteval);
            }
        }

        updateClock();

        timeInteval = setInterval(updateClock, 1000);
    };

    setClock('.timer', deadline);
})