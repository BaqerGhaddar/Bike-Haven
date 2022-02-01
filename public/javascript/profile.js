const myModalEl = document.querySelector('#profile-modal');

async function validatePasswordHandler(event) {
  event.preventDefault();
  const password = $('.old-password-input').val();
  const response = await fetch('/api/users/login/check', {
    method: 'POST',
    body: JSON.stringify({ password }),
    headers: { 'Content-Type': 'application/json' }
  });
  if (response.ok) {
    const result = await response.json();
    if (result.result) {
      const inputEl = $('<input>').attr({
        type: 'password',
        class: `password-setting`
      });
      $('.password-label').text('New Password')
      $('.old-password-form').after(inputEl);
      $('.old-password-form').remove();
    } else {
      const incorrectEl = $('<span>').text(result.message);
      $('.old-password-form').append(incorrectEl);
      return;
    }
  }
}

function editFieldHandler(event) {
  event.preventDefault();

  const spanEl = $(event.target).prev('span');
  const { profileinput } = spanEl.data();
  
  event.target.remove();

  console.log(profileinput);

  if (profileinput == 'password') {
    const oldPasswordFormEl = $('<form>').attr({ class: 'old-password-form' });
    const oldPasswordLabelEl = $('<label>').text('Enter old password');
    const oldPasswordInputEl = $('<input>').attr({
      type: 'password',
      class: 'old-password-input'
    });
    const oldPasswordBtnEl = $('<button>')
      .attr({ type: 'submit' })
      .text('Submit');
    oldPasswordFormEl.append(
      oldPasswordLabelEl,
      oldPasswordInputEl,
      oldPasswordBtnEl
    );
    oldPasswordFormEl.on('submit', validatePasswordHandler);
    spanEl.after(oldPasswordFormEl);
    spanEl.remove();
  }

  const inputEl = $('<input>').attr({
    type: 'text',
    value: spanEl.text(),
    class: `${profileinput}-setting`
  });

  spanEl.after(inputEl);
  spanEl.remove();
}

function saveChangesHandler(event) {
  event.preventDefault();
  const email = $('.email-setting').is('span')
    ? $('.email-setting').text()
    : $('.email-setting').val();

  const username = $('.username-setting').is('span')
    ? $('.username-setting').text()
    : $('.username-setting').val();

  const name = $('.name-setting').is('span')
    ? $('.name-setting').text()
    : $('.name-setting').val();

  console.log('save email: ', email);
}

$(function () {
  $('#profile-modal').on('hidden.bs.modal', function () {
    console.log('hidden');

    $('#profile-modal form')[0].reset();
  });
});

$(function () {
  $('#profile-modal').on('shown.bs.modal', function () {
    console.log('shown');
    $('.edit-btn').on('click', editFieldHandler);
    $('.save-btn').on('click', saveChangesHandler);
  });
});
