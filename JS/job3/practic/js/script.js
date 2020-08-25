import tabs from './modules/tabs';
import timer from './modules/timer';
import calcs from './modules/calcs';
import cards from './modules/cards';
import forms from './modules/forms';
import modal from './modules/modal';
import slides from './modules/slides';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 500000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer','2021-07-09');
    modal('[data-modal]', '.modal', modalTimerId);
    forms('form', modalTimerId);
    slides();
    calcs();
    cards({
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