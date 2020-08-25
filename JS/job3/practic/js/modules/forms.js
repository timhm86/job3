import {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

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
            closeModal('.modal');
        }, 4000);

    }


    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res));

}

export default forms;