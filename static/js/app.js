var state = {};

function expandSubList(evt) {
  evt.target.parentElement.querySelector('.sub-list')
    .classList.toggle('expanded');
}

function translate(lang) {
  var list = document.querySelectorAll('.l10n');
  for (var i = 0; i < list.length; ++i) {
    var el = list[i];
    if (el.lang === lang) {
      el.classList.add('preferred-lang');
    } else {
      el.classList.remove('preferred-lang');
    }
  }
}

function onLoad() {
  document.querySelector('#expand-about')
    .addEventListener('click', expandSubList);

  document.querySelector('#expand-projects')
    .addEventListener('click', expandSubList);

  if (localStorage.getItem('lang') === null) {
    localStorage.setItem('lang', 'en');
  }

  translate(localStorage.getItem('lang'));

  var select = document.querySelector('.language').querySelector('select');
  for (var i = 0; i < select.options.length; ++i) {
    if (select.options[i].value === localStorage.getItem('lang')) {
      select.options[i].selected = true;
      break;
    }
  }
  select.addEventListener('change', function(evt) {
    localStorage.setItem('lang', evt.target.value);
    translate(localStorage.getItem('lang'));
  });
}