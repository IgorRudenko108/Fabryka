(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", (function() {
        let eventCalllback = function(e) {
            let el = e.target, clearVal = el.dataset.phoneClear, pattern = el.dataset.phonePattern, matrix_def = "+8(___) ___-__-__", matrix = pattern ? pattern : matrix_def, i = 0, def = matrix.replace(/\D/g, ""), val = e.target.value.replace(/\D/g, "");
            if ("false" !== clearVal && "blur" === e.type) if (val.length < matrix.match(/([\_\d])/g).length) {
                e.target.value = "";
                return;
            }
            if (def.length >= val.length) val = def;
            e.target.value = matrix.replace(/./g, (function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
            }));
        };
        let phone_inputs = document.querySelectorAll("[data-phone-pattern]");
        for (let elem of phone_inputs) for (let ev of [ "input", "blur", "focus" ]) elem.addEventListener(ev, eventCalllback);
    }));
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date);
        let seconds = Math.floor(t / 1e3 % 60);
        let minutes = Math.floor(t / 1e3 / 60 % 60);
        let hours = Math.floor(t / (1e3 * 60 * 60) % 24);
        return {
            total: t,
            hours,
            minutes,
            seconds
        };
    }
    function initializeClock(id, endtime) {
        let clock = document.getElementById(id);
        let hoursSpan = clock.querySelector(".hours");
        let minutesSpan = clock.querySelector(".minutes");
        let secondsSpan = clock.querySelector(".seconds");
        function updateClock() {
            let t = getTimeRemaining(endtime);
            hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);
            if (t.total <= 0) clearInterval(timeinterval);
        }
        updateClock();
        let timeinterval = setInterval(updateClock, 1e3);
    }
    let deadline = new Date(Date.parse(new Date) + 15 * 24 * 60 * 60 * 1e3);
    initializeClock("countdown", deadline);
    const formBtn = document.querySelectorAll(".form__btn");
    const formBody = document.querySelectorAll(".form__body");
    const formSuccess = document.querySelectorAll(".form__success");
    let formBtnArray = [];
    formBtn.forEach((el => {
        formBtnArray.push(el);
    }));
    let formBodyArray = [];
    formBody.forEach((elem => {
        formBodyArray.push(elem);
    }));
    let formSuccessArray = [];
    formSuccess.forEach((elem => {
        formSuccessArray.push(elem);
    }));
    for (let i = 0; i < formBtnArray.length; i++) if (formBtn) formBtnArray[i].addEventListener("click", (function(e) {
        e.preventDefault();
        formBodyArray[i].classList.add("form__close");
        formSuccessArray[i].classList.add("success__open");
    }));
    "use strict";
    window.addEventListener("load", windowLoad);
    function windowLoad() {
        function digitsCountersInit(digitsCountersItems) {
            let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
            if (digitsCounters.length) digitsCounters.forEach((digitsCounter => {
                digitsCountersAnimate(digitsCounter);
            }));
        }
        function digitsCountersAnimate(digitsCounter) {
            let startTimestamp = null;
            const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 3e3;
            const startValue = parseInt(digitsCounter.innerHTML);
            const startPosition = 0;
            const step = timestamp => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
                if (progress < 1) window.requestAnimationFrame(step);
            };
            window.requestAnimationFrame(step);
        }
        let options = {
            threshold: .3
        };
        let observer = new IntersectionObserver(((entries, observer) => {
            entries.forEach((entry => {
                if (entry.isIntersecting) {
                    const targetElement = entry.target;
                    const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
                    if (digitsCountersItems.length) digitsCountersInit(digitsCountersItems);
                    observer.unobserve(targetElement);
                }
            }));
        }), options);
        let sections = document.querySelectorAll(".counter-section");
        if (sections.length) sections.forEach((section => {
            observer.observe(section);
        }));
    }
})();