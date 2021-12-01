document.querySelector('.sec-9').addEventListener('click', (e) => {
    let value = e.target;
    if (value.classList.contains('btn') === true) {
           let v = value.id - 1;
           let i = document.querySelectorAll('.btn-duvida-frequente')[v].children[0];
           if (i.classList.contains('rotate180Deg')) {
               i.classList.remove('rotate180Deg')
           } else {
               i.classList.add('rotate180Deg')
           };
    };
});