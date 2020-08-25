import {getResource} from '../services/services';


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

export default cards;