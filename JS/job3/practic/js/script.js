window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function  showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');    
           tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
        }
    });

    
        //Timer
    
    const deadline  = '2020-07-09';
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

    function getZero(num) {
        if (num >=0 && num <10) {
            return `0${num}`;
        }
        else {
        return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval (updateClock, 1000);

        updateClock();

        function updateClock () {
            const t = getTimerRemaining(endtime);

            days.innerHTML  = getZero(t.days);
            hours.innerHTML  = getZero(t.hours);
            minutes.innerHTML  = getZero(t.minutes);
            seconds.innerHTML  = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }
    }

    setClock('.timer', deadline);


    // Modal window

    const modalOpen = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    modalOpen.forEach((item) => {

        item.addEventListener('click', openModal);

    });

    function openModal () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

 const modalTimerId = setTimeout(openModal, 500000);


    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для карточек


    class MenuItem {
        constructor (imgSrc, altImg, menuItemSubtitle, menuItemDescr,  menuItemPrice, parentSelector, ...classes) {
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
            this.price = this.price*this.transfer;
        }

        createMenu () {

            const div = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                div.classList.add(this.element);
            } 
            else {
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

    const getResource = async function (url){
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`Error server ${url} status ${res.status}`);
                
            }
        return await res.json();

    };
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
        .then( data => {
            data.data.forEach(({imgSrc, altImg, menuItemSubtitle, menuItemDescr,  menuItemPrice}) => { // деструктаризация объекта на его свойства
                new MenuItem(imgSrc, altImg, menuItemSubtitle, menuItemDescr,  menuItemPrice, '.menu__field .container ').createMenu();
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
            
// Forms

        const forms = document.querySelectorAll('form');

        const message = {
            loading: 'img/form/spinner.svg',
            success: 'Все успешно загружено. Мы с вами свяжемся',
            faiure: 'Что-то пошло не так...'
        };

        forms.forEach(item => {
            bindPostData(item);
        });

        const postData = async function (url, data){
            const res = await fetch(url, {
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });

            return await res.json();

        };

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
                postData('http://localhost:3000/requests', json)
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


    function showThanksModal (message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

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
            closeModal();
        }, 4000);

    }


    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));


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

    const slides = document.querySelectorAll('.offer__slide'),
          next = document.querySelector('.offer__slider-next'),
          prev = document.querySelector('.offer__slider-prev'),
          current = document.querySelector('#current'),
          total = document.querySelector('#total'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;


    let slideIndex = 1,
        offset = 0;

    function deleteNotDigits (str) {
        return +str.replace(/\D/g, '');
    }
    

// анимировааный слайдер

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    if (slides.length < 10 ) {
        total.textContent = getZero(slides.length);
        current.textContent = getZero(slideIndex);
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slides.forEach(slide => {
        slide.style.width = width;
    });


    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)){
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

        getZeroSlides ();

        activeDot ();
    });


    prev.addEventListener('click', () => {
        if (offset == 0){
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
        getZeroSlides ()


        activeDot ();
    });


    function getZeroSlides () {
        if (slides.length < 10 ) {
            current.textContent = getZero(slideIndex);
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

    const offerSlider = document.querySelector('.offer__slider'),
          carouselIndicators =  document.createElement('ol'),
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

    function activeDot () {
        for (let i = 0; i < slides.length; i++) {
            dot[i].style.opacity = '0.5';
        }
        dot[slideIndex - 1].style.opacity = '1';
    }

    activeDot ();

    const dots = document.querySelectorAll('.dot');


    dots.forEach( (event, index) => {

        event.addEventListener('click', () => {
            offset = deleteNotDigits(width);
            

            slideIndex = index +1;

            getZeroSlides ();
            
            offset *= index;

            slidesField.style.transform = `translateX(-${offset}px)`;

            activeDot ();
    });
    });





    
});





