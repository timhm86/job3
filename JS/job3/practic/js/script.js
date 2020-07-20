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
            return `0 ${num}`;
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
          modalClose = document.querySelector('[data-close]'),
          modal = document.querySelector('.modal');

    modalOpen.forEach((item) => {

        item.addEventListener('click', openModal);

    });

    function openModal () {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal () {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

//    const modalTimerId = setTimeout(openModal, 5000);


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

    new MenuItem (
        'vegy.jpg', 
    'vegy', 
    'Меню “Фитнес“', 
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    '9',
    '.menu__field .container '
    ).createMenu();

    new MenuItem ('elite.jpg', 
    'elite', 
    'Меню “Премиум“',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    '19',
    '.menu__field .container '
    ).createMenu();

    new MenuItem ('post.jpg', 
    'post', 
    'Меню “Постное“',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    '14',
    '.menu__field .container '
    ).createMenu();   
            
//
    




});





