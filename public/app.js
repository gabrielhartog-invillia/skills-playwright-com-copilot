const form = document.querySelector('form');
const status = document.querySelector('[role="status"]');
const cancelButton = document.querySelector('#cancelar');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.hidden = true;
  cancelButton.hidden = false;
  status.textContent = 'Inscrição confirmada!';
});

cancelButton.addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  cancelButton.hidden = true;
  status.textContent = 'Inscrição cancelada!';
});
