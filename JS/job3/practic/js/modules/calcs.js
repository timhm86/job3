function calcs() {
    // Калькулятор

    const resultCall = document.querySelector(".calculating__result span");
    let sex,
        height,
        weight,
        age,
        activity;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }

    if (localStorage.getItem('height')) {
        height = localStorage.getItem('height');

    }

    if (localStorage.getItem('weight')) {
        weight = localStorage.getItem('weight');
    }

    if (localStorage.getItem('age')) {
        age = localStorage.getItem('age');
    }

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = '1.375';
        localStorage.setItem('activity', activity);
    }


    function calcResult() {
        if (!sex || !height || !weight || !age || !activity) {
            resultCall.textContent = '____';
            return;
        } else {
            if (sex === 'female') {
                resultCall.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
            } else {
                resultCall.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
            }
        }

    }

    function initStaticValue(select, classActivity) {
        const elements = document.querySelectorAll(select);

        elements.forEach((event) => {
            event.classList.remove(classActivity);
            if (event.getAttribute('data-activity') === activity) {
                event.classList.add(classActivity);
            }

            if (event.getAttribute('id') === sex) {
                event.classList.add(classActivity);
            }
        });
    }

    function getStaticInformation(select, classActivity) {
        const elements = document.querySelectorAll(select);

        elements.forEach((event) => {

            event.addEventListener('click', (e) => {

                if (e.target.getAttribute('data-activity')) {
                    activity = +e.target.getAttribute('data-activity');
                    localStorage.setItem('activity', activity);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
                elements.forEach((event) => {
                    event.classList.remove(classActivity);
                });
                event.classList.add(classActivity);
                calcResult();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');
    initStaticValue('#gender div', 'calculating__choose-item_active');
    initStaticValue('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDinamicInformation(select) {
        const input = document.querySelector(select);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    localStorage.setItem('height', height);
                    break;
                case 'weight':
                    weight = +input.value;
                    localStorage.setItem('weight', weight);
                    break;
                case 'age':
                    age = +input.value;
                    localStorage.setItem('age', age);
                    break;
            }

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            calcResult();
        });

    }

    getDinamicInformation('#height');
    getDinamicInformation('#weight');
    getDinamicInformation('#age');
}

export default calcs;