function timer() {
    const deadline = '2023-5-11';

    const getTimeRemaining = (endtime) => {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0,
                seconds = 0,
                minutes = 0,
                hours = 0;
        } else {
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60) % 24));
        }

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
}

module.exports = timer;