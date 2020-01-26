const menubtn = document.querySelector('.js-menubtn');
const modal = document.querySelector('.js-modal');

menubtn.addEventListener('click', () => {
  menubtn.classList.toggle('active');
  modal.classList.toggle('active');
});