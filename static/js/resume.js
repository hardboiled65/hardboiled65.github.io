var apiUrl = 'https://oq0dp7juvj.execute-api.us-east-2.amazonaws.com/api/hardboiled65/personal';

function createRow(cols) {
  var row = document.createElement('div');
  row.classList.add('row');

  var langs = Object.keys(cols);
  for (var i = 0; i < langs.length; ++i) {
    col1 = document.createElement('span');
    col1.classList.add('l10n');
    col1.classList.add('col-1');
    col1.lang = langs[i];
    col1.innerHTML = cols[langs[i]].col1;

    col2 = document.createElement('span');
    col2.classList.add('l10n');
    col2.classList.add('col-2');
    col2.lang = langs[i];
    col2.innerHTML = cols[langs[i]].col2;

    row.appendChild(col1);
    row.appendChild(col2);
  }
  return row;
}

function setPrivateInfo(info) {
  var intro = document.getElementById('intro');
  var email = document.getElementById('email');
  var location = document.getElementById('location');

  // Set name.
  var name = createRow({
    en: {
      col1: 'name',
      col2: info.en.name
    },
    ko: {
      col1: '이름',
      col2: info.ko.name
    },
    ja: {
      col1: '名前',
      col2: info.en.name
    }
  });
  intro.insertBefore(name, email);
  // Set phone.
  var phone = createRow({
    en: {
      col1: 'phone',
      col2: info.en.phone
    },
    ko: {
      col1: '전화번호',
      col2: info.ko.phone
    },
    ja: {
      col1: 'phone',
      col2: info.en.phone
    }
  });
  intro.insertBefore(phone, email);
  // Remove nickname.
  var nickname = document.getElementById('nickname');
  nickname.parentNode.removeChild(nickname);
  // Set location.
  var locationCol2List = location.querySelectorAll('.col-2');
  for (var i = 0; i < locationCol2List.length; ++i) {
    switch (locationCol2List[i].lang) {
      case 'ko':
        locationCol2List[i].innerHTML = info.ko.location;
        break;
      default:
        locationCol2List[i].innerHTML = info.en.location;
    }
  }

  // Remove secret form.
  var secret = document.getElementById('secret');
  secret.parentNode.removeChild(secret);

  // Translate.
  translate(localStorage.getItem('lang'));
}

window.addEventListener('load', function(evt) {
  var secretKeyInput = document.getElementById('secret-key-input');
  var secretKeyButton = document.getElementById('secret-key-button');
  var secretKeyError = document.getElementById('secret-key-error');
  // Set initial button state.
  (secretKeyInput.value !== '') ? secretKeyButton.removeAttribute('disabled') : null;
  // Add input event listener.
  secretKeyInput.addEventListener('input', function(evt) {
    if (evt.target.value !== '') {
      secretKeyButton.removeAttribute('disabled');
    } else {
      secretKeyButton.setAttribute('disabled', '');
    }
  });

  // Get information if secret key already set.
  if (localStorage.getItem('secretKey') !== null) {
    axios.get(apiUrl, {
      headers: { 'x-api-key': localStorage.getItem('secretKey') }
    })
      .then(function(res) {
        if (res.status === 200) {
          setPrivateInfo(res.data);
        }
      })
      .catch(function(err) {
        localStorage.removeItem('secretKey');
      });
  }

  secretKeyButton.addEventListener('click', function() {
    var oldVal = secretKeyButton.innerHTML;
    secretKeyButton.innerHTML = 'Confirming ...';
    secretKeyButton.setAttribute('disabled', '');
    axios.get(apiUrl, {
      headers: { 'x-api-key': secretKeyInput.value }
    })
      .then(function(res) {
        if (res.status === 200) {
          setPrivateInfo(res.data);
          localStorage.setItem('secretKey', secretKeyInput.value);
        }
      })
      .catch(function(err) {
        if (err.response.status === 403) {
          secretKeyError.innerHTML = 'Forbidden';
        } else {
          secretKeyError.innerHTML = 'Unknown error';
        }
      })
      .then(function() {
        secretKeyButton.innerHTML = oldVal;
        secretKeyButton.removeAttribute('disabled');
      });
  });
});