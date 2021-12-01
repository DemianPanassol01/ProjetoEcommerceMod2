if (document.querySelector('.alert-dismissible')) {
    setTimeout(() => {
        if (document.querySelector('.alert-dismissible')) {
            document.querySelector('.alert-dismissible').style.display = 'none';
        };
    }, 8000);
};
document.querySelector('.menu-area-mobile').addEventListener('click', function () {
    document.querySelector('.menu-colapse').classList.add('menu-show');
});
document.querySelector('.botao-fechar').addEventListener('click', function () {
    document.querySelector('.menu-colapse').classList.remove('menu-show');
});