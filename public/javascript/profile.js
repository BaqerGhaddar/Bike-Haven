const myModalEl = document.querySelector('#profile-modal');

function resetModal() {
  $('.account-settings')
    .find('div input')
    .each(function () {
      const inputType = $(this).data('profileinput');
      // prettier-ignore
      $(this).replaceWith(
        `<span class="${$(this).attr('class')}" data-profileInput=" ${inputType}"> ${this.value}</span>`
      );
      const editEl = $('<button>')
        .attr({ type: 'button', class: `btn edit-btn ${inputType}-edit` })
        .text('Edit');
      $(`.${$(this).attr('class')}`).after(editEl);
    });
}

function resetPasswordEl() {
  $('#password-div')
    .replaceWith(`<div class='account-form-wrapper' id='password-div'>
    <label class='password-label'>Password: </label>
    <span
      class='password-setting'
      data-profileInput='password'
    ></span>
    <button
      type='button'
      class='btn edit-btn password-edit'
    >Edit</button>
  </div>`);
}

async function validatePasswordHandler(event) {
  event.preventDefault();
  $('#error-password').remove();
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
      $('.password-label').text('New Password');
      $('.old-password-form').after(inputEl);
      $('.old-password-form').remove();
    } else {
      const incorrectEl = $('<span id="error-password">').text(result.message);
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

  if (profileinput == 'password') {
    const oldPasswordFormEl = $('<form>').attr({ class: 'old-password-form' });
    const oldPasswordLabelEl = $('<label>').text('Enter old password');
    const oldPasswordInputEl = $('<input>').attr({
      type: 'password',
      class: 'old-password-input input-field',
      'data-profileinput': $(this).data().profileinput
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

  const inputEl = $('<input>')
    .attr({
      type: 'text',
      value: spanEl.text(),
      class: `${profileinput}-setting`
    })
    .data('profileinput', profileinput);

  spanEl.after(inputEl);
  spanEl.remove();
}

async function saveChangesHandler(event) {
  event.preventDefault();
  resetModal();
  const email = $('.email-setting').text().trim();

  const username = $('.username-setting').text().trim();

  const name = $('.name-setting').text().trim();

  const password = $('.password-setting').text().trim();

  const body = password ? { email, username, password, name } : { email, username };

  console.log(body);
  resetPasswordEl();
  $(function () {
    $('#profile-modal').modal('toggle');
  });

  const response = await fetch('/api/users', {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });

  response.ok ? document.location.reload() : alert(response.statusText);
}

$(function () {
  $('#profile-modal').on('hidden.bs.modal', function () {
    console.log('hidden');
    resetModal();
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
