'use strict';

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClose = document.querySelector('.close');



    modalTrigger.forEach((e) => {
        e.addEventListener('click', function (event) {
            event.preventDefault();
            modal.classList.add('show');
            modal.classList.remove('hide')
        })
    })


