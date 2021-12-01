const f = document.querySelector('.btn-close-flash');
if (f) {
    f.addEventListener('click', () => {
        f.parentElement.remove();
    });
    setTimeout(() => {
        if (f) {
            f.parentElement.remove();
        }
    }, 8000);
};