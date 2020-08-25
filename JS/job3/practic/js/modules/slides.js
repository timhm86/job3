import {getZero} from './timer';


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

export default slides;