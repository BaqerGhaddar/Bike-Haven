const myModalEl = document.querySelector('#profile-modal');

function previewFile() {
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener(
    'load',
    function () {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function saveModal() {
  $('.field-input').each(function () {
    $(this).prev().text($(this).val()).show();
    $(this).remove();
  });
}

function resetModal() {
  $('.field-input').each(function () {
    $(this).prev().show();
    $(this).remove();
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
        class: `password-setting password-input`
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

  $(this).hide();

  if (profileinput == 'password') {
    const oldPasswordFormEl = $('<form>').attr({ class: 'old-password-form' });
    const oldPasswordLabelEl = $('<label>').text('Enter old password');
    const oldPasswordInputEl = $('<input>').attr({
      type: 'password',
      class: 'old-password-input',
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
    spanEl.hide();
  } else {
    const inputEl = $('<input>')
      .attr({
        type: 'text',
        value: spanEl.text(),
        class: `${profileinput}-setting field-input`
      })
      .data('profileinput', profileinput);

    spanEl.after(inputEl);
    spanEl.hide();
  }
}

async function saveChangesHandler(event) {
  event.preventDefault();
  const old_username = $('.username-setting').text().trim();
  saveModal();
  const email = $('.email-setting').text().trim();

  const username = $('.username-setting').text().trim();

  const name = $('.name-setting').text().trim();

  const password = $('.password-input').val();

  const body = password
    ? { email, username, password, name, old_username }
    : { email, username, name, old_username };

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

function changeAvatarHandler(event) {
  $('#avatar-button').hide();
  $('.image-form-wrapper').show();
}

function changeAvatarFormHandler(event) {
  event.preventDefault();
  console.log('here');
  const avatarData = new FormData();
  const files = $('#input-file')[0].files;
  if (files.length > 0) {
    avatarData.append('file', files[0]);
  }
  $.ajax({
    url: '/api/upload',
    data: avatarData,
    cache: false,
    contentType: false,
    processData: false,
    method: 'POST',
    error: function (request, error) {
      console.log(arguments);
      alert(" Can't do because: " + error);
    },
    success: function (msg) {
      if (!alert(msg)) {
        window.location.reload();
      }
    }
  });
}

$(function () {
  $('#profile-modal').on('hidden.bs.modal', function () {
    $('.image-form-wrapper').hide();
    $('#avatar-button').show();
    resetModal();
    resetPasswordEl();

    $('.password-input').remove();
    $('#profile-modal form')[0].reset();
  });
});

$(function () {
  $('#profile-modal').on('shown.bs.modal', function () {
    console.log('shown');
    $('.image-form-wrapper').hide();

    $('.edit-btn').on('click', editFieldHandler);
    $('.save-btn').on('click', saveChangesHandler);
  });
});

$('.cart-btn').on('click', function () {
  document.location.replace('/wishlist');
});

$('.image-form-wrapper').hide();

$('#avatar-button').on('click', changeAvatarHandler);
$('#change-avatar-button').on('click', changeAvatarFormHandler);
