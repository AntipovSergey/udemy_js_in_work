function forms() {
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо, скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...',
    }

    forms.forEach(form => bindPostData(form));

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: data,
        })

        return await result.json();
    }

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', message.loading);
            statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                })
        })
    }

    function showThanksModal(message) {
        const previousModalDialog = document.querySelector('.modal__dialog');

        previousModalDialog.classList.add('hide');
        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div>
                </div>
            `;

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            previousModalDialog.classList.add('show');
            previousModalDialog.classList.remove('hide');
            closeModal();
        }, 2000)
    }
}

module.exports = forms;