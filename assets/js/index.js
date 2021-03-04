var register = document.querySelector('.register'),
    registerBtn = document.querySelector('.register-header'),
    textBody = document.querySelector('.text-body'),
    mobileHero = document.querySelector('.mobile-hero'),
    mobileBottom = document.querySelector('.mobile-bottom');

registerBtn.addEventListener('click', () => {

    if (!register.classList.contains('active')) {
        textBody.classList.add('fade');
        mobileHero.classList.add('fade');

        setTimeout(() => {
            mobileBottom.classList.add('hide');
            mobileHero.classList.add('hide');
            textBody.classList.add('remove');
            register.classList.add('active');

        }, 0);
    }
    if (register.classList.contains('active')) {
        register.classList.remove('active');
        setTimeout(() => {
            textBody.classList.remove('remove');
            mobileBottom.classList.remove('hide');
            mobileHero.classList.remove('fade');
            setTimeout(() => {
                textBody.classList.remove('fade');
                mobileHero.classList.remove('hide');
            }, 10);
        }, 350);
    }
});