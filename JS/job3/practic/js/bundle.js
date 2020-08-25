/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/modules/calcs.js":
/*!*****************************!*\
  !*** ./js/modules/calcs.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (calcs);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function cards() {
    // Используем классы для карточек


    class MenuItem {
        constructor(imgSrc, altImg, menuItemSubtitle, menuItemDescr, menuItemPrice, parentSelector, ...classes) {
            this.img = imgSrc;
            this.alt = altImg;
            this.subtitle = menuItemSubtitle;
            this.descr = menuItemDescr;
            this.price = menuItemPrice;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH();
            this.parentSelector = document.querySelector(parentSelector);

        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        createMenu() {

            const div = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                div.classList.add(this.element);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            div.innerHTML = `                
            <img src="img/tabs/${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;

            this.parentSelector.append(div);
        }

    }


    // 1 вариант построения карточек
    // getResource('http://localhost:3000/menu')
    //     .then( data => {
    //         data.forEach(({imgSrc, altImg, menuItemSubtitle, menuItemDescr,  menuItemPrice}) => { // деструктаризация объекта на его свойства
    //             new MenuItem(imgSrc, altImg, menuItemSubtitle, menuItemDescr,  menuItemPrice, '.menu__field .container ').createMenu();
    //         });
    //     }
    //     );

    // 2 вариант построения карточек через axios

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                imgSrc,
                altImg,
                menuItemSubtitle,
                menuItemDescr,
                menuItemPrice
            }) => { // деструктаризация объекта на его свойства
                new MenuItem(imgSrc, altImg, menuItemSubtitle, menuItemDescr, menuItemPrice, '.menu__field .container ').createMenu();
            });
        });



    // 3 вариант построения карточек через динамическое создание элементов
    // getResource('http://localhost:3000/menu')
    //     .then( data => createCard(data));

    // function createCard(data) {
    //     data.forEach(({imgSrc, altImg, menuItemSubtitle, menuItemDescr,  menuItemPrice}) => {
    //         const card = document.createElement('div');
    //         card.classList.add('menu__item');

    //         card.innerHTML = `                
    //         <img src="img/tabs/${imgSrc}" alt="${altImg}">
    //         <h3 class="menu__item-subtitle">${menuItemSubtitle}</h3>
    //         <div class="menu__item-descr">${menuItemDescr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${menuItemPrice}</span> грн/день</div>
    //         </div>`;

    //         document.querySelector('.menu__field .container').append(card);
    //     });
    // }

    // new MenuItem (
    //     'vegy.jpg', 
    // 'vegy', 
    // 'Меню “Фитнес“', 
    // 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    // '9',
    // '.menu__field .container '
    // ).createMenu();

    // new MenuItem ('elite.jpg', 
    // 'elite', 
    // 'Меню “Премиум“',
    // 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    // '19',
    // '.menu__field .container '
    // ).createMenu();

    // new MenuItem ('post.jpg', 
    // 'post', 
    // 'Меню “Постное“',
    // 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    // '14',
    // '.menu__field .container '
    // ).createMenu();   
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);// 'form'

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Все успешно загружено. Мы с вами свяжемся',
        faiure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            width: 20px;
            display: block;
            margin: 0 auto;
        `;
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'multipart/form-data'); не надо устанавливать для FormData
            // request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);


            // преобразование данных с формы в объект (старый код)
            // const object = {};
            // formData.forEach(function(value, key){
            //     object[key] = value;
            // });


            // преобразование данных с формы в объект и потом в json формат (новый код)
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // const json = JSON.stringify(object);

            // fetch('server.php', {
            //     method:'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)
            // })
            Object(_services_services__WEBPACK_IMPORTED_MODULE_1__["postData"])('http://localhost:3000/requests', json)
                // .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.faiure);
                })
                .finally(() => {
                    form.reset();
                });


            // request.send(json);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.faiure);
            //     }
            // });

        });
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        Object(_modal__WEBPACK_IMPORTED_MODULE_0__["openModal"])('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class = "modal__content">
                <div data-close="" class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            Object(_modal__WEBPACK_IMPORTED_MODULE_0__["closeModal"])('.modal');
        }, 4000);

    }


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! exports provided: default, openModal, closeModal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openModal", function() { return openModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeModal", function() { return closeModal; });
function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {
    // Modal window

    const modalOpen = document.querySelectorAll(triggerSelector),//'[data-modal]'
        modal = document.querySelector(modalSelector);//'.modal'

    modalOpen.forEach((item) => {

        item.addEventListener('click', () =>  openModal(modalSelector, modalTimerId));

    });



    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slides.js":
/*!******************************!*\
  !*** ./js/modules/slides.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./js/modules/timer.js");



function slides({container, slide, nextArow, prevArow, totalCounter, currentCounter, wrapper, field}) {
    //Слайды

    // мой вариант
    // const arrSlides = [
    //     '<img src="img/slider/pepper.jpg" alt="pepper">',
    //     '<img src="img/slider/food-12.jpg" alt="food">',
    //     '<img src="img/slider/olive-oil.jpg" alt="oil">',
    //     '<img src="img/slider/paprika.jpg" alt="paprika">',
    // ];

    // const nextSlider = document.querySelector('.offer__slider-next'),
    //       previosSlider = document.querySelector('.offer__slider-prev'),
    //       currentSlide = document.querySelector('#current'),
    //       slide = document.querySelector('.offer__slide');
    //       console.log(currentSlide);

    // function nextSlides (item, i) {
    //     slide.innerHTML = '';
    //     currentSlide.textContent = '';
    //     const num = getZero(i+1);
    //     currentSlide.textContent= `${num}`;
    //     slide.innerHTML = `${item}`;
    // }
    // nextSlides(arrSlides[0],0);
    // let index = 0;
    // nextSlider.addEventListener('click', () => {
    //     index++;
    //     if (index === 4) {
    //         index = 0;
    //     }
    //     nextSlides(arrSlides[index], index);
    // });

    // previosSlider.addEventListener('click', () => {
    //     index--;
    //     if (index === -1) {
    //         index = 3;
    //     }
    //     nextSlides(arrSlides[index],index);
    // });

    const slides = document.querySelectorAll(slide),
        next = document.querySelector(nextArow),
        prev = document.querySelector(prevArow),
        current = document.querySelector(currentCounter),
        total = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1,
        offset = 0;

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '');
    }


    // анимировааный слайдер

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    if (slides.length < 10) {
        total.textContent = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slides.length);
        current.textContent = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });


    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        getZeroSlides();

        activeDot();
    });


    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        getZeroSlides()


        activeDot();
    });


    function getZeroSlides() {
        if (slides.length < 10) {
            current.textContent = Object(_timer__WEBPACK_IMPORTED_MODULE_0__["getZero"])(slideIndex);
        } else {
            current.textContent = slideIndex;
        }
    }

    // вариант без анимированного слайдера

    // showSlides(slideIndex);

    // if (slides.length < 10 ) {
    //     total.textContent = getZero(slides.length);
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides (n) {
    //     if (n > slides.length ) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none')

    //     slides[slideIndex - 1].style.display = 'block';

    //     current.textContent = getZero(slideIndex);
    // }

    // function plusSides (n) {
    //     showSlides(slideIndex += n);
    // }

    // next.addEventListener('click', () => {
    //     plusSides(1);
    // });

    // prev.addEventListener('click', () => {
    //     plusSides(-1);
    // });

    // точки в слайдере

    const offerSlider = document.querySelector(container),
        carouselIndicators = document.createElement('ol'),
        dot = [];

    offerSlider.style.position = 'relative';

    carouselIndicators.classList.add('carousel-indicators');
    carouselIndicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    offerSlider.append(carouselIndicators);

    for (let i = 0; i < slides.length; i++) {
        dot[i] = document.createElement('li');
        dot[i].classList.add('dot');
        dot[i].style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        carouselIndicators.append(dot[i]);


    }

    function activeDot() {
        for (let i = 0; i < slides.length; i++) {
            dot[i].style.opacity = '0.5';
        }
        dot[slideIndex - 1].style.opacity = '1';
    }

    activeDot();

    const dots = document.querySelectorAll('.dot');


    dots.forEach((event, index) => {
        event.addEventListener('click', () => {
            offset = deleteNotDigits(width);
            slideIndex = index + 1;
            getZeroSlides();
            offset *= index;
            slidesField.style.transform = `translateX(-${offset}px)`;
            activeDot();
        });
    });

}

/* harmony default export */ __webpack_exports__["default"] = (slides);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (tabs);



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! exports provided: default, getZero */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZero", function() { return getZero; });
function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}



function timer(id, deadline) {
    //Timer

    // const deadline = '2021-07-09';
    // console.log(new Date());
    function getTimerRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds

        };

    }



    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimerRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    setClock(id, deadline);//'.timer'
}

/* harmony default export */ __webpack_exports__["default"] = (timer);


/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calcs */ "./js/modules/calcs.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slides__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slides */ "./js/modules/slides.js");









window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => Object(_modules_modal__WEBPACK_IMPORTED_MODULE_5__["openModal"])('.modal', modalTimerId), 500000);

    Object(_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    Object(_modules_timer__WEBPACK_IMPORTED_MODULE_1__["default"])('.timer','2021-07-09');
    Object(_modules_modal__WEBPACK_IMPORTED_MODULE_5__["default"])('[data-modal]', '.modal', modalTimerId);
    Object(_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])('form', modalTimerId);
    Object(_modules_slides__WEBPACK_IMPORTED_MODULE_6__["default"])();
    Object(_modules_calcs__WEBPACK_IMPORTED_MODULE_2__["default"])();
    Object(_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArow: '.offer__slider-next',
        prevArow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

    

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! exports provided: postData, getResource */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postData", function() { return postData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getResource", function() { return getResource; });
const postData = async function (url, data) {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();

};

const getResource = async function (url) {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Error server ${url} status ${res.status}`);

    }
    return await res.json();

};




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map